import { CalendarIcon, FacebookIcon, InstagramIcon, MapPinIcon, PhoneCallIcon, WebsiteIcon } from '@/assets/icons';
// import CategoryOfStudio from '@/components/CategoryOfStudio';
import Button from '@/components/common/Button';
import { ImageSlider } from '@/components/common/Image';
import { IStudio } from '@/features/studios';
import { convertSlugURL, convertWorkingTimeToDisplayFormat } from '@/lib/helper';
import { Rating } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import { useModalStore } from '@/store/componentStore';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';
import webLink from '@/assets/img/web-link.png';
import ListItemOfStudio from '@/components/ListItemOfStudio';

export default function StudioIntroCard({
    studio,
    callButton, // maxLineIntro,
}: {
    studio: Partial<IStudio>;
    callButton?: boolean;
    // maxLineIntro?: number;
}) {
    const navigator = useNavigate();
    const { setBookingModal } = useModalStore();
    const { isAuth } = useAuthStore();

    return (
        <div className="w-full p-3 bg-gray-dark flex gap-x-6 gap-y-4 rounded-[20px] shadow-shadow-dropdown relative flex-col sm:flex-row sm:px-6 sm:py-4">
            <div className="flex gap-y-3 flex-col sm:min-w-[300px] sm:max-w-[300px] justify-end">
                <ImageSlider
                    className="cursor-pointer rounded-xl"
                    onClick={() => navigator(`/studio/${convertSlugURL(studio.name!)}/${studio.id}`)}
                    src={studio.logo?.includes('http') ? studio.logo : StudioCardImage}
                    alt=""
                />
                <div className="flex flex-row gap-x-3  gap-y-3 sm:flex-col">
                    <Button
                        onClick={() => {
                            if (!isAuth) {
                                toast.info('Vui lòng đăng nhập trước để đặt lịch');
                            } else {
                                if (!studio) {
                                    toast.info('Vui lòng chọn studio trước');
                                } else {
                                    setBookingModal({
                                        studioId: studio.id as string,
                                        appointmentReschedule: null,
                                        visible: true,
                                        service: null,
                                    });
                                }
                            }
                        }}
                        className="py-[10px] flex-1"
                    >
                        <CalendarIcon />
                        <p className="text-sm sm:text-base">Đặt lịch xăm</p>
                    </Button>
                    {callButton && (
                        <Button className="py-[10px] bg-white text-black flex-1">
                            <PhoneCallIcon />
                            <p className="sm:text-base block">Gọi điện tư vấn</p>
                        </Button>
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2 sm:max-w-[calc(100%-324px)]">
                <div className="flex flex-col gap-y-2  mt-auto w-full font-medium text-white text-sm sm:w-[calc(100%-146px)] sm:gap-y-3">
                    <div className="w-full flex justify-between">
                        <Link
                            to={`/studio/${convertSlugURL(studio.name!)}/${studio.id}`}
                            className="text-base font-semibold sm:font-bold sm:text-xl max-w-fit"
                        >
                            {studio.name}
                        </Link>
                        <div className="flex gap-x-2 items-center sm:hidden">
                            <a href={studio.facebook} target="_blank" rel="noreferrer">
                                <FacebookIcon styles={{ width: 20, minWidth: 20, height: 20 }} />
                            </a>
                            <a href={studio.instagram} target="_blank" rel="noreferrer">
                                <InstagramIcon styles={{ width: 20, minWidth: 20, height: 20 }} />
                            </a>
                            <a href={studio.website} target="_blank" rel="noreferrer">
                                <WebsiteIcon styles={{ width: 20, minWidth: 20, height: 20 }} />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="truncate sm:max-w-full">{studio.slogan}</p>
                        <Rating
                            className="flex sm:hidden"
                            defaultValue={Number((Math.random() * 5).toFixed(2))}
                            fractions={3}
                            size="xs"
                            readOnly
                        />
                    </div>

                    <div className="flex items-center">
                        <MapPinIcon styles={{ height: '16px', width: '16px', minWidth: '16px' }} />
                        <p className="ml-2 max-w-full truncate sm:max-w-full">{studio.address}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 text-sm font-medium">
                    {!studio.listCategory && <p className={'line-clamp-3'}>{studio.introduction}</p>}

                    {studio.workingTimes && studio.workingTimes.length > 0 ? (
                        <ListItemOfStudio
                            listItem={convertWorkingTimeToDisplayFormat(studio.workingTimes)}
                            name="Khung giờ hoạt động"
                        />
                    ) : (
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base sm:text-lg font-semibold">Khung giờ hoạt động</h1>
                            <p className="text-sm font-medium italic">Studio chưa có khung giờ hoạt động</p>
                        </div>
                    )}
                    {studio.listService ? (
                        studio.listService.length > 0 ? (
                            <ListItemOfStudio
                                listItem={studio.listService.map((service) => service.name)}
                                name="Các dịch vụ"
                            />
                        ) : (
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-base sm:text-lg font-semibold">Các dịch vụ</h1>
                                <p className="text-sm font-medium italic">Studio chưa có dịch vụ</p>
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="absolute right-6 font-medium hidden sm:block">
                <div className="flex flex-col gap-y-3 items-end">
                    <Rating defaultValue={studio.rating} fractions={3} size="sm" readOnly />
                    <p className="text-sm">5.0/5.0 Đánh giá KH</p>
                    <div className="flex gap-x-3">
                        <a href={studio.facebook} target="_blank" rel="noreferrer">
                            <FacebookIcon />
                        </a>
                        <a href={studio.instagram} target="_blank" rel="noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 152 152"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <linearGradient
                                        id="a"
                                        x1="22.26"
                                        x2="129.74"
                                        y1="22.26"
                                        y2="129.74"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0" stopColor="#fae100"></stop>
                                        <stop offset=".15" stopColor="#fcb720"></stop>
                                        <stop offset=".3" stopColor="#ff7950"></stop>
                                        <stop offset=".5" stopColor="#ff1c74"></stop>
                                        <stop offset="1" stopColor="#6c1cd1"></stop>
                                    </linearGradient>
                                    <g data-name="Layer 2">
                                        <g data-name="03.Instagram">
                                            <rect
                                                width="152"
                                                height="152"
                                                fill="url(#a)"
                                                rx="76"
                                                opacity="1"
                                                data-original="url(#a)"
                                            ></rect>
                                            <g fill="#fff">
                                                <path
                                                    d="M133.2 26c-11.08 20.34-26.75 41.32-46.33 60.9S46.31 122.12 26 133.2q-1.91-1.66-3.71-3.46A76 76 0 1 1 129.74 22.26q1.8 1.8 3.46 3.74z"
                                                    opacity="1"
                                                    fill="#ffffff10"
                                                    data-original="#ffffff10"
                                                ></path>
                                                <path
                                                    d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#ffffff"
                                                ></path>
                                                <path
                                                    d="m90.59 61.56-.19-.19-.16-.16A20.16 20.16 0 0 0 76 55.33 20.52 20.52 0 0 0 55.62 76a20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zM76 89.56A13.56 13.56 0 1 1 89.37 76 13.46 13.46 0 0 1 76 89.56zM102.43 54.38a4.88 4.88 0 0 1-4.85 4.92 4.81 4.81 0 0 1-3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z"
                                                    fill="#ffffff"
                                                    opacity="1"
                                                    data-original="#ffffff"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                        <a href={studio.website} target="_blank" rel="noreferrer">
                            <img src={webLink}></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
