import DropZoneImage from '@/components/DropZone';
import Button from '@/components/common/Button';
import { IMedia, typeEnum, useUploadMediaMutation } from '@/features/media';
import { useUpdateBasicInfoMutation } from '@/features/users';
import { useAuthStore } from '@/store/authStore';
import { FileWithPath } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
export default function ManageMediaArtist({ listMedia }: { listMedia: IMedia[] }) {
    const { setIsChange } = useAuthStore();
    const [mediaList, setMediaList] = useState<IMedia[]>(listMedia.filter((media) => media.type === typeEnum.IMAGE));

    const uploadMediaMutation = useUploadMediaMutation({
        onSuccess: (data, variables) => {
            const media = mediaList.find((item) => item.id === variables.id);
            if (media) {
                media.url = data.url;
                setMediaList([...mediaList]);
            } else {
                toast.error('Tải lên ảnh giới thiệu thành công nhưng xảy ra lỗi ứng dụng');
            }
            toast.success('Tải lên ảnh giới thiệu thành công');
        },
        onError: () => {
            toast.error('Tải lên ảnh giới thiệu thất bại');
        },
    });

    const updateProfileMutation = useUpdateBasicInfoMutation({
        onSuccess: async () => {
            setIsChange(true);
            toast.success('Cập nhật thông tin thành công');
        },
        onError: () => {
            toast.error('Cập nhật thông tin thất bại');
        },
    });

    useEffect(() => {
        setMediaList(listMedia.filter((media) => media.type === typeEnum.IMAGE));
    }, [listMedia]);
    return (
        <div className="w-full">
            <div className="flex gap-x-6">
                <Button
                    onClick={() => {
                        setMediaList([...mediaList, { id: uuidv4(), url: '', type: typeEnum.IMAGE }]);
                    }}
                    className="w-fit mb-6"
                >
                    Thêm ảnh giới thiệu mới
                </Button>
                <Button
                    onClick={() => {
                        updateProfileMutation.mutate({
                            listNewMedia: mediaList.filter((item) => item.url.length > 0),
                            listRemoveMedia: listMedia
                                .filter((media) => media.type === typeEnum.IMAGE)
                                .map((item) => item.id),
                        });
                    }}
                    className="w-fit mb-6 bg-white text-black"
                >
                    Lưu ảnh giới thiệu
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
                            fileSize={1000}
                            errorMessage="Kích thước ảnh quá 1Mb hoặc không đúng định dạng ảnh"
                        />
                    );
                })}
            </div>
        </div>
    );
}
