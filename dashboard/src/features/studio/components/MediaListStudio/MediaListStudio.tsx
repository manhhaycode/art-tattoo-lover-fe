import DropZoneImage from '@/components/DropZone';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { typeEnum, useUploadMediaMutation } from '@/features/media';
import { useState, useEffect } from 'react';
import { IMedia, useUpdateStudioMutation } from '@/features/studio';
import { useAuthStore } from '@/store/authStore';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import queryClient from '@/lib/react-query';
import { ErrorCode, errorMsg } from '@/common/types/error';

export default function MediaListStudio({ listMedia, isLoading }: { listMedia?: IMedia[]; isLoading?: boolean }) {
    const [imageList, setImageList] = useState<IMedia[]>([]);
    const uploadMediaMutation = useUploadMediaMutation({});
    const updateStudioMutation = useUpdateStudioMutation({
        onSuccess: () => {
            toast.success('Cập nhật hình ảnh studio thành công!');
            queryClient.invalidateQueries(['studio']);
        },
        onError: (e) => {
            const error = errorMsg[e.message as ErrorCode];
            if (error) {
                toast.error(error);
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
            queryClient.invalidateQueries(['studio']);
        },
    });
    const { accountType } = useAuthStore();

    useEffect(() => {
        if (listMedia && listMedia.length >= 5) {
            setImageList(listMedia.slice(0, 5));
        } else {
            const listImageArray = listMedia || [];
            const lenght = listImageArray.length;
            for (let i = 0; i < 5 - lenght; i++) {
                listImageArray.push({
                    id: uuidv4(),
                    url: '',
                    type: typeEnum.IMAGE,
                });
            }
            setImageList([...listImageArray]);
        }
    }, [listMedia]);

    if (isLoading)
        return (
            <div className="grid grid-cols-2 gap-x-4">
                <div className="rounded-[20px] h-full w-full">
                    <SkeletonLoader />
                </div>
                <div className="grid grid-rows-2 gap-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="pt-[56.25%] relative">
                            <div className="absolute top-0 h-full w-full">
                                <SkeletonLoader />
                            </div>
                        </div>
                        <div className="pt-[56.25%] relative">
                            <div className="absolute top-0 h-full w-full">
                                <SkeletonLoader />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="pt-[56.25%] relative">
                            <div className="absolute top-0 h-full w-full">
                                <SkeletonLoader />
                            </div>
                        </div>
                        <div className="pt-[56.25%] relative">
                            <div className="absolute top-0 h-full w-full">
                                <SkeletonLoader />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            {imageList && imageList.length >= 5 && (
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="w-full pt-[56.25%] relative">
                        <div className="absolute top-0 left-0 bottom-0 right-0 h-full">
                            <DropZoneImage
                                maxSize={3072}
                                errorString="Kích thước ảnh quá 3Mb hoặc không đúng định dạng ảnh"
                                src={imageList[0].url}
                                handleSave={async (files) => {
                                    const res = await uploadMediaMutation.mutateAsync({
                                        file: files[0],
                                        type: typeEnum.IMAGE,
                                    });
                                    const image = imageList[0];
                                    if (res) {
                                        setImageList((prev) => {
                                            const listImage = [...prev];
                                            listImage[0] = {
                                                id: uuidv4(),
                                                url: res.url,
                                                type: typeEnum.IMAGE,
                                            };
                                            return listImage;
                                        });
                                        image.url = res.url;
                                        updateStudioMutation.mutate({
                                            id: accountType?.studioId || '',
                                            listRemoveMedia: listMedia?.map((media) => media.id),
                                            listNewMedia: [
                                                image,
                                                ...imageList.filter(
                                                    (image, index) => index !== 0 && image.url.length > 0,
                                                ),
                                            ],
                                        });
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        {imageList.slice(1, 5).map((image, index, listSlice) => {
                            return (
                                <div key={index} className="w-full pt-[56.25%] relative">
                                    <div className="absolute top-0 left-0 bottom-0 right-0 h-full">
                                        <DropZoneImage
                                            maxSize={3072}
                                            errorString="Kích thước ảnh quá 3Mb hoặc không đúng định dạng ảnh"
                                            src={image.url}
                                            handleSave={async (files) => {
                                                const res = await uploadMediaMutation.mutateAsync({
                                                    file: files[0],
                                                    type: typeEnum.IMAGE,
                                                });
                                                if (res) {
                                                    const listImage = [...listSlice];
                                                    listImage[index] = {
                                                        id: uuidv4(),
                                                        url: res.url,
                                                        type: typeEnum.IMAGE,
                                                    };
                                                    setImageList([imageList[0], ...listImage]);
                                                    updateStudioMutation.mutate({
                                                        id: accountType?.studioId || '',
                                                        listRemoveMedia: listMedia?.map((media) => media.id),
                                                        listNewMedia: [
                                                            imageList[0],
                                                            ...listImage.filter((image) => image.url.length > 0),
                                                        ],
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
