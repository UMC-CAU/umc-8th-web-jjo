import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import "../index.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const {values, errors, touched, getInputProps } = 
    useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async() => {
        console.log(values);
    };
    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화화
    const isDisabled :boolean = 
        Object.values(errors || {}).some((error: string) => error.length>0) ||
        Object.values(values).some((value :string) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* 뒤로가기 버튼과 제목 */}
      <div className="flex items-center justify-center reletive gap-2">
        <Link to="/">&lt;</Link>

        <h1 className="text-3xl font-bold text-white text-center ">로그인</h1>
      </div>
            <input
            {...getInputProps('email')}
            name="email"
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-color-white
                ${errors?.email && touched?.email ? "border-red-500 bg-red-200": "border-gray-300" }`}
            type={"email"}
            placeholder="이메일을 입력하세요" 
        />

        {errors?.email && touched && (
            <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
        {...getInputProps('password')}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm bg-color-white
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200": "border-gray-300" }`}
            type={"email"}
            placeholder="비밀번호를 입력하세요" />
            {errors?.password && touched && (
            <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button 
            type = 'button' 
            onClick={handleSubmit} 
            disabled={isDisabled}
            className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-800 transition-colors cursor-pointer disabled:bg-gray-300"
            >
            로그인
            </button>

        </div>
            

    </div>
  );
};

export default LoginPage;
