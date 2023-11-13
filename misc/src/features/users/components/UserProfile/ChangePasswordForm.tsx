import { SubmitHandler, useForm } from 'react-hook-form';
import { UserPasswordCredentials, useChangePasswordMutation } from '@/features/users';
import { useAuthStore } from '@/store/authStore';
import { stylePasswordInput } from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Loader, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
export default function ChangePasswordForm() {
    const { accountType } = useAuthStore();
    const [visible, { toggle }] = useDisclosure(false);

    const changePasswordMutation = useChangePasswordMutation({
        onSuccess: () => {
            reset();
            toast('Thay đổi mật khẩu thành công', { type: 'success', theme: 'dark' });
        },
        onError: (error) => {
            if (error.message === 'Old password is not correct') {
                toast('Mật khẩu cũ không đúng', { type: 'error', theme: 'dark' });
            } else {
                toast('Có lỗi xảy ra, vui lòng thử lại sau', { type: 'error', theme: 'dark' });
            }
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm<UserPasswordCredentials & { rePassword: string }>();
    const onSubmit: SubmitHandler<UserPasswordCredentials & { rePassword: string }> = (data) => {
        changePasswordMutation.mutate(data);
    };

    return (
        accountType && (
            <div className="change-password-form">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="text-white font-semibold text-base">Nhập mật khẩu cũ</label>
                        <div className="w-full sm:w-3/5">
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                disabled={changePasswordMutation.isLoading}
                                visible={visible}
                                onVisibilityChange={toggle}
                                {...register('oldPassword', {
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                                        message: 'Mật khẩu cũ phải có ít nhất 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số',
                                    },
                                    required: 'Mật khẩu cũ không được để trống',
                                    onChange: () => {
                                        trigger('oldPassword');
                                    },
                                    onBlur: () => {
                                        trigger('oldPassword');
                                    },
                                })}
                                placeholder="Mật khẩu cũ"
                            ></PasswordInput>
                        </div>
                        {errors.oldPassword && (
                            <label className="text-sm font-semibold text-red-500">{errors.oldPassword.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <label className="text-white font-semibold text-base">Nhập mật khẩu mới</label>
                        <div className="w-full sm:w-3/5">
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                disabled={changePasswordMutation.isLoading}
                                visible={visible}
                                onVisibilityChange={toggle}
                                {...register('newPassword', {
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                                        message: 'Mật khẩu mới phải có ít nhất 6 ký tự, 1 chữ hoa, 1 chữ thường, 1 số',
                                    },
                                    required: 'Mật khẩu mới không được để trống',
                                    onChange: () => {
                                        trigger('newPassword');
                                    },
                                    onBlur: () => {
                                        trigger('newPassword');
                                    },
                                })}
                                placeholder="Mật khẩu mới"
                            ></PasswordInput>
                        </div>
                        {errors.newPassword && (
                            <label className="text-sm font-semibold text-red-500">{errors.newPassword.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <label className="text-white font-semibold text-base">Nhập lại mật khẩu mới</label>
                        <div className="w-full sm:w-3/5">
                            <PasswordInput
                                variant="unstyled"
                                classNames={stylePasswordInput}
                                disabled={changePasswordMutation.isLoading}
                                visible={visible}
                                onVisibilityChange={toggle}
                                {...register('rePassword', {
                                    validate: (value) => value === watch('newPassword') || 'Mật khẩu không khớp',
                                    required: 'Mật khẩu mới không được để trống',
                                    onChange: () => {
                                        trigger('rePassword');
                                    },
                                    onBlur: () => {
                                        trigger('rePassword');
                                    },
                                })}
                                placeholder="Mật khẩu mới"
                            ></PasswordInput>
                        </div>
                        {errors.rePassword && (
                            <label className="text-sm font-semibold text-red-500">{errors.rePassword.message}</label>
                        )}
                    </div>
                    <Button
                        isAnimate={true}
                        disabled={changePasswordMutation.isLoading || !isValid}
                        type="submit"
                        className="min-w-[240px] max-w-[240px]"
                        whileTap={!changePasswordMutation.isLoading && isValid ? { scale: 0.9 } : {}}
                        {...(!isValid && { className: 'bg-disable text-placeholder-gray min-w-[240px] max-w-[240px]' })}
                    >
                        {changePasswordMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <p className="justify-self-center font-semibold text-base leading-5">Thay đổi mật khẩu</p>
                        )}
                    </Button>
                </form>
            </div>
        )
    );
}
