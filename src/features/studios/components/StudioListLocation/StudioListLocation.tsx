import { FilterIcon } from '@/assets/icons';
import Button from '@/components/common/Button';
import { convertAdressComponents } from '@/lib/helper/googleMapHelper';
import { useGoogleMapStore } from '@/store/componentStore';
import { Suspense, lazy } from 'react';

const StudioCardInfo = lazy(() => import('./StudioCardInfo'));

export default function StudioListLocation() {
    const { placeDetail } = useGoogleMapStore();
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
                    {[...Array(24)].map((_item, index) => {
                        return (
                            <StudioCardInfo
                                key={index}
                                studioInfo={{
                                    description: 'Studio Tattoo nhận được tài trợ từ các hãng lớn của Đức và Mỹ',
                                    address: 'Phường 12, Q. Phú Nhuận, TPHCM',
                                    img: [''],
                                    name: 'SaiGon Tattoo Club',
                                    rating: 4.87,
                                    voteCount: 326,
                                }}
                            />
                        );
                    })}
                </Suspense>
            </div>
        </>
    );
}
