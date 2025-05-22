import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z
    .object({
        email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
        password: z
            .string()
            .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
            .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
        passwordCheck: z
            .string()
            .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
            .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
        name: z.string().min(1, { message: "이름을 입력하세요." }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.passwordCheck) {
            ctx.addIssue({
                path: ["passwordCheck"],
                code: z.ZodIssueCode.custom,
                message: "비밀번호가 일치하지 않습니다.",
            });
        }
    });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormFields> = async ({ email, name, password }) => {
        console.log({ email, name, password }); //비밀번호 확인을 제외한 나머지 데이터들
        console.log(errors); //에러들

        const respeonse = await postSignup({ email, name, password }); //rest를 postSignup에 넣어줌

        console.log(respeonse); //응답값
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* 이메일 입력 */}
            <div className="flex flex-col gap-3">
                <input
                    {...register("email")}
                    className={`border borer-[#ccc] w-[300px] p-[10px] focus:border-gray-300 rounded-md bg-white text-black ${
                        errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
                    }`}
                    type={"email"}
                    placeholder="이메일을 입력하세요"
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

                {/* 비밀번호 입력 */}
                <input
                    {...register("password")}
                    className={`border borer-[#ccc] w-[300px] p-[10px] focus:border-gray-300 rounded-md bg-white text-black ${
                        errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
                    }`}
                    type={"password"}
                    placeholder={"비밀번호를 입력하세요"}
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

                <input
                    {...register("passwordCheck")}
                    name="passwordCheck"
                    className={`border borer-[#ccc] w-[300px] p-[10px] focus:border-gray-300 rounded-md bg-white text-black ${
                        errors?.passwordCheck ? "border-red-500 bg-red-100" : "border-gray-300"
                    }`}
                    type={"password"}
                    placeholder={"비밀번호 확인"}
                />
                {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}

                {/* 이름 입력 */}
                <input
                    {...register("name")}
                    name="name"
                    className={`border borer-[#ccc] w-[300px] p-[10px] focus:border-gray-300 rounded-md bg-white text-black ${
                        errors?.password ? "border-red-500 bg-red-100" : "border-gray-300"
                    }`}
                    type={"name"}
                    placeholder="이름"
                />

                {/* 로그인 버튼 */}
                <button
                    disabled={isSubmitting}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className=" w-[300px] p-[10px] bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-800 transition-colors disabled:bg-gray-400"
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
