import StudioCardInfo from '@/components/StudioCardInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useSearchLocationStore } from '@/store/componentStore';

const GoogleMap = lazy(() => import('@/components/GoogleMap'));

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
            <div className="list-category h-20 w-full sticky top-20 z-[1001] bg-gray-dark"></div>
            <div id="content" className="content-wrapper">
                <div className="flex relative">
                    <div className="p-6 w-[63%]">
                        <div className="grid grid-cols-3 item-center gap-y-6 gap-x-6 ">
                            {[...Array(24)].map((_item, index) => {
                                return (
                                    <StudioCardInfo
                                        key={index}
                                        studioInfo={{
                                            description:
                                                'Studio Tattoo nhận được tài trợ từ các hãng lớn của Đức và Mỹ',
                                            address: 'Phường 12, Q. Phú Nhuận, TPHCM',
                                            img: [''],
                                            name: 'SaiGon Tattoo Club',
                                            rating: 4.87,
                                            voteCount: 326,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GoogleMap />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
