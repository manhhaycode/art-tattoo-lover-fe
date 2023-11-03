import { FilterIcon } from '@/assets/icons';
import Button from '@/components/common/Button';
import { convertAdressComponents } from '@/lib/helper/googleMapHelper';
import { useFilterFormStore, useGoogleMapStore } from '@/store/componentStore';
import { Suspense, lazy, useEffect } from 'react';
import { useGetListStudio } from '@/features/studios';
import { Group, Pagination } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';

const StudioCardInfo = lazy(() => import('./StudioCardInfo'));

export default function StudioListLocation() {
    const { placeDetail } = useGoogleMapStore();
    const search = useSearchParams();
    const navigate = useNavigate();
    const { filterData, setIsQuery, setListStudio, reset } = useFilterFormStore();
    const { data, isFetching } = useGetListStudio(
        filterData?.viewPortNE && filterData?.viewPortSW
            ? {
                  ...filterData,
                  page: (search[0].get('page') && Number(search[0].get('page')) - 1) || 0,
                  pageSize: 15,
              }
            : {},
    );

    useEffect(() => {
        setIsQuery(isFetching);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    useEffect(() => {
        return () => reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data) setListStudio(data.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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
            {data && (
                <Group position="left">
                    <Pagination
                        className="ml-auto mt-5"
                        value={data.page + 1}
                        onChange={(value) => {
                            if (value === data.page + 1) return;
                            window.scrollTo(0, 0);
                            const entries = search[0].entries();
                            const searchParams = new URLSearchParams();
                            for (const [key, value] of entries) {
                                searchParams.append(key, value);
                            }

                            searchParams.set('page', String(value));
                            navigate(`/search-location?${searchParams.toString()}`);
                        }}
                        size={'md'}
                        total={(data.total && Math.ceil(data?.total / data.pageSize)) || 0}
                    ></Pagination>
                </Group>
            )}
        </>
    );
}
