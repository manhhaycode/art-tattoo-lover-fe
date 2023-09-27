import { MapPinIcon, StarIcon } from '@/assets/icons';
import Image from '../common/Image';
import StudioCardImage from '@/assets/img/studio-card.jpg';

export interface StudioCardInfoProps {
    studioInfo: {
        name: string;
        rating: number;
        voteCount: number;
        description: string;
        address: string;
        img: string[];
    };
}

export default function StudioCardInfo({ studioInfo }: StudioCardInfoProps) {
    return (
        <div className="w-full bg-studio-card-gray-dark shadow-shadow-dropdown rounded-2xl">
            <div className="p-4 flex flex-col w-full gap-y-2 font-medium text-sm">
                <Image src={StudioCardImage} alt="" />
                <div className="flex items-center font-semibold text-[15px]">
                    <p className="name-studio">SaiGon Tattoo Club</p>
                    <div className="flex items-center ml-3">
                        <StarIcon />
                        <p className="ml-1 font-medium text-sm">
                            {studioInfo.rating + ' (' + studioInfo.voteCount + ')'}
                        </p>
                    </div>
                </div>
                <p>{studioInfo.description}</p>
                <div className="flex items-center">
                    <MapPinIcon styles={{ width: '20px', height: '20px', stroke: '#B0B3B8' }} />
                    <p className="ml-2">{studioInfo.address}</p>
                </div>
            </div>
        </div>
    );
}
