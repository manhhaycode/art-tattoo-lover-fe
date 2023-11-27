import { SubmitHandler, useForm } from 'react-hook-form';
import { AvartarIcon, IUser } from '@/features/users';
import Image from '@/components/common/Image';
import { DatesProvider, DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import 'dayjs/locale/vi';
import { Button, Input, Loader, PasswordInput, Select } from '@mantine/core';
import { toast } from 'react-hot-toast';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { ErrorAuth } from '@/lib/error';
import { useAuthStore } from '@/store/authStore';
import { ICreateUserReq, useCreateUserMutation, useUpdateUserMutation } from '@/features/system';
import { roleMap } from '@/features/auth';
import { useDisclosure } from '@mantine/hooks';

export default function BasicInfoForm({
    userInfo,
    onChangedOrCreate,
}: {
    userInfo?: IUser;
    onChangedOrCreate?: () => void;
}) {
    const authStore = useAuthStore();
    const [visible, { toggle }] = useDisclosure(false);

    const updateBasicInfoMutation = useUpdateUserMutation({
        onSuccess: () => {
            toast.success('Cập nhật thông tin cơ bản thành công');
            onChangedOrCreate && onChangedOrCreate();
        },
        onError: (error, data) => {
            if (error.message === ErrorAuth.RT_INVALID || error.message === ErrorAuth.AT_RT_INVALID) {
                authStore.reset();
            } else if (error.message === ErrorAuth.AT_INVALID) {
                updateBasicInfoMutation.mutate(data);
            }
        },
    });

    const createUserMutation = useCreateUserMutation({
        onSuccess: () => {
            toast.success('Tạo mới tài khoản thành công');
            onChangedOrCreate && onChangedOrCreate();
        },
        onError: (error, data) => {
            if (error.message === ErrorAuth.RT_INVALID || error.message === ErrorAuth.AT_RT_INVALID) {
                authStore.reset();
            } else if (error.message === ErrorAuth.AT_INVALID) {
                createUserMutation.mutate(data);
            } else if (error.message === 'Email already exists') {
                toast.error('Email đã tồn tại');
            } else {
                toast.error('Có lỗi xảy ra vui lòng thử lại sau');
            }
        },
    });

    const uploadMediaMutation = useUploadMediaMutation({
        onError: () => {
            toast.error('Upload ảnh lên server xảy ra lỗi, tải lại trang và thử lại');
        },
    });

    const defaultValues = {
        fullName: userInfo?.fullName,
        phone: userInfo?.phone,
        birthday: userInfo?.birthday,
        address: userInfo?.address,
        avartar: userInfo?.avatar,
        roleId: userInfo?.roleId || 6,
    };
    const [birthday, setBirthday] = useState(defaultValues.birthday ? new Date(defaultValues.birthday) : null);
    const [file, setFile] = useState<FileWithPath | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        trigger,
        formState: { errors, isValid, isDirty },
    } = useForm<ICreateUserReq & { rePassword: string }>({ defaultValues, mode: 'onBlur' });

    const onSubmit: SubmitHandler<ICreateUserReq & { rePassword: string }> = async (dataSubmit) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { rePassword, ...data } = dataSubmit;
        if (isValid && isDirty) {
            if (data.avatar && file) {
                const dataMedia = await uploadMediaMutation.mutateAsync({ file: file, type: typeEnum.IMAGE });
                if (dataMedia) {
                    if (userInfo) updateBasicInfoMutation.mutate({ ...data, avatar: dataMedia.url });
                    else createUserMutation.mutate({ ...data, avatar: dataMedia.url });
                }
            } else {
                if (userInfo) updateBasicInfoMutation.mutate(data);
                else createUserMutation.mutate(data);
            }
        }
    };

    const previewImage = (file: FileWithPath) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image src={imageUrl} className="rounded-[50%]" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    };

    useEffect(() => {
        if (userInfo) {
            reset(userInfo);
            setBirthday(userInfo.birthday ? new Date(userInfo.birthday) : null);
            setFile(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo?.id]);

    return (
        <div className="basic-info-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[1fr_1fr] gap-y-6 gap-x-[8%]">
                    <div className="w-full self-end flex items-center gap-x-5">
                        <div className="h-14 w-14">
                            {file === null
                                ? userInfo &&
                                  (userInfo.avatar ? (
                                      <Image src={userInfo.avatar} className="rounded-[50%]" />
                                  ) : (
                                      <AvartarIcon fullName={userInfo.fullName} />
                                  ))
                                : previewImage(file)}
                        </div>
                        <Dropzone
                            classNames={{
                                inner: 'font-semibold text base',
                            }}
                            multiple={false}
                            onDrop={(files) => {
                                setFile(files[0]);
                                setValue('avatar', files[0].name, { shouldDirty: true });
                                toast.success('Tải ảnh thành công, nhấn lưu thay đổi để cập nhật');
                            }}
                            onReject={() => {
                                toast.error('Kích thước ảnh quá 1Mb hoặc không đúng định dạng ảnh');
                            }}
                            maxSize={1024 * 1024}
                            accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                        >
                            Tải ảnh mới
                        </Dropzone>
                    </div>
                    <div className="w-full flex flex-col gap-y-2 self-end">
                        <label className=" font-semibold text-sm">Địa chỉ email</label>
                        <Input
                            placeholder="Nhập địa chỉ email"
                            disabled={userInfo ? true : false}
                            {...(!userInfo
                                ? {
                                      ...register('email', {
                                          required: 'Email không được để trống',
                                          pattern: {
                                              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                              message: 'Sai định dạng email',
                                          },
                                          onChange: () => {
                                              trigger('email');
                                          },
                                      }),
                                  }
                                : { defaultValue: userInfo.email })}
                        ></Input>
                        {errors.email && (
                            <label className="text-xs font-semibold text-red-500">{errors.email.message}</label>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-y-2">
                        <label className="font-semibold text-sm">Họ và tên</label>
                        <Input
                            {...register('fullName', {
                                required: 'Họ và tên không được để trống',
                            })}
                            disabled={updateBasicInfoMutation.isLoading}
                            placeholder="Tên của bạn"
                        ></Input>
                        {errors.fullName && (
                            <label className="text-xs font-semibold text-red-500">{errors.fullName.message}</label>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-y-2">
                        <label className="font-semibold text-sm">Số điện thoại</label>
                        <Input
                            {...register('phone', {
                                required: 'Số điện thoại không được để trống',
                            })}
                            disabled={updateBasicInfoMutation.isLoading}
                            placeholder="Số điện thoại của bạn"
                        ></Input>
                        {errors.phone && (
                            <label className="text-xs font-semibold text-red-500">{errors.phone.message}</label>
                        )}
                    </div>
                    {!userInfo ? (
                        <>
                            <div className="w-full flex flex-col gap-y-2">
                                <label className="font-semibold text-sm">Nhập mật khẩu</label>
                                <PasswordInput
                                    disabled={createUserMutation.isLoading}
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
                                    placeholder="Nhập mật khẩu"
                                ></PasswordInput>
                                {errors.password && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.password.message}
                                    </label>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label className="font-semibold text-sm">Nhập lại mật khẩu</label>
                                <PasswordInput
                                    disabled={createUserMutation.isLoading}
                                    visible={visible}
                                    onVisibilityChange={toggle}
                                    {...register('rePassword', {
                                        validate: (value) => value === watch('password') || 'Mật khẩu không khớp',
                                        required: 'Mật khẩu không được để trống',
                                        onChange: () => {
                                            trigger('rePassword');
                                        },
                                        onBlur: () => {
                                            trigger('rePassword');
                                        },
                                    })}
                                    placeholder="Nhập lại mật khẩu"
                                ></PasswordInput>
                                {errors.rePassword && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.rePassword.message}
                                    </label>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-col gap-y-2">
                                <label className=" font-semibold text-sm">Địa chỉ</label>
                                <Input
                                    disabled={updateBasicInfoMutation.isLoading}
                                    {...register('address')}
                                    placeholder="Địa chỉ của bạn"
                                ></Input>
                                {errors.address && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.address.message}
                                    </label>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label className=" font-semibold text-sm">Ngày sinh nhật</label>
                                <DatesProvider settings={{ locale: 'vi', firstDayOfWeek: 0, weekendDays: [0] }}>
                                    <DatePickerInput
                                        disabled={updateBasicInfoMutation.isLoading || uploadMediaMutation.isLoading}
                                        valueFormat="DD/MM/YYYY"
                                        placeholder="Chọn ngày sinh"
                                        value={birthday}
                                        className="!text-inherit"
                                        onChange={(e) => {
                                            setBirthday(e);
                                            setValue('birthday', new Date(e!.getTime() + 86400000).toISOString(), {
                                                shouldDirty: true,
                                            });
                                        }}
                                    />
                                </DatesProvider>
                            </div>
                        </>
                    )}

                    <div className="w-full flex flex-col gap-y-2">
                        <label className=" font-semibold text-sm">Vai trò của tài khoản</label>
                        <Select
                            placeholder="Chọn vai trò"
                            defaultValue={defaultValues.roleId.toString()}
                            data={Object.entries(roleMap).map(([key, value]) => ({ value: key, label: value }))}
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                            onChange={(e) => {
                                setValue('roleId', Number(e), { shouldDirty: true });
                            }}
                            {...(userInfo && { defaultValue: userInfo.roleId.toString() })}
                        />
                        {errors.roleId && (
                            <label className="text-xs font-semibold text-red-500">{errors.roleId.message}</label>
                        )}
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                        <label className=" font-semibold text-sm">Trạng thái tài khoản</label>
                        <Select
                            defaultValue={userInfo ? userInfo.status.toString() : '1'}
                            placeholder="Chọn trạng thái tài khoản"
                            data={[
                                {
                                    label: 'Chưa kích hoạt',
                                    value: '0',
                                },
                                {
                                    label: 'Kích hoạt',
                                    value: '1',
                                },
                                {
                                    label: 'Vô hiệu hóa',
                                    value: '2',
                                },
                            ]}
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                            onChange={(e) => {
                                setValue('status', Number(e), { shouldDirty: true });
                            }}
                        />
                    </div>
                </div>
                <div className="flex gap-x-4 mt-6">
                    <Button
                        disabled={
                            updateBasicInfoMutation.isLoading ||
                            uploadMediaMutation.isLoading ||
                            createUserMutation.isLoading ||
                            !isValid ||
                            !isDirty
                        }
                        type="submit"
                        className="min-w-[240px]"
                        loading={
                            updateBasicInfoMutation.isLoading ||
                            uploadMediaMutation.isLoading ||
                            createUserMutation.isLoading
                        }
                    >
                        {updateBasicInfoMutation.isLoading || uploadMediaMutation.isLoading ? (
                            <Loader size={20} color="#fff" />
                        ) : (
                            <> {!userInfo ? 'Tạo tài khoản' : 'Cập nhật thông tin'}</>
                        )}
                    </Button>
                    {userInfo && (
                        <Button
                            type="button"
                            onClick={() => {
                                reset();
                                setBirthday(defaultValues.birthday ? new Date(defaultValues.birthday) : null);
                            }}
                        >
                            Đặt lại thông tin cơ bản
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
