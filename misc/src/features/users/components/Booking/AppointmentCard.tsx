import { IStudio, StudioArtist } from '@/features/studios';
import { AppointmentStatusString, AppointmentType } from '../../types/appointment';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import Button from '@/components/common/Button';
import { formatStringTime } from '@/lib/helper/dateHelper';

import {
    IconCalendar,
    IconCalendarPin,
    IconCalendarRepeat,
    IconCalendarX,
    IconCategory,
    IconClock,
} from '@tabler/icons-react';
import AppointmentStatusTag from './AppointmentStatus';
import { useMutation } from '@tanstack/react-query';
import { cancelAppointment } from '../../api/appointmentAPI';
import { toast } from 'react-hot-toast';
import { useModalStore } from '@/store/componentStore';
import { convertTimeToDisplayFormat } from '@/lib/helper';

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
        <div className="px-6 py-4 flex flex-col justify-between  rounded-xl bg-gray-dark shadow-shadow-dropdown relative">
            <div className="flex flex-col w-full gap-x-2 gap-y-3 flex-1  xs:flex-row">
                <img
                    className="cursor-pointer rounded-xl w-full aspect-video xs:w-40"
                    src={studio.logo?.includes('http') ? studio.logo : StudioCardImage}
                    alt=""
                />

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-base font-semibold xs:text-lg max-w-[70%] truncate">{studio.name}</h4>

                        <div className="flex-1 flex justify-end xs:hidden">
                            <AppointmentStatusTag status={appointment.status} />
                        </div>
                    </div>
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
                    {appointment.duration !== '00:00:00' && (
                        <div className="flex items-center gap-1">
                            <IconClock size={16} className="text-white w-5" />
                            <h6 className="text-sm">
                                Hoàn thành trong: {convertTimeToDisplayFormat(appointment.duration)}
                            </h6>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <IconCategory size={16} className="text-white w-5" />
                        <h6 className="text-sm">{appointment.service.name}</h6>
                    </div>
                </div>
            </div>

            <div className="absolute top-3 right-3 hidden xs:block">
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
                    {...(Number(appointment.status) > Number(AppointmentStatusString.RESCHEDULED) && {
                        disabled: true,
                        className: 'w-full h-fit py-3 !bg-disable text-placeholder-gray',
                    })}
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
                            service: appointment.service,
                            artist: appointment.artist as StudioArtist | null,
                        });
                    }}
                    {...(Number(appointment.status) > Number(AppointmentStatusString.RESCHEDULED) && {
                        disabled: true,
                        className: 'w-full h-fit py-3 !bg-disable text-placeholder-gray',
                    })}
                >
                    <IconCalendarRepeat size={18} className="text-white" />
                    <span>Đổi lịch hẹn</span>
                </Button>
            </div>
        </div>
    );
};

export default AppointmentCard;
