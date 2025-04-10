//movie.tsx
import { useParams } from "react-router-dom"
import { useState } from "react";
import { MovieResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch"; //커스텀 훅을 사용하여 API 호출을 관리합니다.
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const {category} = useParams<{
        category: string;
    }>(); 

    const url: string = `https://api.themoviedb.org/3/movie/${category}?page=${page}`; //카테고리별 영화 목록을 가져오는 API URL입니다.
    
    const { 
        data:movies, 
        isPending, 
        error 
        } = useCustomFetch<MovieResponse>(url);
    
        if (error) {
            return (
            <div>
                <span className="text-red-500">오류가 발생했습니다.</span>
            </div>
            );
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
            hover:bg-blue-600 transition-colors duration-300' 
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
            {movies?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 
            ))}
        </div>
        )}        
        </>
    );      
}
