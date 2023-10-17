import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useFilterFormStore, useSearchLocationStore } from '@/store/componentStore';
import CategoryList from '@/components/CategoryList';
const GoogleMap = lazy(() => import('../components/GoogleMap'));
const StudioListLocation = lazy(() => import('@/features/studios/components/StudioListLocation'));

export default function SearchLocation() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const { placeChoose, setPlaceChoose } = useSearchLocationStore();
    const { setFilterData, filterData } = useFilterFormStore();
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
                        initChooose={searchParams.get('category') || ''}
                        onClickAll={() => {
                            navigate(
                                `/search-location?location=${searchParams.get('location')}&placeId=${searchParams.get(
                                    'placeId',
                                )}`,
                            );
                        }}
                        onClickCategory={(category) => {
                            navigate(
                                `/search-location?location=${searchParams.get('location')}&placeId=${searchParams.get(
                                    'placeId',
                                )}&category=${category.id}`,
                            );
                        }}
                    />
                </div>
            </div>
            <div id="content" className="content-wrapper min-h-[calc(100vh+180px)]">
                <div className="flex relative">
                    <div className="p-4 w-[63%]">
                        <Suspense fallback={<div>Loading...</div>}>
                            <StudioListLocation />
                        </Suspense>
                    </div>
                    <div className="w-[37%]">
                        <Suspense fallback={<div>Loading...</div>}>
                            <GoogleMap />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
}
