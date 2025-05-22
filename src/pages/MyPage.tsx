import { useContext, useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    console.log(data.data?.name);

    //---로그아웃 버튼---//
    const handleLogout = async () => {
        try {
            await logout();
            alert("로그아웃 되었습니다.");
            navigate("/");
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };
    return (
        <div>
            <h1>{data.data?.name}님 환영합니다.</h1>
            <img src={data.data?.avatar as string} alt={"구글 로고"} />
            <h1>{data.data?.email}</h1>

            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;
