import { useFilterFormStore } from '@/store/componentStore';
import StudioIntroCard from './StudioIntroCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from '@/lib/helper';
import { IStudio } from '@/features/studios';

export default function ListStudioIntro({ listStudio }: { listStudio: IStudio[] }) {
    const { isQuery, setIsQuery, filterData } = useFilterFormStore();
    const navigator = useNavigate();
    useEffect(() => {
        if (isQuery && filterData) {
            console.log(filterData);
            setIsQuery(false);
            navigator('/search-studio?' + createSearchParams(filterData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuery, filterData]);
    return (
        <>
            {listStudio.length > 0 &&
                [...Array(24)].map((_item, index) => {
                    return (
                        <StudioIntroCard
                            key={index}
                            studio={listStudio.find((item) => item.name === 'SaiGon Tattoo Club') as IStudio}
                        />
                    );
                })}
        </>
    );
}
