import { ErrorCode, errorMsg } from '@/common/types/error';
import DropZoneImage from '@/components/DropZone';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { IMedia } from '@/features/studio';
import { Button, Modal, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { IService, useUpdateServiceMutation } from '@/features/services';

export default function ManageMediaService({
    handleModalState,
    serviceInfo,
    refreshData,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    serviceInfo?: IService;
    refreshData: () => void;
}) {
    const [mediaList, setMediaList] = useState<IMedia[]>(
        serviceInfo?.listMedia.filter((media) => media.type === typeEnum.IMAGE) || [],
    );

    const uploadMediaMutation = useUploadMediaMutation({
        onSuccess: (data, variables) => {
            const media = mediaList.find((item) => item.id === variables.id);
            if (media) {
                media.url = data.url;
                setMediaList([...mediaList]);
            } else {
                toast.error('Tải lên ảnh thành công nhưng xảy ra lỗi ứng dụng');
            }
            toast.success('Tải ảnh lên thành công');
        },
        onError: () => {
            toast.error('Tải ảnh lên thất bại');
        },
    });

    const updateServiceMutation = useUpdateServiceMutation({
        onSuccess: () => {
            toast.success('Cập nhật hình ảnh dịch vụ thành công');
            handleModalState[1].close();
            refreshData && refreshData();
        },
        onError: (e) => {
            const error = e.message as ErrorCode;
            toast.error(errorMsg[error] || 'Đã có lỗi xảy ra, vui lòng thử lại sau');
        },
    });

    useEffect(() => {
        if (serviceInfo?.listMedia)
            setMediaList(serviceInfo.listMedia.filter((media) => media.type === typeEnum.IMAGE));
    }, [serviceInfo?.listMedia]);

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'xl'}
            title={<Text className="text-sm font-semibold">Quản lý ảnh giới thiệu dịch vụ</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <div className="w-full">
                <div className="flex gap-x-6">
                    <Button
                        onClick={() => {
                            setMediaList([...mediaList, { id: uuidv4(), url: '', type: typeEnum.IMAGE }]);
                        }}
                        className="w-fit mb-6"
                    >
                        Thêm ảnh mới
                    </Button>
                    <Button
                        onClick={() => {
                            updateServiceMutation.mutate({
                                listNewMedia: mediaList.filter((item) => item.url.length > 0),
                                listRemoveMedia: serviceInfo?.listMedia.map((item) => item.id),
                                id: serviceInfo?.id || '',
                            });
                        }}
                        className="w-fit mb-6 bg-white text-black"
                    >
                        Lưu các ảnh
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {mediaList.map((media) => {
                        return (
                            <DropZoneImage
                                handleRemove={() => {
                                    setMediaList(mediaList.filter((item) => item.id !== media.id));
                                }}
                                handleSave={(files: FileWithPath[]) => {
                                    uploadMediaMutation.mutate({
                                        id: media.id,
                                        file: files[0],
                                        type: typeEnum.IMAGE,
                                    });
                                }}
                                key={media.id}
                                src={media.url}
                                maxSize={1024}
                                errorString="Kích thước ảnh quá 1Mb hoặc không đúng định dạng ảnh"
                            />
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}
