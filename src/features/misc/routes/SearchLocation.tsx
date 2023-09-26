import GoogleMap from '@/components/GoogleMap';
import StudioCardInfo from '@/components/StudioCardInfo';
// import { useLocation } from 'react-router-dom';

export default function SearchLocation() {
    // const { search } = useLocation();
    // const searchParams = new URLSearchParams(search);
    return (
        <>
            <div className="list-category h-20 w-full sticky top-20 z-[1] bg-gray-dark"></div>
            <div id="content" className="content-wrapper h-full">
                <div className="flex relative h-full">
                    <div className="p-6 w-[63%]">
                        <div className="grid grid-cols-3 item-center gap-y-6 gap-x-6 ">
                            {[...Array(24)].map((item, index) => {
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
