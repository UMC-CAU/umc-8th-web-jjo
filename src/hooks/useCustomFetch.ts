import axios from "axios";
import { useState, useEffect } from "react";

interface ApiResponse<T> {
    data: T | null
    isPending: boolean;
    error: boolean;
}

type Language = "ko-KR" | "en-US";

function useCustomFetch<T>(
    url:string,
    language: Language = "ko-KR" //기본값을 "ko-KR"로 설정,
    ): ApiResponse<T>{
    const[data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true); //로딩 시작

            try {
                const {data} = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                    params: {
                        language: language,
                    },
                });
                setData(data); //API에서 받아온 데이터를 setData에 넣음
            } catch {
                setError(true); //API 호출 실패 시 에러 상태로 변경
            } finally {
                setIsPending(false); //로딩 종료
            }
        };
        fetchData();
    }, [url, language]); //url이 변경될 때마다 useEffect가 실행됩니다. 

    return {
    data, isPending, error
}; //API 호출 결과를 반환합니다.
}
export default useCustomFetch;