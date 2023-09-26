import GoogleMap from '@/components/GoogleMap';
import StudioCardInfo from '@/components/StudioCardInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function SearchLocation() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get('location') === '' || searchParams.get('placeId') === '') {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="list-category h-20 w-full sticky top-20 z-[1] bg-gray-dark"></div>
            <div id="content" className="content-wrapper h-full">
                <div className="flex relative h-full">
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
                    <GoogleMap />
                </div>
            </div>
        </>
    );
}
