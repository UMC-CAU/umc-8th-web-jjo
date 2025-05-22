import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        alert("로그인 후 이용해주세요.");
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
