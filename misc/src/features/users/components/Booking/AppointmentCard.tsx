import { IStudio } from '@/features/studios';
import { AppointmentType } from '../../types/appointment';
import StudioCardImage from '@/assets/img/studio-card.jpg';
import Button from '@/components/common/Button';
import { formatStringDate } from '@/lib/helper/dateHelper';

import { IconCalendar, IconCalendarPin, IconCalendarRepeat, IconCalendarX } from '@tabler/icons-react';

interface Props {
    appointment: AppointmentType;
    studio: IStudio;
}
const AppointmentCard = ({ appointment, studio }: Props) => {
    return (
        <div className="px-6 py-4 rounded-xl bg-gray-dark shadow-shadow-dropdown">
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
                        <h6 className="text-sm">{formatStringDate(appointment.shift.start)}</h6>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <Button className="w-full" typeStyle="secondary">
                    <IconCalendarX size={18} className="text-white" />
                    <span>Hủy lịch</span>
                </Button>
                <Button className="w-full">
                    <IconCalendarRepeat size={18} className="text-white" />
                    <span>Đặt lại lịch</span>
                </Button>
            </div>
        </div>
    );
};

export default AppointmentCard;
