import { IStudio } from '@/features/studios';
import { AppointmentStatusString, AppointmentType } from '../../types/appointment';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import Button from '@/components/common/Button';
import { formatStringTime } from '@/lib/helper/dateHelper';

import { IconCalendar, IconCalendarPin, IconCalendarRepeat, IconCalendarX } from '@tabler/icons-react';
import AppointmentStatusTag from './AppointmentStatus';
import { useMutation } from '@tanstack/react-query';
import { cancelAppointment } from '../../api/appointmentAPI';
import { toast } from 'react-toastify';
import { useModalStore } from '@/store/componentStore';

interface Props {
    appointment: AppointmentType;
    studio: IStudio;
    refetch: () => void;
}
const AppointmentCard = ({ appointment, studio, refetch }: Props) => {
    const { setBookingModal } = useModalStore();

    const { mutate: cancelMutate } = useMutation({
        mutationKey: ['cancelAppointment', appointment.id],
        mutationFn: async () => {
            return cancelAppointment(appointment.id);
        },
        onMutate: () => {
            toast.loading('Đang hủy lịch...');
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success('Hủy lịch thành công');
            refetch();
        },
        onError: () => {
            toast.dismiss();
            toast.error('Hủy lịch thất bại');
        },
    });

    return (
        <div className="px-6 py-4 rounded-xl bg-gray-dark shadow-shadow-dropdown relative">
            <div className="flex w-full gap-2">
                <img
                    className="cursor-pointer rounded-xl w-40 aspect-video"
                    src={studio.logo?.includes('http') ? studio.logo : StudioCardImage}
                    alt=""
                />

                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">{studio.name}</h4>
                    <div className="flex items-start gap-1">
                        <div className="w-5">
                            <IconCalendarPin size={16} className="text-white w-5 mt-1" />
                        </div>
                        <p className="text-sm">{studio.address}</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <IconCalendar size={16} className="text-white w-5" />
                        <h6 className="text-sm">{formatStringTime(appointment.shift.start)}</h6>
                    </div>
                </div>
            </div>

            <div className="absolute top-3 right-3">
                <AppointmentStatusTag status={appointment.status} />
            </div>

            <div className="flex gap-4 mt-4">
                <Button
                    className="w-full h-fit py-3 hover:opacity-80"
                    typeStyle="secondary"
                    onClick={() => {
                        if (appointment.status.toString() !== AppointmentStatusString.CANCELED) {
                            cancelMutate();
                        }
                    }}
                    disabled={appointment.status.toString() === AppointmentStatusString.CANCELED}
                >
                    <IconCalendarX size={18} className="text-white" />
                    <span>Hủy lịch</span>
                </Button>
                <Button
                    className="w-full h-fit py-3 hover:opacity-90"
                    onClick={() => {
                        setBookingModal({
                            visible: true,
                            studioId: studio.id,
                            appointmentReschedule: appointment,
                        });
                    }}
                    disabled={appointment.status.toString() === AppointmentStatusString.CANCELED}
                >
                    <IconCalendarRepeat size={18} className="text-white" />
                    <span>Đặt lại lịch</span>
                </Button>
            </div>
        </div>
    );
};

export default AppointmentCard;
