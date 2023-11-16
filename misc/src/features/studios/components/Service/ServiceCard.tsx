import { IService } from '@/features/services';
import { ImageSlider } from '@/components/common/Image';
import { IconCategory } from '@tabler/icons-react';
import { convertTimeToDisplayFormat, numbertoPrice } from '@/lib/helper';
import Button from '@/components/common/Button';
import { CalendarIcon, PhoneCallIcon } from '@/assets/icons';
import toast from 'react-hot-toast';
import { useModalStore } from '@/store/componentStore';
import { useAuthStore } from '@/store/authStore';
export default function ServiceCard({ service, studioId }: { service: IService; studioId: string }) {
    const { isAuth } = useAuthStore();
    const { setBookingModal } = useModalStore();
    return (
        <div className="border solid border-stroke-gray bg-gray-dark p-4 rounded-xl">
            <div className="flex flex-col gap-4 lgmax:flex-row items-center">
                <div className="w-full sm:min-w-[200px]">
                    {service.thumbnail ? (
                        <ImageSlider className="rounded-lg" src={service.thumbnail} />
                    ) : (
                        <IconCategory size={'100%'} />
                    )}
                </div>
                <div className="flex flex-row w-full gap-y-3 gap-x-4 sm:hidden">
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
                <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-sm font-semibold">Dịch vụ: {service.name}</p>
                    <p className="text-sm font-semibold">
                        Giá: {numbertoPrice(service.minPrice)} - {numbertoPrice(service.maxPrice)}
                    </p>
                    <p className="text-sm font-semibold">
                        Thời gian dự kiến: {convertTimeToDisplayFormat(service.expectDuration)}
                    </p>
                    <div className="hidden flex-col xl:flex-row gap-3 sm:flex">
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
                </div>
            </div>
            <p className="text-sm font-medium mt-4">{service.description}</p>
        </div>
    );
}
