
import {useParams} from "react-router-dom";

import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
const {movieId} = useParams<{movieId: string}>();
const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`; //그냥 여기다 기본값넣음 그냥냥

const { 
    data: movie,
    isPending,
    error
    } = useCustomFetch<MovieDetailResponse>(url, /*language: "ko-KR"*/ );

    if(isPending) {
        return <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
        </div>;

    if (error) {
        return <div>
            <span className="text-red-500">오류가 발생했습니다.</span>
        </div>;
    };
}

      
    console.log("params in MovieDetailPage:", movieId);
    return <div>
    {movie?.overview}
    {/* 영화 상세정보항ㅁ고일단렌더링 -> ㅏㄴ중에 UI제작작 */ 
    <><img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
    alt={`${movie?.title} 포스터`} className="w-1/2" />
    <h1 className="text-2xl font-bold">{movie?.title}</h1>
    <p className="text-gray-500">{movie?.release_date}</p>
    <p className="text-gray-500">{movie?.original_language}</p>
    <p className="text-gray-500">{movie?.runtime}분</p>
    <p className="text-gray-500">{movie?.tagline}</p>
    <p className="text-gray-500">{movie?.vote_average}</p>
    <p className="text-gray-500">{movie?.vote_count}</p>
    <p className="text-gray-500">{movie?.budget}</p>
    <p className="text-gray-500">{movie?.revenue}</p>
    <p className="text-gray-500">{movie?.homepage}</p>
    <p className="text-gray-500">{movie?.status}</p>
    <p className="text-gray-500">{movie?.imdb_id}</p>
    <p className="text-gray-500">{movie?.production_countries.map((country) => country.name).join(", ")}</p>
    <p className="text-gray-500">{movie?.genres.map((genre) => genre.name).join(", ")}</p>
    <p className="text-gray-500">{movie?.homepage}</p>
    <p className="text-gray-500">{movie?.status}</p>
    </>
}
    {movie?.production_companies.map((
        company: { id: number, logo_path: string | null ,name: string; }) => (
        <div key={company.id} className="flex flex-col items-center justify-center">
            <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={`${company.name} 회사 로고`} className="w-20 h-20" />
            <p>{company.name}</p>
        </div>
    ))}
    </div>

    
};      

export default MovieDetailPage;