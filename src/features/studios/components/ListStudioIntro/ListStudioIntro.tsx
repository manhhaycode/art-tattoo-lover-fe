import { useFilterFormStore } from '@/store/componentStore';
import StudioIntroCard from './StudioIntroCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from '@/lib/helper';
import { IStudio } from '@/features/studios';

export default function ListStudioIntro({ listStudio }: { listStudio: IStudio[] }) {
    const { filterData } = useFilterFormStore();
    const navigator = useNavigate();
    useEffect(() => {
        if (filterData) {
            console.log(filterData);

            navigator('/search-studio?' + createSearchParams(filterData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterData]);
    return (
        <>
            {listStudio.length > 0 &&
                [...Array(24)].map((_item, index) => {
                    return (
                        <StudioIntroCard
                            // maxLineIntro={3}
                            callButton={true}
                            key={index}
                            studio={listStudio.find((item) => item.name === 'SaiGon Tattoo Club') as IStudio}
                        />
                    );
                })}
        </>
    );
}
