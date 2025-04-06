//movie.tsx
//import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios"; //React에서 API호출할 때: HTTP 요청을 보내기 위해 axios 라이브러리를 사용합니다.
import MovieCard from "../components/MovidCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

function MoviePage() {
    //1. 로딩 상태
const [isPending, setIsPending] = useState(false);
//2. 에러 상태
const [error, setError] = useState(false);

//3. 페이지
const [page, setPage] = useState(1);



    const [movies, setMovie] = useState<Movie[]>([]);
    
    //useeffect사용
    useEffect(() => {
        //실행 할 side effect
        //API 호출을 하기 위해 사용하는 curl 코드를 axios로 변환환
        const fetchMovies = async () => {
            setIsPending(true); //로딩 시작

            try{
            const {data} = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=ko-KR&page=1$
                {page}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, //VITE_API_KEY는 .env 파일에 저장된 API 키를 가져옵니다.',
                    },
                }
            );

            setMovie(data.results);//API에서 받아온 데이터의 results를 setMovie에 넣음음
            }catch {
                setError(true); //API 호출 실패 시 에러 상태로 변경

            }  finally {
                setIsPending(false); //로딩 종료
            }
        };
            fetchMovies();
        }, [page]); //page가 변경될 때마다 useEffect가 실행됩니다.

        if (isPending) {
            return <LoadingSpinner />;       
        }

        if (error) {
            return <div>
                <span className="text-red-500">오류가 발생했습니다.</span>
            </div>;
        }

    return (
        <>
        <div className='flex justify-center items-center gap-6 mt-5'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md
            hover:bg-blue-600 transition-colors duration-300
            disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
            disabled={page === 1} 
            onClick={() => setPage((prev) => prev - 1)}>
                {'<'}</button > 
            <span>{page} 페이지</span>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md
            hover:bg-blue-600 transition-colors duration-300' disabled={page === 1} 
            onClick={() => setPage((prev) => prev + 1)}>
                {'>'}</button > 
        </div>
        {isPending && (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
                </div>
            )}


        {!isPending && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {movies &&
                movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 
            ))}
        </div>
        )}        
        </>
    );      
}

export default MoviePage