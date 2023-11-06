import { AspectRatio, Container, Group, Image, Text, Input, Button, useMantineColorScheme, rem } from '@mantine/core';
import { useGetStuidoMutation, useUpdateStudioMutation } from '@/features/studio/api';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSearchLocationStore, useStudioStore } from '@/store/componentStore';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IStudio } from '@/features/studio';
import logoStudio from '@/assets/img/imgLogoStudio.png';
import { toast } from 'react-hot-toast';
import { AutocompleteAddress } from '@/features/map/components';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { usePlaceDetailMutation } from '@/features/map/api';
import { twMerge } from 'tailwind-merge';
import EditWorkingTime from '../EditWorkingTime/EditWorkingTime';
import { useNavigate } from 'react-router-dom';

const previewImage = (file: FileWithPath) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
};

export default function BasicInfoForm() {
    const { accountType } = useAuthStore();
    const { setBasicInfoStudio, basicInfoStudio } = useStudioStore();
    const [isReset, setIsReset] = useState(false);
    const [file, setFile] = useState<FileWithPath | null>(null);
    const { placeChoose, setPlaceDetail, sessionToken, setSessionToken } = useSearchLocationStore();
    const colorSchema = useMantineColorScheme();
    const navigate = useNavigate();
    const getStudioMutation = useGetStuidoMutation({
        onSuccess: (data) => {
            const listWorkingTime = data.workingTimes.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
            setBasicInfoStudio({ ...data, workingTimes: listWorkingTime });
            reset({ ...data });
        },
    });

    const updateStudioMutation = useUpdateStudioMutation({
        onSuccess: () => {
            toast.success('Thay đổi thông tin thành công');
            getStudioMutation.mutate(accountType!.studioId!);
        },
    });

    const uploadMediaMutation = useUploadMediaMutation({});
    const {
        register,
        reset,
        setValue,
        trigger,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm<IStudio>({ defaultValues: { ...basicInfoStudio }, mode: 'onBlur' });
    const placeDetailMutation = usePlaceDetailMutation({
        onSuccess: (data) => {
            setPlaceDetail(data);
            setSessionToken();
        },
    });
    const onSubmit: SubmitHandler<IStudio> = async (data) => {
        if (!updateStudioMutation.isLoading && isValid && isDirty) {
            if (placeChoose && placeChoose.place_id) {
                const placDetail = await placeDetailMutation.mutateAsync({
                    placeId: placeChoose.place_id!,
                    sessionToken: sessionToken,
                });
                if (placDetail && placDetail.geometry) {
                    data.latitude = placDetail.geometry.location.lat;
                    data.longitude = placDetail.geometry.location.lng;
                    setSessionToken();
                } else {
                    toast.error('Có lỗi xảy ra khi thay đổi địa chỉ, vui lòng thử lại sau');
                    return;
                }
            }
            if (data.logo && file) {
                const dataMedia = await uploadMediaMutation.mutateAsync({ file: file, type: typeEnum.IMAGE });
                if (dataMedia) {
                    updateStudioMutation.mutate({ ...data, logo: dataMedia.url });
                }
            } else {
                updateStudioMutation.mutate(data);
            }
        }
    };

    useEffect(() => {
        if (accountType?.studioId) {
            getStudioMutation.mutate(accountType.studioId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType?.studioId]);

    useEffect(() => {
        if (placeChoose) {
            setValue('address', placeChoose.description!, { shouldDirty: true });
        } else if (basicInfoStudio) {
            setValue('address', basicInfoStudio.address, { shouldDirty: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeChoose]);

    return (
        <>
            {!accountType || getStudioMutation.isLoading || !basicInfoStudio ? (
                <div>Is loading...</div>
            ) : (
                <Container
                    fluid
                    {...(colorSchema.colorScheme !== 'dark' && {
                        style: {
                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                        },
                    })}
                    className={twMerge(
                        'rounded-xl p-6 m-0 h-[3000px]',
                        colorSchema.colorScheme === 'dark' && 'bg-dark-theme',
                    )}
                >
                    <Text className="text-xl font-semibold">Thông tin cơ bản của studio</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-x-14 gap-y-6 mt-6">
                            <Group gap={24}>
                                <AspectRatio ratio={16 / 9} className="w-80">
                                    {file === null ? (
                                        basicInfoStudio.logo ? (
                                            <Image src={basicInfoStudio.logo} />
                                        ) : (
                                            <Image src={logoStudio} />
                                        )
                                    ) : (
                                        previewImage(file)
                                    )}
                                </AspectRatio>
                                <Dropzone
                                    variant="filled"
                                    multiple={false}
                                    onDrop={(files) => {
                                        setFile(files[0]);
                                        setValue('logo', files[0].name, { shouldDirty: true });
                                        toast.success('Tải ảnh thành công, nhấn thay đổi thông tin để cập nhật');
                                    }}
                                    onReject={() => {
                                        toast.error('Kích thước ảnh quá 100Kb hoặc không đúng định dạng ảnh');

                                        // console.log('rejected files', files)
                                    }}
                                    maxSize={100 * 1024}
                                    accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                >
                                    <Text className="font-semibold">Tải ảnh mới</Text>
                                </Dropzone>
                            </Group>
                            <div className="flex flex-col justify-between">
                                <Button onClick={() => navigate('/studio/preview-studio')} className="w-fit">
                                    Xem và sửa trang giới thiệu studio
                                </Button>
                                <div className="flex flex-col gap-y-2 self-end w-full">
                                    <label className="text-sm font-semibold">Địa chỉ Email</label>
                                    <Input
                                        {...register('email', {
                                            pattern: {
                                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                                message: 'Sai định dạng email',
                                            },
                                            required: 'Email không được để trống',
                                            onChange: () => {
                                                trigger('email');
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <label className="text-xs font-semibold text-red-500">
                                            {errors.email.message}
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Tên studio</label>
                                <Input
                                    {...register('name', {
                                        required: 'Tên studio không được để trống',
                                    })}
                                />
                                {errors.name && (
                                    <label className="text-xs font-semibold text-red-500">{errors.name.message}</label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Số điện thoại của studio</label>
                                <Input
                                    {...register('phone', {
                                        required: 'Số điện thoại của studio',
                                    })}
                                />
                                {errors.phone && (
                                    <label className="text-xs font-semibold text-red-500">{errors.phone.message}</label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Câu slogan của studio</label>
                                <Input
                                    {...register('slogan', {
                                        required: 'Câu slogan không được để trống',
                                    })}
                                />
                                {errors.slogan && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.slogan.message}
                                    </label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Đoạn giới thiệu studio</label>
                                <Input
                                    {...register('introduction', {
                                        required: 'Đoạn giới thiệu không được để trống',
                                    })}
                                />
                                {errors.introduction && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.introduction.message}
                                    </label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Trang web của studio</label>
                                <Input {...register('website')} />
                                {errors.website && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.website.message}
                                    </label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Trang facebook của studio</label>
                                <Input {...register('facebook')} />
                                {errors.facebook && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.facebook.message}
                                    </label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Trang instagram của studio</label>
                                <Input {...register('instagram')} />
                                {errors.instagram && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.instagram.message}
                                    </label>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Địa chỉ của studio</label>
                                {basicInfoStudio.address && (
                                    <AutocompleteAddress
                                        reset={isReset}
                                        setIsReset={setIsReset}
                                        defaultValue={watch('address')}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-y-2 self-end">
                                <label className="text-sm font-semibold">Chọn lịch làm việc của studio</label>
                                <div className="flex flex-col gap-y-5 my-4">
                                    {
                                        <EditWorkingTime
                                            handleChange={(e) => {
                                                setValue('workingTimes', e, { shouldDirty: true });
                                            }}
                                            list={watch('workingTimes')}
                                        />
                                    }
                                </div>
                                {errors.workingTimes && (
                                    <label className="text-xs font-semibold text-red-500">
                                        {errors.workingTimes.message}
                                    </label>
                                )}
                            </div>
                        </div>
                        <Group mt={rem(16)}>
                            <Button
                                type="submit"
                                disabled={
                                    updateStudioMutation.isLoading ||
                                    uploadMediaMutation.isLoading ||
                                    !isValid ||
                                    !isDirty
                                }
                                loading={updateStudioMutation.isLoading || uploadMediaMutation.isLoading}
                            >
                                Thay đổi thông tin studio
                            </Button>
                            <Button
                                onClick={() => {
                                    reset();
                                    setIsReset(true);
                                }}
                            >
                                Đặt lại thông tin studio
                            </Button>
                        </Group>
                    </form>
                </Container>
            )}
        </>
    );
}
