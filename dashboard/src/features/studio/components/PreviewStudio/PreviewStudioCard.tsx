import { CalendarIcon, FacebookIcon, InstagramIcon, MapPinIcon, PhoneCallIcon, WebsiteIcon } from '@/assets/icons';
// import CategoryOfStudio from '@/components/CategoryOfStudio';
import Button from '@/components/common/Button';
import { ImageSlider } from '@/components/common/Image';
import { IStudio } from '@/features/studio';
import { convertSlugURL } from '@/lib/helper';
import { Rating } from '@mantine/core';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import ListServiceOfStudio from '@/components/ListServiceOfStudio';
import { db } from '@/assets/data';

export default function PreviewStudioCard({
    studio,
    callButton, // maxLineIntro,
}: {
    studio: Partial<IStudio>;
    callButton?: boolean;
    // maxLineIntro?: number;
}) {
    return (
        <div className="w-full px-6 py-4 bg-gray-dark flex gap-x-6 rounded-[20px] shadow-shadow-dropdown relative">
            <div className="flex flex-col gap-y-3 w-1/3 max-w-[300px]">
                <ImageSlider
                    className="cursor-pointer rounded-xl"
                    onClick={() =>
                        window.open(
                            `https://art-tattoo-lover.vercel.app/studio/${convertSlugURL(studio.name!)}/${studio.id}`,
                            '_blank',
                        )
                    }
                    src={studio.logo?.includes('http') ? studio.logo : StudioCardImage}
                    alt=""
                />
                <Button
                    onClick={() =>
                        window.open(
                            `https://art-tattoo-lover.vercel.app/studio/${convertSlugURL(studio.name!)}/${studio.id}`,
                            '_blank',
                        )
                    }
                    className="py-[10px] text-white"
                >
                    <CalendarIcon />
                    <p>Đặt lịch xăm ngay</p>
                </Button>
                {callButton && (
                    <Button
                        onClick={() =>
                            window.open(
                                `https://art-tattoo-lover.vercel.app/studio/${convertSlugURL(studio.name!)}/${
                                    studio.id
                                }`,
                                '_blank',
                            )
                        }
                        className="py-[10px] bg-white text-black"
                    >
                        <PhoneCallIcon />
                        <p>Gọi điện tư vấn</p>
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-y-3 mt-auto w-2/3 h-full justify-end font-medium text-white text-sm">
                <a
                    target="_blank"
                    href={`https://art-tattoo-lover.vercel.app/studio/${convertSlugURL(studio.name!)}/${studio.id}`}
                    className="font-bold text-xl"
                >
                    {studio.name}
                </a>
                <p>{studio.slogan}</p>
                <div className="flex items-center">
                    <MapPinIcon styles={{ height: '16px', width: '16px' }} />
                    <p className="ml-2 max-w-[calc(100%-160px)] truncate">{studio.address}</p>
                </div>
                {!studio.listCategory && <p className={'line-clamp-3'}>{studio.introduction}</p>}
                {studio.workingTimes && <ListServiceOfStudio listWorkingTime={studio.workingTimes} />}
                {studio.listCategory && <ListServiceOfStudio listCategory={db.servicesTattoo} />}
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
