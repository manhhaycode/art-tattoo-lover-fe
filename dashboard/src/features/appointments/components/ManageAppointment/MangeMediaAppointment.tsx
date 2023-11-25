import { ErrorCode, errorMsg } from '@/common/types/error';
import DropZoneImage from '@/components/DropZone';
import { IAppointmentStudio, useUpdateAppointmentMutation } from '@/features/appointments';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { IMedia } from '@/features/studio';
import queryClient from '@/lib/react-query';
import { Button, Modal, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function MangeMediaAppointment({
    handleModalState,
    appointmentInfo,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    appointmentInfo?: IAppointmentStudio;
}) {
    const [mediaList, setMediaList] = useState<IMedia[]>(
        appointmentInfo?.listMedia.filter((media) => media.type === typeEnum.IMAGE) || [],
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

    const updateAppointmentMutation = useUpdateAppointmentMutation({
        onSuccess: () => {
            toast.success('Cập nhật hình ảnh lịch hẹn thành công');
            queryClient.invalidateQueries(['appointmentsStudio']);
            handleModalState[1].close();
        },
        onError: (e) => {
            const error = e.message as ErrorCode;
            toast.error(errorMsg[error] || 'Đã có lỗi xảy ra, vui lòng thử lại sau');
        },
    });

    useEffect(() => {
        if (appointmentInfo?.listMedia)
            setMediaList(appointmentInfo.listMedia.filter((media) => media.type === typeEnum.IMAGE));
    }, [appointmentInfo?.listMedia]);

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'xl'}
            title={<Text className="text-sm font-semibold">Quản lý các ảnh trong lịch hẹn</Text>}
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
                            updateAppointmentMutation.mutate({
                                listNewMedia: mediaList.filter((item) => item.url.length > 0),
                                listRemoveMedia: appointmentInfo?.listMedia.map((item) => item.id),
                                id: appointmentInfo?.id || '',
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
                                maxSize={1000}
                                errorString="Kích thước ảnh quá 1Mb hoặc không đúng định dạng ảnh"
                            />
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}
