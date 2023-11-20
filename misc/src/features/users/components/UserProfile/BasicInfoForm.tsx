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
import { toast } from 'react-hot-toast';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { ErrorAuth } from '@/lib/error';

export default function BasicInfoForm() {
    const { accountType, setIsChange, ...authstore } = useAuthStore();
    const updateBasicInfoMutation = useUpdateBasicInfoMutation({
        onSuccess: () => {
            setIsChange(true);
            toast.success('Cập nhật thông tin cơ bản thành công');
        },
        onError: (error, data) => {
            if (error.message === ErrorAuth.RT_INVALID || error.message === ErrorAuth.AT_RT_INVALID) {
                authstore.reset();
            } else if (error.message === ErrorAuth.AT_INVALID) {
                updateBasicInfoMutation.mutate(data);
            }
        },
    });

    const uploadMediaMutation = useUploadMediaMutation({
        onError: () => {
            toast.error('Upload ảnh lên server xảy ra lỗi, tải lại trang và thử lại');
        },
    });

    const defaultValues = {
        fullName: accountType?.user.fullName,
        phone: accountType?.user.phone,
        birthday: accountType?.user.birthday,
        address: accountType?.user.address,
        avartar: accountType?.user.avatar,
    };
    const [birthday, setBirthday] = useState(defaultValues.birthday ? new Date(defaultValues.birthday) : null);
    const [file, setFile] = useState<FileWithPath | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<UserCredentials>({ defaultValues, mode: 'onBlur' });

    const onSubmit: SubmitHandler<UserCredentials> = async (data) => {
        if (!updateBasicInfoMutation.isLoading && isValid && isDirty) {
            if (data.avatar && file) {
                const dataMedia = await uploadMediaMutation.mutateAsync({ file: file, type: typeEnum.IMAGE });
                if (dataMedia) {
                    updateBasicInfoMutation.mutate({ ...data, avatar: dataMedia.url });
                }
            } else {
                updateBasicInfoMutation.mutate(data);
            }
        }
    };

    const previewImage = (file: FileWithPath) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image src={imageUrl} className="rounded-[50%]" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    };

    return (
        accountType && (
            <div className="basic-info-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-flow-row  gap-y-6 gap-x-[8%] sm:grid-cols-[1fr_1fr]">
                        <div className="w-full flex items-center gap-x-5">
                            <div className="h-24 w-24">
                                {file === null ? (
                                    accountType.user.avatar ? (
                                        <Image src={accountType.user.avatar} className="rounded-[50%]" />
                                    ) : (
                                        <AvartarIcon fullName={accountType.user.fullName} />
                                    )
                                ) : (
                                    previewImage(file)
                                )}
                            </div>
                            <Dropzone
                                multiple={false}
                                onDrop={(files) => {
                                    setFile(files[0]);
                                    setValue('avatar', files[0].name, { shouldDirty: true });
                                    toast.success('Tải ảnh thành công, nhấn thay đổi thông tin để cập nhật');
                                }}
                                onReject={() => {
                                    toast.error('Kích thước ảnh quá 100Kb hoặc không đúng định dạng ảnh');
                                }}
                                maxSize={100 * 1024}
                                accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                            >
                                Tải ảnh mới
                            </Dropzone>
                        </div>
                        <div className="w-full">
                            <Input
                                defaultValue={accountType.user.email}
                                disabled={true}
                                label={{ children: 'Địa chỉ email' }}
                                typeinput="header"
                                className="h-11 rounded-lg w-full"
                            ></Input>
                        </div>
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
                            <Input
                                disabled={updateBasicInfoMutation.isLoading}
                                label={{ children: 'Địa chỉ' }}
                                {...register('address')}
                                typeinput="header"
                                className="h-11 rounded-lg w-full"
                                placeholder="Địa chỉ của bạn"
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
                                        setValue('birthday', new Date(e!.getTime() + 86400000).toISOString(), {
                                            shouldDirty: true,
                                        });
                                    }}
                                />
                            </DatesProvider>
                        </div>
                    </div>
                    <div className="flex gap-x-4 gap-y-4 mt-6 flex-col sm:flex-row">
                        <Button
                            isAnimate={true}
                            disabled={
                                updateBasicInfoMutation.isLoading ||
                                uploadMediaMutation.isLoading ||
                                !isValid ||
                                !isDirty
                            }
                            type="submit"
                            className="min-w-[240px]"
                            whileTap={
                                !updateBasicInfoMutation.isLoading &&
                                !uploadMediaMutation.isLoading &&
                                isValid &&
                                isDirty
                                    ? { scale: 0.9 }
                                    : {}
                            }
                            {...((!isValid || !isDirty) && { className: 'bg-disable text-placeholder-gray' })}
                        >
                            {updateBasicInfoMutation.isLoading || uploadMediaMutation.isLoading ? (
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
