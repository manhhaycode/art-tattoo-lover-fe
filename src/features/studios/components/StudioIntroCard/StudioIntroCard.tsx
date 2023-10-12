import Image from '@/components/common/Image';
import { IStudio } from '@/features/studios';

export default function StudioIntroCard({ studio }: { studio: Partial<IStudio> }) {
    const firstImage = studio.medias?.find((media) => media.type === 'image');
    return (
        <div className="w-full px-6 py-4 bg-gray-dark flex items-start">
            <div className="flex gap-y-[14px]">
                <Image src={firstImage?.url} alt="" />
            </div>
        </div>
    );
}
