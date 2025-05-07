import { CommonResponse } from "./common";

//회원가입


export type RequestUser = {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
    };


export type ResponseSignupDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;

export type RequestSignupDto = RequestUser;

//로그인인
export type RequestSigninDto = {
    email: string;
    password: string;
};

export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

//내 정보 조회
export type ResposeMyINfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
