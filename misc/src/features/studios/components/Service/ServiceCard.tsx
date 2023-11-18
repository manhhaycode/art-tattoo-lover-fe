import { IService } from '@/features/services';
import { ImageSlider } from '@/components/common/Image';
import { IconCategory } from '@tabler/icons-react';
import { convertTimeToDisplayFormat, numbertoPrice } from '@/lib/helper';
import Button from '@/components/common/Button';
import { CalendarIcon, PhoneCallIcon } from '@/assets/icons';
import toast from 'react-hot-toast';
import { useModalStore } from '@/store/componentStore';
import { useAuthStore } from '@/store/authStore';
import { Badge } from '@mantine/core';
export default function ServiceCard({ service, studioId }: { service: IService; studioId: string }) {
    const { isAuth } = useAuthStore();
    const { setBookingModal } = useModalStore();
    return (
        <div className="border solid border-stroke-gray bg-gray-dark rounded-xl">
            <div className="flex flex-col items-center">
                <div className="w-full">
                    {service.thumbnail ? (
                        <ImageSlider className="rounded-lg rounded-b-none" src={service.thumbnail} />
                    ) : (
                        <IconCategory size={'100%'} />
                    )}
                </div>
                <div className="flex flex-row w-full gap-y-3 p-4 gap-x-4">
                    <Button
                        onClick={() => {
                            if (!isAuth) {
                                toast.error('Vui lòng đăng nhập trước để đặt lịch');
                            } else {
                                setBookingModal({
                                    studioId,
                                    appointmentReschedule: null,
                                    service,
                                    visible: true,
                                });
                            }
                        }}
                        className="py-[10px] flex-1"
                    >
                        <CalendarIcon />
                        <p className="text-sm sm:text-base">Đặt lịch xăm</p>
                    </Button>
                    <Button className="py-[10px] bg-white text-black flex-1">
                        <PhoneCallIcon />
                        <p className="sm:text-base block">Tư vấn</p>
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 w-full p-4 pt-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Dịch vụ: {service.name}</p>
                        {service.discount > 0 && (
                            <Badge size="lg" color="green.2">
                                Giảm: {service.discount}%
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm font-semibold">
                        Giá: {numbertoPrice(service.minPrice)} - {numbertoPrice(service.maxPrice)}
                    </p>
                    <p className="text-sm font-semibold">
                        Thời gian dự kiến: {convertTimeToDisplayFormat(service.expectDuration)}
                    </p>
                    <p className="text-sm font-medium">{service.description}</p>
                </div>
            </div>
        </div>
    );
}
