import { useModalStore } from '@/store/componentStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { stylePasswordInput } from '@/components/common/Input';

import Button from '@/components/common/Button';
import { PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SecureIcon } from '@/assets/icons';
import CountDown from '@/components/CountDown';
import { useState } from 'react';
interface IRegister {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    codeActive: string;
}
export default function Register() {
    const { setIsLoginModalVisible, setIsRegisterModalVisible } = useModalStore();
    const [visible, { toggle }] = useDisclosure(false);
    // const [isCountDown, setIsCountDown] = useState(false);
    const [countDownTime, setCountDownTime] = useState<Date | null>(null);
    const {
        handleSubmit,
        register,
        formState: { errors, isValid, dirtyFields },
        trigger,
        watch,
    } = useForm<IRegister>();
    const onSubmit: SubmitHandler<IRegister> = () => {};
    const isEmailValid = !errors.email && dirtyFields.email;

    return (
        <div className="flex flex-col justify-between overflow-auto h-full w-[800px]">
            <div className="px-4 mt-10 mb-24">
                <h1 className="text-2xl font-semibold mb-6 text-center">Đăng ký tài khoản Tattus</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-14 gap-y-3">
                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Nhập họ tên</label>
                            <Input
                                {...register('name', {
                                    required: 'Tên không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                                placeholder="Tên của bạn"
                            ></Input>
                            {errors.name && (
                                <label className="text-sm font-semibold text-red-500">{errors.name.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Nhập địa chỉ Email</label>
                            <Input
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
                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Nhập mật khẩu</label>
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                visible={visible}
                                onVisibilityChange={toggle}
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

                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Nhập lại mật khẩu</label>
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                {...register('rePassword', {
                                    validate: (value) => value === watch('password') || 'Mật khẩu không trùng khớp',
                                    required: 'Mật khẩu không được để trống',
                                    onChange: () => {
                                        trigger('rePassword');
                                    },
                                    onBlur: () => {
                                        trigger('rePassword');
                                    },
                                })}
                                visible={visible}
                                onVisibilityChange={toggle}
                                placeholder="Mật khẩu"
                            ></PasswordInput>
                            {errors.rePassword && (
                                <label className="text-sm font-semibold text-red-500">
                                    {errors.rePassword.message}
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col gap-y-3 w-1/2">
                            <label className="text-white font-medium text-sm">Xác thực email đăng ký</label>
                            <Input
                                {...register('codeActive', {
                                    minLength: {
                                        value: 6,
                                        message: 'Mã xác thực phải có ít nhất 6 ký tự',
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: 'Mã xác thực có tối đa 6 ký tự',
                                    },
                                    required: 'Mã xác thực không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg"
                                placeholder="Nhập mã gửi về email"
                            ></Input>
                            {errors.codeActive && (
                                <label className="text-sm font-semibold text-red-500">
                                    {errors.codeActive.message}
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
                                if (isEmailValid) setCountDownTime(new Date(Date.now() + 60000));
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
                                (errors.codeActive ? 'self-center' : 'self-end')
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
                        disabled={!isValid}
                        type="submit"
                        isAnimate={true}
                        whileTap={isValid ? { scale: 0.9 } : {}}
                    >
                        <p className="justify-self-center font-semibold text-base leading-none">Đăng Ký</p>
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
