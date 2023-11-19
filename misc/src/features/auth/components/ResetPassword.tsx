import { useModalStore } from '@/store/componentStore';
import { useRequestCodeMutation, useResestPasswordMutation } from '../api';
import Input, { stylePasswordInput } from '@/components/common/Input';
import { toast } from 'react-hot-toast';
import { ResetPasswordCredentials } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loader, PasswordInput } from '@mantine/core';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { SecureIcon } from '@/assets/icons';
import CountDown from '@/components/CountDown';
export default function ResetPassword() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible, setIsResetPasswordModalVisible } = useModalStore();
    const requestCodeMutation = useRequestCodeMutation({
        onSuccess: () => {
            toast.success('Mã xác thực đã được gửi về email của bạn');
        },
        onError: () => {
            toast.error('Email chưa đăng ký tài khoản Tattus');
        },
    });
    const resetPassWordMutation = useResestPasswordMutation({
        onSuccess: () => {
            toast.success('Đặt lại mật khẩu thành công');
            setIsLoginModalVisible(true);
            setIsResetPasswordModalVisible(false);
        },
        onError: () => {
            toast.error('Email chưa đăng ký hoặc code không hợp lệ');
        },
    });
    const {
        handleSubmit,
        register,
        trigger,
        watch,
        formState: { errors, isValid },
    } = useForm<ResetPasswordCredentials>();
    const [countDownTime, setCountDownTime] = useState<Date | null>(null);
    const isEmailValid = !errors.email && !!watch('email') && watch('email') !== '';

    const onSubmit: SubmitHandler<ResetPasswordCredentials> = async (data) => {
        resetPassWordMutation.mutate(data);
    };
    return (
        <div className="flex flex-col justify-between overflow-auto h-full xs:w-[600px]">
            <div className="px-4 mt-10 mb-24">
                <h1 className="text-2xl font-semibold mb-6 text-center">Đặt lại mật khẩu Tattus</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-3 xs:px-6 lgmax:px-14 gap-y-3">
                    <label className="text-white font-medium text-sm">Nhập địa chỉ Email</label>
                    <Input
                        disabled={resetPassWordMutation.isLoading}
                        {...register('email', {
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: 'Sai định dạng email',
                            },
                            required: 'Email không được để trống',
                            onBlur: () => {
                                trigger('email');
                            },
                            onChange: () => {
                                trigger('email');
                            },
                        })}
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Địa chỉ Email"
                    ></Input>
                    {errors.email && (
                        <label className="text-sm font-semibold text-red-500">{errors.email.message}</label>
                    )}

                    <label className="text-white font-medium text-sm">Nhập mật khẩu</label>
                    <PasswordInput
                        variant="unstyled"
                        classNames={stylePasswordInput}
                        disabled={resetPassWordMutation.isLoading}
                        {...register('password', {
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                                message: 'Mật khẩu phải có ít nhất 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số',
                            },
                            required: 'Mật khẩu không được để trống',
                            onChange: () => {
                                trigger('password');
                            },
                            onBlur: () => {
                                trigger('password');
                            },
                        })}
                        placeholder="Mật khẩu"
                    ></PasswordInput>
                    {errors.password && (
                        <label className="text-sm font-semibold text-red-500">{errors.password.message}</label>
                    )}

                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Xác thực email đăng ký</label>
                            <Input
                                disabled={resetPassWordMutation.isLoading}
                                {...register('code', {
                                    minLength: {
                                        value: 6,
                                        message: 'Mã xác thực phải có ít nhất 6 ký tự',
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: 'Mã xác thực có tối đa 6 ký tự',
                                    },
                                    required: 'Mã xác thực không được để trống',
                                    disabled: resetPassWordMutation.isLoading,
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                                placeholder="Nhập mã gửi về email"
                            ></Input>
                            {errors.code && (
                                <label className="text-sm font-semibold text-red-500">{errors.code.message}</label>
                            )}
                        </div>
                        <Button
                            disabled={isEmailValid && !!countDownTime}
                            type="button"
                            typeStyle="primary"
                            isAnimate={true}
                            whileTap={isEmailValid && !countDownTime ? { scale: 0.9 } : {}}
                            onClick={() => {
                                if (isEmailValid) {
                                    setCountDownTime(new Date(Date.now() + 60000));
                                    requestCodeMutation.mutate(watch('email'));
                                }
                            }}
                            className={
                                'h-12 !min-w-[180px] ' +
                                (isEmailValid
                                    ? countDownTime
                                        ? '!bg-transparent text-white shadow-shadow-dropdown cursor-not-allowed '
                                        : '!bg-white text-black '
                                    : countDownTime
                                    ? '!bg-transparent text-white shadow-shadow-dropdown cursor-not-allowed '
                                    : 'bg-disable text-placeholder-gray cursor-not-allowed ') +
                                (errors.code ? 'self-center' : 'self-end')
                            }
                        >
                            {countDownTime === null && (
                                <>
                                    <SecureIcon
                                        styles={{
                                            fill: isEmailValid ? 'black' : 'rgba(176,179,184,0.7)',
                                        }}
                                    />
                                    <p>Lấy mã xác thực</p>
                                </>
                            )}
                            {countDownTime !== null && (
                                <div className="">
                                    <CountDown timeTarget={countDownTime} onExpire={() => setCountDownTime(null)} />
                                </div>
                            )}
                        </Button>
                    </div>
                    <Button
                        className={'mt-4 ' + (!isValid && '!bg-disable text-placeholder-gray')}
                        disabled={!isValid || resetPassWordMutation.isLoading}
                        type="submit"
                        isAnimate={true}
                        whileTap={isValid && !resetPassWordMutation.isLoading ? { scale: 0.9 } : {}}
                    >
                        {resetPassWordMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <p className="justify-self-center font-semibold text-base leading-5">Đặt lại mật khẩu</p>
                        )}
                    </Button>
                </form>
            </div>
            <div className="border-t-2 border-solid border-stroke-gray flex justify-center items-center h-20 absolute bottom-0 bg-gray-dark w-full z-[400]">
                <p>Bạn chưa có tài khoản?</p>
                <button
                    onClick={() => {
                        setIsResetPasswordModalVisible(false);
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
