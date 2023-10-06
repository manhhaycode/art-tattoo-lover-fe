import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/common/Input';
import { motion } from 'framer-motion';
import { useModalStore } from '@/store/componentStore';
import { useAuthStore } from '@/store/authStore';
import { useLoginMutation } from '../api/authAPI';
import { Loader } from '@mantine/core';
interface ILogin {
    email: string;
    password: string;
}

export default function Login() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible, reset } = useModalStore();
    const { setIsAuth, setAccountType } = useAuthStore();
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            setIsAuth(true);
            setAccountType({
                role: { id: data.session.roleId, name: 'Member' },
                permissions: [],
                user: {
                    id: data.session.userId,
                    name: 'Mạnh Nguyễn',
                },
            });
            reset();
        },
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ILogin>();

    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="px-4 mt-28">
                <h1 className="text-2xl font-semibold mb-12 text-center">Đăng nhập vào Tattus</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-14 gap-y-2">
                    <Input
                        {...register('email', {
                            onChange() {
                                if (loginMutation.isError) loginMutation.reset();
                            },
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: 'Sai định dạng email',
                            },
                            required: 'Email không được để trống',
                        })}
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Email đăng nhập"
                    ></Input>
                    <label className="text-sm font-semibold text-red-500">{errors.email?.message}</label>
                    <Input
                        {...register('password', {
                            onChange() {
                                if (loginMutation.isError) loginMutation.reset();
                            },
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                            //     message: 'Sai mật khẩu',
                            // },
                            required: 'Mật khẩu không được để trống',
                        })}
                        type="password"
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Mật khẩu"
                    ></Input>
                    {errors.password && (
                        <label className="text-sm font-semibold text-red-500">{errors.password.message}</label>
                    )}
                    <label className="text-sm font-semibold text-red-500">
                        {loginMutation.isError ? 'Sai email hoặc mật khẩu' : ''}
                    </label>
                    <p className="text-[13px] font-bold text-gray-400 mt-2">Quên mật khẩu?</p>
                    <motion.button
                        disabled={loginMutation.isLoading}
                        type="submit"
                        whileTap={!loginMutation.isLoading ? { scale: 0.8 } : {}}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit w-full "
                    >
                        {loginMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <p className="justify-self-center font-semibold text-base leading-none">Đăng Nhập</p>
                        )}
                    </motion.button>
                </form>
            </div>
            <div className="border-t-2 border-solid border-stroke-gray flex justify-center items-center h-20 justify-self-end">
                <p>Bạn chưa có tài khoản</p>
                <button
                    onClick={() => {
                        setIsLoginModalVisible(false);
                        setIsRegisterModalVisible(true);
                    }}
                    className="text-button-primary font-sans text-base font-medium hover:underline ml-2"
                >
                    Đăng ký ngay
                </button>
            </div>
        </div>
    );
}
