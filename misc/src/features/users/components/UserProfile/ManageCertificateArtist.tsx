import DropZoneImage from '@/components/DropZone';
import Button from '@/components/common/Button';
import { IMedia, typeEnum, useUploadMediaMutation } from '@/features/media';
import { FileWithPath } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useUpdateBasicInfoMutation } from '../../api';
import queryClient from '@/lib/react-query';
export default function ManageCertificateArtist({ listMedia }: { listMedia: IMedia[] }) {
    const [certificateList, setCertificateList] = useState<IMedia[]>(
        listMedia.filter((media) => media.type === typeEnum.CERT),
    );

    const uploadMediaMutation = useUploadMediaMutation({
        onSuccess: (data, variables) => {
            const media = certificateList.find((item) => item.id === variables.id);
            if (media) {
                media.url = data.url;
                setCertificateList([...certificateList]);
            } else {
                toast.error('Tải chứng chỉ thành công nhưng xảy ra lỗi ứng dụng');
            }
            toast.success('Tải lên chứng chỉ thành công');
        },
        onError: () => {
            toast.error('Tải lên chứng chỉ thất bại');
        },
    });

    const updateProfileMutation = useUpdateBasicInfoMutation({
        onSuccess: async () => {
            await queryClient.invalidateQueries(['userProfile']);
            toast.success('Cập nhật thông tin thành công');
        },
        onError: () => {
            toast.error('Cập nhật thông tin thất bại');
        },
    });

    useEffect(() => {
        setCertificateList(listMedia.filter((media) => media.type === typeEnum.CERT));
    }, [listMedia]);

    return (
        <div className="w-full">
            <div className="flex gap-x-6">
                <Button
                    onClick={() => {
                        setCertificateList([...certificateList, { id: uuidv4(), url: '', type: typeEnum.CERT }]);
                    }}
                    className="w-fit mb-6"
                >
                    Thêm chứng chỉ mới
                </Button>
                <Button
                    onClick={() => {
                        updateProfileMutation.mutate({
                            listNewMedia: certificateList.filter((item) => item.url.length > 0),
                            listRemoveMedia: listMedia.map((item) => item.id),
                        });
                    }}
                    className="w-fit mb-6 bg-white text-black"
                >
                    Lưu chứng chỉ
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {certificateList.map((media) => {
                    return (
                        <DropZoneImage
                            handleRemove={() => {
                                setCertificateList(certificateList.filter((item) => item.id !== media.id));
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
                        />
                    );
                })}
            </div>
        </div>
    );
}
