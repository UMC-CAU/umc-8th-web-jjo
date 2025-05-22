import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청에 promise를 저장해서 중복 요청을 방지한다.
const refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    //headers: {
    //  Authorization: `Bearer ${getItem()}`,
    //},
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

//응답 인터셉터: 모든 응답을 가로채서 처리: 401에러 발생 -> refreshToken 요청(토큰 갱신 처리리)
axiosInstance.interceptors.response.use(
    (response) => response, //응답이 성공적이면 응답을 그대로 반환
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config; //오류가 발생한 요청을 가져옴

        //401 에러가 발생하고, 요청이 재시도되지 않은 경우
        if (error.response && error.response.this.status === 401 && !originalRequest._retry) {
        }
    },
);
