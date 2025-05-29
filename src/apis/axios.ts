import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
    url?: string; //요청 URL을 저장하기 위한 선택적 속성
}

//전역 변수로 refresh 요청에 promise를 저장해서 중복 요청을 방지한다.
const refreshPromise: Promise<string> | null = null;

//API 호출을 위한 axios 인스턴스를 생성
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터: 모든 요청 전에 accessToken을 Authorixation 헤더에 추가가
axiosInstance.interceptors.request.use(
    (config) => {
        const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken); //로그인했을때 AccessToken의 키 이름으로 localStorage에 저장
        const accessToken = getItem(); //localStorage에서 AccessToken 가져오기

        //accessToken이 존재하면 Authorization 헤더에 Bearer 토큰을 추가
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`; //Authorization 헤더에 AccessToken 추가
        }

        //수정된 요청 설정을 반환환
        return config;
    },
    (error) => {
        //요청 오류가 발생하면 Promise.reject()로 오류를 반환
        return Promise.reject(error);
    },
);

//응답 인터셉터: 모든 응답을 가로채서 처리: 401에러 발생 -> refreshToken 요청(토큰 갱신 처리)
axiosInstance.interceptors.response.use(
    (response) => response, //응답이 성공적이면 응답을 그대로 반환
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config; //오류가 발생한 요청을 가져옴

        //401 에러가 발생하고, 요청이 재시도되지 않은 경우
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            //refresh 엔드포인트트 401에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if (originalRequest.url === "/v1/auth/refresh") {
                const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login"; //로그인 페이지로 이동
                return Promise.reject(error);
            }

            //재시도 플래그 설정정
            originalRequest._retry = true;

            //이미 리프레시 요청이 진행중이면, 그 Promise를 재사용
            if (refreshPromise) {
                //refresh 요청 실행 후, 프러미스를 전역 변수에 할당당
                refreshPromise = (async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();

                    const { data } = await axiosInstance.post("/v1/auth/refresh", {
                        refresh: refreshToken,
                    });

                    //새 토큰 반환
                    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    //새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함
                    return data.data.accessToken;
                })()
                    .catch((error) => {
                        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        removeAccessToken();
                        removeRefreshToken();
                    })
                    .finally(() => {
                        refreshPromise = null; //요청이 완료되면 프러미스를 초기화
                    });
            }
            // 진행중인 refreshPromise가 해결될때까지 기다림림
            return refreshPromise.then((newAccessToken) => {
                //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트트
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; //새 accessToken을 Authorization 헤더에 추가
                //업데이트 된 원본 요청을 재시도도
                return axiosInstance.request(originalRequest);
            });
        }
        //401 에러가 아니거나, 이미 재시도된 경우에는 오류를 그대로 반환
        return Promise.reject(error);
    },
);
