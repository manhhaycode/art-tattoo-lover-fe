import { FilterIcon } from '@/assets/icons';
import Button from '@/components/common/Button';
import { convertAdressComponents } from '@/lib/helper/googleMapHelper';
import { useFilterFormStore, useGoogleMapStore } from '@/store/componentStore';
import { Suspense, lazy, useEffect } from 'react';
import { useGetListStudio } from '@/features/studios';

const StudioCardInfo = lazy(() => import('./StudioCardInfo'));

export default function StudioListLocation() {
    const { placeDetail } = useGoogleMapStore();
    const { filterData, setIsQuery, reset } = useFilterFormStore();
    const { data, isLoading } = useGetListStudio(
        filterData
            ? {
                  ...filterData,
                  page: 0,
                  pageSize: 10,
              }
            : {},
    );

    useEffect(() => {
        setIsQuery(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        return () => reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex items-center w-full mb-4">
                {placeDetail?.address_components && (
                    <h1 className="font-medium text-base">
                        Hơn 100 địa điểm tại {convertAdressComponents(placeDetail.address_components)}
                    </h1>
                )}
                <Button className="ml-auto !p-3 !bg-white text-black font-medium h-fit self-center">
                    <FilterIcon styles={{ stroke: 'black' }} />
                    Bộ lọc
                </Button>
            </div>

            <div className="grid grid-cols-3 item-center gap-y-5 gap-x-5 ">
                <Suspense fallback={<div></div>}>
                    {data && data.data.map((studio) => <StudioCardInfo key={studio.id} studio={studio} />)}
                </Suspense>
            </div>
        </>
    );
}
