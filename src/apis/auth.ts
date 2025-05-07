import { axiosInstance } from "./axios";
import { RequestSigninDto, RequestSignupDto, ResposeMyINfoDto, ResponseSigninDto} from "../types/auth";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post<ResponseSigninDto>(
      `/auth/signup`,
      body
    );
    return data;
  };
  

export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto> => {
    const {data} = await axiosInstance.post<ResponseSigninDto>(
        `/auth/signin`,
        body,
    );

    return data;
}

export const getMyInfo = async ():Promise<ResposeMyINfoDto> => {
    const {data} = await axiosInstance.get<ResposeMyINfoDto>(
        `v1/users/me`,
    );

    return data;
};
