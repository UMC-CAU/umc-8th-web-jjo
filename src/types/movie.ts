// 공통 속성 추출
export type BaseMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
    
}

type Genre = {
  id: number;
  name: string;
}

 type Language = {
  english_name: string; 
  iso_639_1: string;
  name: string;
 }

// 기본 영화 타입 (리스트에서 사용)
export type Movie = BaseMovie & {
  genre_ids: number[];
};

// 영화 목록 API 응답
export type MovieResponse = {
  id: number;
  page: number;
  results: Movie[]; // 실제로 들어오는거는 여러 개의 영화 데이터니 Movie의 배열로 표현
  total_pages: number;
  total_results: number;
  production_companies: {
    id: number; 
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[]; // 배열로 표현
};



// 상세 영화 정보 API 응답
export type MovieDetailResponse = BaseMovie & {
  belongs_to_collection: BelongsToCollection;
  
  budget: number;

  genres: Genre[]; // 장르가 여러 개일 수 있으니 배열로 표현

  homepage: string;

  imdb_id: string;

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[]; // 배열로 표현

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[]; // 배열로 표현

  revenue: number;
  runtime: number;

 language: Language[]; // 배열로 표현

  status: string;
  tagline: string;
};
