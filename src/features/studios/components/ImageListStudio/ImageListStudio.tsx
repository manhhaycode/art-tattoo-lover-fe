import { SkeletonLoader } from '@/components/SkeletonLoader';
import { ImageSlider } from '@/components/common/Image';

export default function ImageListStudio({ listImage, isLoading }: { listImage?: string[]; isLoading?: boolean }) {
    if (isLoading)
        return (
            <div className="grid grid-cols-2 gap-x-4">
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
            {listImage && listImage.length >= 5 && (
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="w-">
                        <img className="rounded-[20px] h-full w-full object-cover" src={listImage[0]} />
                    </div>
                    <div className="grid grid-rows-2 gap-y-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <ImageSlider className="rounded-xl" src={listImage[1]} />
                            <ImageSlider className="rounded-xl" src={listImage[2]} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                            <ImageSlider className="rounded-xl" src={listImage[3]} />
                            <ImageSlider className="rounded-xl" src={listImage[4]} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
