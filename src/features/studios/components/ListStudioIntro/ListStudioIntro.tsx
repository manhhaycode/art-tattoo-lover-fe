import StudioIntroCard from './StudioIntroCard';
import { IStudio } from '@/features/studios';

export default function ListStudioIntro({ listStudio }: { listStudio: IStudio[] }) {
    return (
        <>
            {listStudio.map((studio) => {
                return (
                    <StudioIntroCard
                        // maxLineIntro={3}
                        callButton={true}
                        key={studio.id}
                        studio={studio}
                    />
                );
            })}
        </>
    );
}
