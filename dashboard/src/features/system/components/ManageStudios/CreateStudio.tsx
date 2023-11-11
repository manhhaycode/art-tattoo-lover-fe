import { AspectRatio, Button, Group, Image, Input, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateStudioMutation } from '@/features/system';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { IStudio } from '@/features/studio';
import { AutocompleteAddress } from '@/features/map/components';
import { useSearchLocationStore } from '@/store/componentStore';
import { usePlaceDetailMutation } from '@/features/map/api';

const previewImage = (file: FileWithPath) => {
    const imageUrl = URL.createObjectURL(file);
    return (
        <AspectRatio ratio={16 / 9}>
            <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
        </AspectRatio>
    );
};

export default function CreateStudio({ refreshData }: { refreshData: () => void }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { placeChoose, sessionToken, setSessionToken } = useSearchLocationStore();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
        reset,
        trigger,
    } = useForm<IStudio>({ mode: 'onBlur', defaultValues: { address: '' } });
    const createStudioMutation = useCreateStudioMutation({
        onSuccess: () => {
            close();
            toast.success('Tạo studio mới thành công');
            refreshData();
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        },
    });

    const placeDetailMutation = usePlaceDetailMutation({
        onSuccess: () => {
            setSessionToken();
        },
    });

    const uploadMediaMutation = useUploadMediaMutation({
        onError: () => {
            toast.error('Upload ảnh lên server xảy ra lỗi, tải lại trang và thử lại');
        },
    });
    const [file, setFile] = useState<FileWithPath | null>(null);

    const onSubmit: SubmitHandler<IStudio> = async (data) => {
        if (!createStudioMutation.isLoading && isValid && isDirty) {
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
                    createStudioMutation.mutate({ ...data, logo: dataMedia.url });
                }
            } else {
                createStudioMutation.mutate(data);
            }
        }
    };

    useEffect(() => {
        if (placeChoose) {
            setValue('address', placeChoose.description!, { shouldDirty: true });
        } else setValue('address', '', { shouldDirty: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeChoose]);

    return (
        <Group justify="end">
            <Button
                onClick={() => {
                    open();
                    reset();
                }}
            >
                Tạo studio mới
            </Button>
            <Modal
                size={'xl'}
                opened={opened}
                onClose={close}
                centered
                title={<Text className="text-sm font-semibold">Thêm tài khoản mới vào studio</Text>}
                overlayProps={{
                    backgroundOpacity: 0.7,
                    blur: 2,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="h-[480px]">
                    <div className="grid grid-cols-[1fr_1fr] gap-y-6 gap-x-[8%]">
                        <div className="w-full self-end flex items-center gap-x-5">
                            <div className="w-full">{file !== null && previewImage(file)}</div>
                            <Button classNames={{ root: 'p-0' }} disabled={createStudioMutation.isLoading}>
                                <Dropzone
                                    unstyled
                                    classNames={{
                                        root: 'py-2 px-5',
                                        inner: 'font-semibold text-sm w-full',
                                    }}
                                    multiple={false}
                                    onDrop={(files) => {
                                        setFile(files[0]);
                                        setValue('logo', files[0].name, { shouldDirty: true });
                                        toast.success('Tải ảnh thành công, nhấn lưu thay đổi để cập nhật');
                                    }}
                                    onReject={() => {
                                        toast.error('Kích thước ảnh quá 100Kb hoặc không đúng định dạng ảnh');
                                    }}
                                    maxSize={100 * 1024}
                                    accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                                >
                                    Tải ảnh mới
                                </Dropzone>
                            </Button>
                        </div>
                        <div className="flex flex-col gap-y-2">
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
                                placeholder="Nhập địa chỉ email studio"
                                disabled={createStudioMutation.isLoading}
                            />
                            {errors.email && (
                                <label className="text-xs font-semibold text-red-500">{errors.email.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Tên studio</label>
                            <Input
                                {...register('name', {
                                    required: 'Tên studio không được để trống',
                                })}
                                placeholder="Nhập tên studio"
                                disabled={createStudioMutation.isLoading}
                            />
                            {errors.name && (
                                <label className="text-xs font-semibold text-red-500">{errors.name.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Số điện thoại của studio</label>
                            <Input
                                {...register('phone', {
                                    required: 'Số điện thoại không được để trống',
                                    pattern: {
                                        value: /^0[0-9]{2,14}$/,
                                        message: 'Sai định dạng số điện thoại',
                                    },
                                })}
                                placeholder="Nhập số điện thoại studio"
                                disabled={createStudioMutation.isLoading}
                            />
                            {errors.phone && (
                                <label className="text-xs font-semibold text-red-500">{errors.phone.message}</label>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 self-end mt-6">
                        <label className="text-sm font-semibold">Địa chỉ của studio</label>
                        <AutocompleteAddress defaultValue={''} />
                    </div>
                    <Group justify="flex-end" mt={rem(24)}>
                        <Button
                            type="submit"
                            disabled={
                                createStudioMutation.isLoading ||
                                uploadMediaMutation.isLoading ||
                                !isValid ||
                                !isDirty ||
                                !placeChoose
                            }
                            loading={createStudioMutation.isLoading || uploadMediaMutation.isLoading}
                        >
                            Tạo studio mới
                        </Button>
                    </Group>
                </form>
            </Modal>
        </Group>
    );
}
