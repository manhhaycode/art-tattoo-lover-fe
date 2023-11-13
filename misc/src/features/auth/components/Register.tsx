import { useModalStore } from '@/store/componentStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { stylePasswordInput } from '@/components/common/Input';

import Button from '@/components/common/Button';
import { Loader, PasswordInput } from '@mantine/core';
import { SecureIcon } from '@/assets/icons';
import CountDown from '@/components/CountDown';
import { useState } from 'react';
import { useRegisterMutation, useVerifyEmailMutation } from '../api';
import { RegisterCredentials } from '../types';
import { toast } from 'react-toastify';

export default function Register() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible } = useModalStore();
    const [countDownTime, setCountDownTime] = useState<Date | null>(null);
    const verifyEmailMutation = useVerifyEmailMutation({
        onSuccess: () => {
            toast('Mã xác thực đã được gửi về email của bạn', { type: 'success', theme: 'dark' });
        },
        onError: () => {
            toast('Email đã tồn tại', { type: 'error', theme: 'dark' });
        },
    });
    const registerMutation = useRegisterMutation({
        onSuccess: () => {
            toast('Đăng ký thành công, đăng nhập ngay để trải nghiệm', { type: 'success', theme: 'dark' });
            setIsRegisterModalVisible(false);
            setIsLoginModalVisible(true);
        },
        onError: (error) => {
            let message = '';
            if (error.message.includes('mail')) message = 'Email đã tồn tại';
            else if (error.message.includes('phone')) message = 'Số điện thoại đã tồn tại';
            else if (error.message.includes('code')) message = 'Mã xác thực không đúng';
            else message = 'Đã có lỗi xảy ra';

            toast(message, { type: 'error', theme: 'dark' });
        },
    });
    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        trigger,
        watch,
    } = useForm<RegisterCredentials>();
    const onSubmit: SubmitHandler<RegisterCredentials> = (credentials) => {
        registerMutation.mutate(credentials);
    };
    const isEmailValid = !errors.email && !!watch('email') && watch('email') !== '';
    return (
        <div className="flex flex-col justify-between overflow-auto h-full md:w-[800px]">
            <div className="px-4 mt-10 mb-24">
                <h1 className="text-2xl font-semibold mb-6 text-center">Đăng ký tài khoản Tattus</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-3 xs:px-6 lgmax:px-14 gap-y-3">
                    <div className="flex flex-col gap-y-3 w-full gap-x-4 md:flex-row">
                        <div className="flex flex-col gap-y-3 md:w-1/2">
                            <label className="text-white font-medium text-sm">Nhập họ tên</label>
                            <Input
                                disabled={registerMutation.isLoading}
                                {...register('fullName', {
                                    required: 'Tên không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                                placeholder="Tên của bạn"
                            ></Input>
                            {errors.fullName && (
                                <label className="text-sm font-semibold text-red-500">{errors.fullName.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-3 md:w-1/2">
                            <label className="text-white font-medium text-sm">Nhập địa chỉ Email</label>
                            <Input
                                disabled={registerMutation.isLoading}
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
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full gap-x-4 md:flex-row">
                        <div className="flex flex-col gap-y-3 md:w-1/2">
                            <label className="text-white font-medium text-sm">Nhập mật khẩu</label>
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                disabled={registerMutation.isLoading}
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
                        </div>

                        <div className="flex flex-col gap-y-3 md:w-1/2">
                            <label className="text-white font-medium text-sm">Nhập Số điện thoại</label>
                            <Input
                                disabled={registerMutation.isLoading}
                                placeholder="Số điện thoại"
                                {...register('phoneNumber', {
                                    pattern: {
                                        value: /^[0-9]{8,15}$/,
                                        message: 'Số điện thoại không hợp lệ',
                                    },
                                    required: 'Số điện thoại không được để trống',
                                    onBlur: () => {
                                        trigger('phoneNumber');
                                    },
                                    disabled: registerMutation.isLoading,
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                            />
                            {errors.phoneNumber && (
                                <label className="text-sm font-semibold text-red-500">
                                    {errors.phoneNumber.message}
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col  justify-start gap-y-3 w-full gap-x-4 xs:flex-row">
                        <div className="flex flex-col gap-y-3">
                            <label className="text-white font-medium text-sm">Xác thực email đăng ký</label>
                            <Input
                                disabled={registerMutation.isLoading}
                                {...register('verifyCode', {
                                    minLength: {
                                        value: 6,
                                        message: 'Mã xác thực phải có ít nhất 6 ký tự',
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: 'Mã xác thực có tối đa 6 ký tự',
                                    },
                                    required: 'Mã xác thực không được để trống',
                                    disabled: registerMutation.isLoading,
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                                placeholder="Nhập mã gửi về email"
                            ></Input>
                            {errors.verifyCode && (
                                <label className="text-sm font-semibold text-red-500">
                                    {errors.verifyCode.message}
                                </label>
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
                                    verifyEmailMutation.mutate(watch('email'));
                                }
                            }}
                            className={
                                'h-12 !min-w-[140px] ' +
                                (isEmailValid
                                    ? countDownTime
                                        ? '!bg-transparent text-white shadow-shadow-dropdown cursor-not-allowed '
                                        : '!bg-white text-black '
                                    : countDownTime
                                    ? '!bg-transparent text-white shadow-shadow-dropdown cursor-not-allowed '
                                    : 'bg-disable text-placeholder-gray cursor-not-allowed ') +
                                (errors.verifyCode ? 'self-center' : 'self-end')
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
                        disabled={!isValid || registerMutation.isLoading}
                        type="submit"
                        isAnimate={true}
                        whileTap={isValid && !registerMutation.isLoading ? { scale: 0.9 } : {}}
                    >
                        {registerMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <p className="justify-self-center font-semibold text-base leading-5">Đăng Ký</p>
                        )}
                    </Button>
                </form>
            </div>
            <div className="border-t-2 border-solid border-stroke-gray flex justify-center items-center h-20 absolute bottom-0 bg-gray-dark w-full z-[400]">
                <p>Bạn đã có tài khoản?</p>
                <button
                    onClick={() => {
                        setIsRegisterModalVisible(false);
                        setIsLoginModalVisible(true);
                    }}
                    className="text-button-primary font-sans text-base font-medium hover:underline ml-2"
                >
                    Đăng nhập ngay
                </button>
            </div>
        </div>
    );
}
