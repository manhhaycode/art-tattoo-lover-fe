import { useFilterFormStore } from '@/store/componentStore';
import StudioIntroCard from './StudioIntroCard';
import { useEffect } from 'react';

export default function ListStudioIntro() {
    const { isQuery, setIsQuery, filterData } = useFilterFormStore();

    useEffect(() => {
        if (isQuery) {
            console.log(filterData);
            setIsQuery(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuery, filterData]);
    return (
        <>
            {[...Array(24)].map((_item, index) => {
                return (
                    <StudioIntroCard
                        key={index}
                        studio={{
                            name: 'SaiGon Tattoo Club',
                            slogan: 'Your body part, Tattoo draws in part',
                            address: 'Phường 12, Q. Phú Nhuận, TPHCM',
                            introduction:
                                'SaiGon Tatto Club là một địa điểm xăm hình nghệ thuật cho các bạn trẻ có sở thích xăm mình ở thành phố Hồ Chí Minh. Địa chỉ của câu lạc bộ ở 10 Hai Bà Chưng , Hiệp Phú, Quận 9,Tp. Hồ Chí Minh.Tiêu chí của câu lạc bộ là gắn kết những người có chung sở thích xăm hình với nhau ',
                            logo: 'https://i.ibb.co/FXspSZb/img-Logo-Studio.png',
                            facebook: 'https://www.facebook.com/saigontattooclub',
                            instagram: 'https://www.instagram.com/saigontattooclub/',
                            website: 'https://saigontattooclub.com/',
                        }}
                    />
                );
            })}
        </>
    );
}
