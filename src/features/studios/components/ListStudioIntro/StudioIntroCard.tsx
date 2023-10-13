import { CalendarIcon, FacebookIcon, InstagramIcon, MapPinIcon, PhoneCallIcon, WebsiteIcon } from '@/assets/icons';
// import CategoryOfStudio from '@/components/CategoryOfStudio';
import Button from '@/components/common/Button';
import { ImageSlider } from '@/components/common/Image';
import { IStudio } from '@/features/studios';
import { Rating } from '@mantine/core';

export default function StudioIntroCard({ studio, callButton }: { studio: Partial<IStudio>; callButton?: boolean }) {
    return (
        <div className="w-full px-6 py-4 bg-gray-dark flex items-start gap-x-6 rounded-[20px] shadow-shadow-dropdown relative">
            <div className="flex flex-col gap-y-3 w-1/3">
                <ImageSlider src={studio.logo} alt="" />
                <Button className="py-[10px]">
                    <CalendarIcon />
                    <p>Đặt lịch xăm ngay</p>
                </Button>
                {callButton && (
                    <Button className="py-[10px] bg-white text-black">
                        <PhoneCallIcon />
                        <p>Gọi điện tư vấn</p>
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-y-3 w-2/3 h-full justify-center font-medium text-white text-sm">
                <h1 className="font-bold text-xl">{studio.name}</h1>
                <p>{studio.slogan}</p>
                <div className="flex items-center">
                    <MapPinIcon styles={{ height: '16px', width: '16px' }} />
                    <p className="ml-2">{studio.address}</p>
                </div>
                <p className="line-clamp-4">{studio.introduction}</p>
                {/* {studio.listCategory && <CategoryOfStudio listCategory={studio.listCategory} />} */}
            </div>
            <div className="absolute right-6 font-medium">
                <div className="flex flex-col gap-y-3 items-end">
                    <Rating defaultValue={Number((Math.random() * 5).toFixed(2))} fractions={3} size="sm" readOnly />
                    <p className="text-sm">5.0/5.0 Đánh giá KH</p>
                    <div className="flex gap-x-3">
                        <a href={studio.facebook} target="_blank" rel="noreferrer">
                            <FacebookIcon />
                        </a>
                        <a href={studio.instagram} target="_blank" rel="noreferrer">
                            <InstagramIcon />
                        </a>
                        <a href={studio.website} target="_blank" rel="noreferrer">
                            <WebsiteIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
