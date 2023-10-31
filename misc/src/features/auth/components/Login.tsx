import { useForm, SubmitHandler } from 'react-hook-form';
import Input, { stylePasswordInput } from '@/components/common/Input';
import { useModalStore } from '@/store/componentStore';
import { useAuthStore } from '@/store/authStore';
import { useLoginMutation } from '../api/authAPI';
import { Loader, PasswordInput } from '@mantine/core';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
interface ILogin {
    email: string;
    password: string;
}

export default function Login() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible, setIsResetPasswordModalVisible, reset } =
        useModalStore();
    const { setIsAuth, setAccountType, setIsLogout } = useAuthStore();
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            if (data.user.status === 1) {
                setIsAuth(true);
                setAccountType({
                    role: { id: data.user.roleId, name: 'Member' },
                    permissions: [],
                    user: data.user,
                });
                setIsLogout(false);
                reset();
            } else {
                toast('Tài khoản của bạn chưa được kích hoạt  hoặc đã bị khóa', {
                    type: 'error',
                    theme: 'dark',
                });
            }
        },
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
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
                        disabled={loginMutation.isLoading}
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
                    <PasswordInput
                        disabled={loginMutation.isLoading}
                        variant="unstyled"
                        classNames={stylePasswordInput}
                        {...register('password', {
                            onChange() {
                                if (loginMutation.isError) loginMutation.reset();
                            },
                            required: 'Mật khẩu không được để trống',
                        })}
                        placeholder="Mật khẩu"
                    ></PasswordInput>
                    {errors.password && (
                        <label className="text-sm font-semibold text-red-500">{errors.password.message}</label>
                    )}
                    <label className="text-sm font-semibold text-red-500 min-h-[20px]">
                        {loginMutation.isError ? 'Sai email hoặc mật khẩu' : ''}
                    </label>
                    <Link
                        to={'/'}
                        onClick={() => {
                            setIsResetPasswordModalVisible(true);
                            setIsLoginModalVisible(false);
                        }}
                        className="text-[13px] font-bold text-gray-400 mt-2 hover:underline"
                    >
                        Quên mật khẩu?
                    </Link>
                    <Button
                        isAnimate={true}
                        disabled={loginMutation.isLoading || !isValid}
                        type="submit"
                        whileTap={!loginMutation.isLoading && isValid ? { scale: 0.9 } : {}}
                        className="mt-3"
                        {...(!isValid && { className: 'bg-disable text-placeholder-gray mt-3' })}
                    >
                        {loginMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <p className="justify-self-center font-semibold text-base leading-5">Đăng Nhập</p>
                        )}
                    </Button>
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
