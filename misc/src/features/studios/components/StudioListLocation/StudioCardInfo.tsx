import { CloseIcon, MapPinIcon, StarIcon } from '@/assets/icons';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import ImageCarousel from '@/components/ImageCarousel';
import { typeEnum } from '@/features/media';
import { IStudio } from '@/features/studios';
import { convertSlugURL } from '@/lib/helper';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
export default function StudioCardInfo({
    studio,
    isSlide = false,
    onClickCloseIcon,
}: {
    studio: IStudio;
    isSlide?: boolean;
    onClickCloseIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
    const navigate = useNavigate();
    const listImage = useMemo(() => {
        const list = studio.listMedia?.filter((item) => item.type === typeEnum.IMAGE);
        if (list?.length === 0)
            return [
                {
                    url: StudioCardImage,
                    type: typeEnum.IMAGE,
                    id: uuidv4(),
                },
            ];
        return list;
    }, [studio.listMedia]);
    return (
        <div
            className={twMerge(
                'w-full bg-studio-card-gray-dark shadow-shadow-dropdown rounded-2xl ',
                isSlide ? 'bg-white text-black !shadow-[0px_5px_15px_rgba(0,0,0,0.35)]' : '',
            )}
        >
            <div
                onClick={() => navigate(`/studio/${convertSlugURL(studio.name)}/${studio.id}`)}
                className={twMerge(
                    'p-3 flex flex-col w-full gap-y-2 font-medium text-sm cursor-pointer',
                    isSlide && 'p-0 relative',
                )}
            >
                {isSlide && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickCloseIcon && onClickCloseIcon(e);
                        }}
                        className="bg-white absolute top-3 left-3 z-10 h-6 w-6 flex items-center justify-center rounded-[50%]"
                    >
                        <CloseIcon styles={{ fill: 'black', width: '16px', height: '16px' }} />
                    </button>
                )}
                <ImageCarousel
                    isSlide={isSlide}
                    listSrc={listImage?.map((item) => item.url) || []}
                    {...(isSlide && { className: 'rounded-b-none' })}
                />
                <div className={twMerge('flex flex-col gap-y-2 w-full max-w-full', isSlide && 'p-3 pt-0')}>
                    <div className="flex items-center justify-between font-semibold text-[15px] w-full max-w-full'">
                        <p className="name-studio max-w-[65%]">{studio.name}</p>
                        <div className="flex items-center">
                            <StarIcon />
                            <p className="ml-1 font-medium text-sm">
                                {studio.rating ? studio.rating.toFixed(2) : 0 + ' (0)'}
                            </p>
                        </div>
                    </div>
                    <p className="line-clamp-2">{studio.introduction || 'test nhé'}</p>
                    <div className="flex items-center">
                        <MapPinIcon styles={{ minWidth: '20px', minHeight: '20px', stroke: '#B0B3B8' }} />
                        <p className="ml-2 line-clamp-1">{studio.address || 'Việt Nam'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
