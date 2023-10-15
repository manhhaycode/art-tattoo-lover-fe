import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useSearchLocationStore } from '@/store/componentStore';
import CategoryList from '@/components/CategoryList';
const GoogleMap = lazy(() => import('../components/GoogleMap'));
const StudioListLocation = lazy(() => import('@/features/studios/components/StudioListLocation'));

export default function SearchLocation() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const { placeChoose, setPlaceChoose } = useSearchLocationStore();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="list-category h-20 flex items-center w-full sticky top-20 z-[998] bg-gray-dark category-list-wrapper ">
                <div className="w-full px-4">
                    <CategoryList />
                </div>
            </div>
            <div id="content" className="content-wrapper">
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
