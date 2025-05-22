import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            alert("이미 로그인 되어 있습니다.");
            navigate("/");
        }
    }, [accessToken, navigate]);

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        await login(values);
    };

    const isDisabled: boolean =
        Object.values(errors || {}).some((error: string) => error.length > 0) ||
        Object.values(values).some((value: string) => value === "");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
            <div className="w-full max-w-sm bg-black p-6 rounded-lg flex flex-col gap-6">
                {/* 상단 헤더 */}
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-white text-xl">
                        &lt;
                    </Link>
                    <h1 className="text-2xl font-bold text-white text-center flex-1">로그인</h1>
                    <div style={{ width: "24px" }} /> {/* 오른쪽 공간 맞춤용 */}
                </div>

                {/* 구글 로그인 */}
                <button className="cursor-pointer w-full border border-white text-white py-2 rounded-md flex items-center justify-center gap-2">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    구글 로그인
                </button>

                <div className="text-center text-white">----------------------- OR -----------------------</div>

                {/* 이메일 입력 */}
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`w-full p-3 rounded-md bg-white text-black border ${
                        errors?.email && touched?.email ? "border-red-500 bg-red-100" : "border-gray-300"
                    }`}
                    type="email"
                    placeholder="이메일을 입력하세요"
                />
                {errors?.email && touched?.email && <div className="text-red-500 text-sm">{errors.email}</div>}

                {/* 비밀번호 입력 */}
                <input
                    {...getInputProps("password")}
                    name="password"
                    className={`w-full p-3 rounded-md bg-white text-black border ${
                        errors?.password && touched?.password ? "border-red-500 bg-red-100" : "border-gray-300"
                    }`}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                />
                {errors?.password && touched?.password && <div className="text-red-500 text-sm">{errors.password}</div>}

                {/* 로그인 버튼 */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-800 transition-colors disabled:bg-gray-400"
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
