import { SkeletonLoader } from '@/components/SkeletonLoader';
import { ImageSlider } from '@/components/common/Image';
import { AspectRatio, Box } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ImageListStudio({ listImage, isLoading }: { listImage?: string[]; isLoading?: boolean }) {
    const [imageList, setImageList] = useState<string[]>([]);
    useEffect(() => {
        if (listImage && listImage.length >= 5) {
            setImageList(listImage.slice(0, 5));
        } else {
            const listImageArray = listImage || [];
            const listImageDefault = Array(5 - listImageArray.length).fill('');
            setImageList([...listImageArray, ...listImageDefault]);
        }
    }, [listImage]);

    if (isLoading)
        return (
            <div className="grid grid-cols-1 lgm:grid-cols-2 gap-x-4">
                <div className="w-">
                    <div className="rounded-[20px] h-full w-full">
                        <SkeletonLoader />
                    </div>
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
                <div className="grid grid-cols-1 lgm:grid-cols-2 gap-x-4 gap-y-6">
                    {imageList[0].length === 0 ? (
                        <AspectRatio ratio={16 / 9}>
                            <Box className="rounded-xl bg-gray-dark flex justify-center items-center">
                                <IconPhoto size={40} className="text-gray-400" />
                            </Box>
                        </AspectRatio>
                    ) : (
                        <ImageSlider className="rounded-[20px] h-full w-full object-cover" src={imageList[0]} />
                    )}

                    <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        {imageList.slice(1, 5).map((image, index) => {
                            if (image.length === 0) {
                                return (
                                    <AspectRatio ratio={16 / 9} key={index}>
                                        <Box className="rounded-xl bg-gray-dark flex justify-center items-center">
                                            <IconPhoto size={40} className="text-gray-400" />
                                        </Box>
                                    </AspectRatio>
                                );
                            } else return <ImageSlider key={index} className="rounded-xl" src={image} />;
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
