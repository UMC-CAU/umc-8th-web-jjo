import { createContext, PropsWithChildren, useContext, useState } from "react";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { RequestSigninDto } from "../types/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromLocalStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFromLocalStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromLocalStorage(), //lazy initialization
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromLocalStorage());

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 되었습니다.");
                window.location.href = "/my"; //로그인 성공시 마이페이지로 이동
            }
        } catch (error) {
            console.error("Login failed:", error); //toast UI사용 가능!!!
            alert("로그인에 실패했습니다.");
        }
    };

    const logout = async () => {
        try {
            // You may want to implement postLogout if not already
            // await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 되었습니다.");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
