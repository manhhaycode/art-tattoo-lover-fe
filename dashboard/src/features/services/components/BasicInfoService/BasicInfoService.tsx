import { Button, Group, Input, Modal, Select, Text, Image, AspectRatio } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { IService, useCreateServiceMutation, useUpdateServiceMutation } from '@/features/services';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { useGetListCategory } from '@/features/category';
import { typeEnum, useUploadMediaMutation } from '@/features/media';

export default function BasicInfoService({
    refreshData,
    handleModalState,
    serviceInfo,
}: {
    refreshData?: () => void;
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    serviceInfo?: IService;
}) {
    const [file, setFile] = useState<FileWithPath | null>(null);
    const defaultValues: Partial<IService> = {
        name: '',
        expectDuration: '',
        isDisabled: false,
        listMedia: [],
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
        reset,
        watch,
    } = useForm<IService>({ mode: 'onBlur', defaultValues });
    const categoryList = useGetListCategory();
    const createServiceMutation = useCreateServiceMutation({
        onSuccess: () => {
            handleModalState[1].close();
            toast.success('Thêm dịch vụ mới thành công');
            refreshData && refreshData();
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        },
    });
    const updateServiceMutation = useUpdateServiceMutation({
        onSuccess: () => {
            handleModalState[1].close();
            toast.success('Cập nhật dịch vụ thành công');
            refreshData && refreshData();
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        },
    });

    const uploadMediaMutation = useUploadMediaMutation({});

    const onSubmit: SubmitHandler<IService> = async (data) => {
        // createUserStudioMutation.mutate(data);
        let thumbnail = serviceInfo?.thumbnail;
        if (!thumbnail && !file) {
            toast.error('Vui lòng tải ảnh cho dịch vụ');
            return;
        }
        const expectDuration = data.expectDuration! + ':00';
        if (file) {
            const dataMedia = await uploadMediaMutation.mutateAsync({ file: file, type: typeEnum.IMAGE });
            thumbnail = dataMedia.url;
        }
        if (serviceInfo) {
            updateServiceMutation.mutate({ ...data, id: serviceInfo.id, thumbnail, expectDuration });
        } else {
            createServiceMutation.mutate({ ...data, thumbnail, expectDuration, listMedia: [], description: '' });
        }
    };

    const previewImage = (file: FileWithPath) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <AspectRatio ratio={16 / 9}>
                <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
            </AspectRatio>
        );
    };

    useEffect(() => {
        if (serviceInfo) {
            reset({
                ...serviceInfo,
                expectDuration:
                    serviceInfo?.expectDuration?.split(':')[0] + ':' + serviceInfo?.expectDuration?.split(':')[1],
            });
        } else {
            reset(defaultValues);
        }
        setFile(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceInfo?.id, handleModalState[0]]);

    return (
        <Modal
            size={'xl'}
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            title={
                <Text className="text-sm font-semibold">
                    {serviceInfo ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới vào studio'}
                </Text>
            }
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
            closeOnClickOutside={serviceInfo ? true : false}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[1fr_1fr] gap-y-6 gap-x-[8%]">
                    <div className="w-full self-end flex items-center gap-x-5">
                        <div className="w-full">
                            {file !== null ? (
                                previewImage(file)
                            ) : serviceInfo?.thumbnail ? (
                                <AspectRatio ratio={16 / 9}>
                                    <Image src={serviceInfo?.thumbnail} />
                                </AspectRatio>
                            ) : (
                                <BiCategory size={40} />
                            )}
                        </div>
                        <Button
                            classNames={{ root: 'p-0' }}
                            disabled={createServiceMutation.isLoading || updateServiceMutation.isLoading}
                        >
                            <Dropzone
                                unstyled
                                classNames={{
                                    root: 'py-2 px-5',
                                    inner: 'font-semibold text-sm w-full',
                                }}
                                multiple={false}
                                onDrop={(files) => {
                                    setFile(files[0]);
                                    setValue('thumbnail', files[0].name, { shouldDirty: true });
                                    // console.log('accepted files', files[0]);
                                    toast.success('Tải ảnh thành công, nhấn lưu thay đổi để cập nhật');
                                }}
                                onReject={() => {
                                    toast.error('Kích thước ảnh quá 100Kb hoặc không đúng định dạng ảnh');

                                    // console.log('rejected files', files)
                                }}
                                maxSize={100 * 1024}
                                accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                            >
                                Tải ảnh mới
                            </Dropzone>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-2 justify-end">
                        <label className="text-sm font-semibold">Tên dịch vụ</label>
                        <Input
                            {...register('name', {
                                required: 'Tên dịch vụ không được để trống',
                            })}
                            placeholder="Nhập tên dịch vụ"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                        {errors.name && (
                            <label className="text-xs font-semibold text-red-500">{errors.name.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Giá cao nhất</label>
                        <Input
                            type="number"
                            {...register('maxPrice', {
                                required: 'Giá cao nhất không được để trống',
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'Giá cao nhất phải lớn hơn 0',
                                },
                                validate: (value) => {
                                    if (Number(value) < Number(watch('minPrice'))) {
                                        return 'Giá cao nhất phải lớn hơn giá thấp nhất';
                                    }
                                },
                            })}
                            placeholder="Nhập giá cao nhất"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                        {errors.maxPrice && (
                            <label className="text-xs font-semibold text-red-500">{errors.maxPrice.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Giá thấp nhất</label>
                        <Input
                            type="number"
                            {...register('minPrice', {
                                valueAsNumber: true,
                                required: 'Giá thấp nhất không được để trống',
                                validate: (value) => {
                                    if (Number(value) > Number(watch('maxPrice'))) {
                                        return 'Giá thấp nhất phải nhỏ hơn giá cao nhất';
                                    }
                                },
                                min: {
                                    value: 0,
                                    message: 'Giá thấp nhất phải lớn hơn 0',
                                },
                            })}
                            placeholder="Nhập giá thấp nhất"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                        {errors.minPrice && (
                            <label className="text-xs font-semibold text-red-500">{errors.minPrice.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Giảm giá</label>
                        <Input
                            type="number"
                            {...register('discount', {
                                required: 'Giảm giá không được để trống',
                                valueAsNumber: true,
                                max: {
                                    value: 100,
                                    message: 'Giảm giá tối đa 100%',
                                },
                                min: {
                                    value: 0,
                                    message: 'Giảm giá tối thiểu 0%',
                                },
                            })}
                            placeholder="Nhập % giảm giá"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                        {errors.discount && (
                            <label className="text-xs font-semibold text-red-500">{errors.discount.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Thời gian dự kiến</label>
                        <Input
                            {...register('expectDuration', {
                                pattern: {
                                    value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                    message: 'Thời gian dự kiến phải có định dạng hh:mm',
                                },
                            })}
                            placeholder="Nhập thời gian dự kiến"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                        {errors.expectDuration && (
                            <label className="text-xs font-semibold text-red-500">
                                {errors.expectDuration.message}
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Loại dịch vụ</label>
                        <input
                            hidden
                            {...register('categoryId', {
                                required: 'Loại dịch vụ không được để trống',
                            })}
                            value={watch('categoryId')}
                        />
                        {categoryList.data && (
                            <Select
                                value={watch('categoryId')?.toString() || ''}
                                data={categoryList.data.map((category) => {
                                    return {
                                        value: category.id.toString(),
                                        label: category.name,
                                    };
                                })}
                                onChange={(e) => {
                                    setValue('categoryId', Number(e), { shouldDirty: true, shouldValidate: true });
                                }}
                                rightSectionProps={{ className: 'hidden' }}
                                className="text-sm font-semibold"
                                allowDeselect={false}
                                classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                                withCheckIcon={false}
                                searchable
                                disabled={
                                    createServiceMutation.isLoading ||
                                    updateServiceMutation.isLoading ||
                                    uploadMediaMutation.isLoading
                                }
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-semibold">Trạng thái</label>
                        <Select
                            value={watch('isDisabled') ? 'true' : 'false'}
                            data={[
                                {
                                    label: 'Đã tạm khóa',
                                    value: 'false',
                                },
                                {
                                    label: 'Đã kích hoạt',
                                    value: 'true',
                                },
                            ]}
                            onChange={(e) => {
                                setValue('isDisabled', e === 'true' ? true : false, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                        />
                    </div>
                </div>
                <Group justify="flex-end" className="mt-8">
                    <Button
                        onClick={() => {
                            console.log('submit');
                        }}
                        disabled={
                            !isValid ||
                            !isDirty ||
                            createServiceMutation.isLoading ||
                            updateServiceMutation.isLoading ||
                            uploadMediaMutation.isLoading
                        }
                        loading={
                            createServiceMutation.isLoading ||
                            updateServiceMutation.isLoading ||
                            uploadMediaMutation.isLoading
                        }
                        type="submit"
                        className="max-w-fit"
                    >
                        {serviceInfo ? 'Xác nhận' : 'Thêm mới'}
                    </Button>
                    {serviceInfo && (
                        <Button
                            type="button"
                            disabled={
                                createServiceMutation.isLoading ||
                                updateServiceMutation.isLoading ||
                                uploadMediaMutation.isLoading
                            }
                            onClick={() =>
                                reset({
                                    ...serviceInfo,
                                    expectDuration:
                                        serviceInfo?.expectDuration?.split(':')[0] +
                                        ':' +
                                        serviceInfo?.expectDuration?.split(':')[1],
                                })
                            }
                        >
                            Đặt lại thông tin
                        </Button>
                    )}
                </Group>
            </form>
        </Modal>
    );
}
