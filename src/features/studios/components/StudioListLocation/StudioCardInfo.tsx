import { MapPinIcon, StarIcon } from '@/assets/icons';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import StudioCardImage2 from '@/assets/img/tattoo2.jpg';
import ImageCarousel from '@/components/ImageCarousel';
import { IStudio } from '@/features/studios';
import { convertSlugURL } from '@/lib/helper';
import { useNavigate } from 'react-router-dom';

export default function StudioCardInfo({ studio }: { studio: IStudio }) {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-studio-card-gray-dark shadow-shadow-dropdown rounded-2xl">
            <div
                onClick={() => navigate(`/studio/${convertSlugURL(studio.name)}/${studio.id}`)}
                className="p-3 flex flex-col w-full gap-y-2 font-medium text-sm cursor-pointer"
            >
                <ImageCarousel
                    listSrc={[
                        StudioCardImage,
                        StudioCardImage2,
                        StudioCardImage,
                        StudioCardImage2,
                        StudioCardImage,
                        StudioCardImage2,
                    ]}
                />
                <div className="flex items-center justify-between font-semibold text-[15px]">
                    <p className="name-studio truncate max-w-[65%]">{studio.name}</p>
                    <div className="flex items-center">
                        <StarIcon />
                        <p className="ml-1 font-medium text-sm">
                            {(Math.random() * 5).toFixed(2) + ' (' + Math.round(Math.random() * 999) + ')'}
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
    );
}
