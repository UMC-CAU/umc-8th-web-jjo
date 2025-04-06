//movie.tsx
//import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios"; //React에서 API호출할 때: HTTP 요청을 보내기 위해 axios 라이브러리를 사용합니다.
import MovieCard from "../components/MovidCard";

const MoviePage = () => {


    const [movies, setMovie] = useState<Movie[]>([]);
    
    //useeffect사용
    useEffect(() => {
        //실행 할 side effect
        //API 호출을 하기 위해 사용하는 curl 코드를 axios로 변환환
        const fetchMovies = async () => {
            const {data} = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=ko-KR&page=1',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, //VITE_API_KEY는 .env 파일에 저장된 API 키를 가져옵니다.',
                    },
                }
            );

            setMovie(data.results); //API에서 받아온 데이터의 results를 setMovie에 넣음음
            };
            fetchMovies();
        }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {movies &&
                movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 
            ))}
        </div>
    );      
}

export default MoviePage