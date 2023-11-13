import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useFilterFormStore, useSearchLocationStore } from '@/store/componentStore';
import CategoryList from '@/components/CategoryList';
import Loading from '@/components/Loading';
import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';
const GoogleMap = lazy(() => import('../components/GoogleMap'));
const StudioListLocation = lazy(() => import('@/features/studios/components/StudioListLocation'));

export default function SearchLocation() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const { placeChoose, setPlaceChoose } = useSearchLocationStore();
    const { setFilterData, filterData, isQuery } = useFilterFormStore();
    const [openMap, setOpenMap] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            searchParams.get('location') === '' ||
            searchParams.get('placeId') === '' ||
            searchParams.get('location') === null ||
            searchParams.get('placeId') === null
        ) {
            navigate('/');
        } else if (placeChoose === null) {
            setPlaceChoose({ place_id: searchParams.get('placeId')!, description: searchParams.get('location')! });
        }
        if (searchParams.get('category')) {
            setFilterData({ ...filterData, category: searchParams.get('category')! });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('location'), searchParams.get('placeId'), searchParams.get('category')]);

    return (
        <>
            <div className="list-category h-20 flex items-center w-full sticky top-20 z-[998] bg-gray-dark category-list-wrapper ">
                <div className="w-full px-4">
                    <CategoryList
                        isLoading={isQuery}
                        initChooose={searchParams.get('category') || ''}
                        onClickAll={() => {
                            navigate(
                                `/search-location?location=${searchParams.get('location')}&placeId=${searchParams.get(
                                    'placeId',
                                )}&page=${searchParams.get('page') || 0}`,
                            );
                        }}
                        onClickCategory={(category) => {
                            navigate(
                                `/search-location?location=${searchParams.get('location')}&placeId=${searchParams.get(
                                    'placeId',
                                )}&category=${category.id}&page=${searchParams.get('page') || 0}`,
                            );
                        }}
                    />
                </div>
            </div>
            <div id="content" className="content-wrapper min-h-[calc(100vh-158px)] relative">
                <div className="flex relative">
                    <div
                        className={twMerge(
                            'p-4 w-full lgmax:w-[55%] lgmax:block xl:w-[63%] relative z-10',
                            openMap ? 'hidden' : 'block',
                        )}
                    >
                        <Suspense fallback={<Loading />}>
                            <StudioListLocation />
                        </Suspense>
                    </div>
                    <div className={twMerge('flex-1 w-full absolute lgmax:static lgmax:w-auto', openMap ? 'z-30' : '')}>
                        <Suspense fallback={<Loading />}>
                            <GoogleMap visible={openMap} />
                        </Suspense>
                    </div>
                </div>
                <div className="fixed z-[1000] top-[calc(100vh-60px)] left-1/2 -translate-x-1/2 lgmax:hidden w-fit">
                    <Button
                        onTap={() => setOpenMap(!openMap)}
                        isAnimate={true}
                        whileTap={{ scale: 0.8 }}
                        className="bg-black text-white border-4 border-solid border-stroke-gray"
                    >
                        <p className="text-sm font-semibold truncate">
                            {openMap ? 'Mở danh sách studio' : 'Mở bản đồ'}
                        </p>
                    </Button>
                </div>
            </div>
        </>
    );
}
