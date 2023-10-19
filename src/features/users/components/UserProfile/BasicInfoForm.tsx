import { SubmitHandler, useForm } from 'react-hook-form';
import { AvartarIcon, UserCredentials, useUpdateBasicInfoMutation } from '@/features/users';
import Image from '@/components/common/Image';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { DatesProvider, DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import 'dayjs/locale/vi';
import { Loader } from '@mantine/core';
import { toast } from 'react-toastify';
export default function BasicInfoForm() {
    const { accountType, setIsChange } = useAuthStore();
    const updateBasicInfoMutation = useUpdateBasicInfoMutation({
        onSuccess: (data) => {
            console.log(data);
            setIsChange(true);
            toast('Cập nhật thông tin cơ bản thành công', { type: 'success', theme: 'dark' });
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const defaultValues = {
        fullName: accountType?.user.fullName || undefined,
        email: accountType?.user.email || undefined,
        phone: accountType?.user.phone || undefined,
        birthday: accountType?.user.birthday,
    };
    const [birthday, setBirthday] = useState(defaultValues.birthday ? new Date(defaultValues.birthday) : null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<UserCredentials>({ defaultValues });
    const onSubmit: SubmitHandler<UserCredentials> = (data) => {
        updateBasicInfoMutation.mutate(data);
    };
    console.log(isDirty);
    return (
        accountType && (
            <div className="basic-info-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="h-24 w-24 mb-6">
                        {accountType.user.avatar ? (
                            <Image src={accountType.user.avatar} className="rounded-[50%]" />
                        ) : (
                            <AvartarIcon fullName={accountType.user.fullName} />
                        )}
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-y-6 gap-x-[8%]">
                        <div className="w-full">
                            <Input
                                disabled={updateBasicInfoMutation.isLoading}
                                label={{ children: 'Họ và tên' }}
                                error={{ children: errors.fullName?.message }}
                                {...register('fullName', {
                                    required: 'Họ và tên không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg w-full"
                                placeholder="Tên của bạn"
                            ></Input>
                        </div>
                        <div className="w-full">
                            <Input
                                disabled={updateBasicInfoMutation.isLoading}
                                label={{ children: 'Địa chỉ email' }}
                                error={{ children: errors.email?.message }}
                                {...register('email', {
                                    required: 'Email không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg w-full"
                                placeholder="Địa chỉ email của bạn"
                            ></Input>
                        </div>
                        <div className="w-full">
                            <Input
                                disabled={updateBasicInfoMutation.isLoading}
                                label={{ children: 'Số điện thoại' }}
                                error={{ children: errors.phone?.message }}
                                {...register('phone', {
                                    required: 'Số điện thoại không được để trống',
                                })}
                                typeinput="header"
                                className="h-11 rounded-lg w-full"
                                placeholder="Số điện thoại của bạn"
                            ></Input>
                        </div>
                        <div className="w-full">
                            <label className="text-white font-semibold text-base block mb-3">Ngày sinh nhật</label>
                            <DatesProvider settings={{ locale: 'vi', firstDayOfWeek: 0, weekendDays: [0] }}>
                                <DatePickerInput
                                    valueFormat="DD/MM/YYYY"
                                    className="text-white pl-4 hover:bg-[rgb(80,82,83)] focus:bg-[rgb(80,82,83)] bg-search-gray-dark h-11 rounded-lg font-sans font-medium text-base"
                                    variant="unstyled"
                                    placeholder="Chọn ngày sinh"
                                    value={birthday}
                                    onChange={(e) => {
                                        setBirthday(e);
                                        setValue('birthday', new Date(e!.getTime() + 86400000).toISOString());
                                    }}
                                />
                            </DatesProvider>
                        </div>
                    </div>
                    <div className="flex gap-x-4 mt-6">
                        <Button
                            isAnimate={true}
                            disabled={updateBasicInfoMutation.isLoading || !isValid || !isDirty}
                            type="submit"
                            className="min-w-[240px]"
                            whileTap={!updateBasicInfoMutation.isLoading && isValid && isDirty ? { scale: 0.9 } : {}}
                            {...((!isValid || !isDirty) && { className: 'bg-disable text-placeholder-gray' })}
                        >
                            {updateBasicInfoMutation.isLoading ? (
                                <Loader size={20} color="#fff" />
                            ) : (
                                <p className="justify-self-center font-semibold text-base leading-5">
                                    Thay đổi thông tin cơ bản
                                </p>
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                reset();
                                setBirthday(defaultValues.birthday ? new Date(defaultValues.birthday) : null);
                            }}
                            className="bg-white text-black"
                        >
                            Đặt lại thông tin cơ bản
                        </Button>
                    </div>
                </form>
            </div>
        )
    );
}
