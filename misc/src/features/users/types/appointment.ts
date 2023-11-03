import { Shift } from '@/features/studios';
import { IUser } from '.';
import { PaginationResp } from '@/config/types/pagination';

export const AppointmentStatus = {
    '0': 'Chờ xác nhận',
    '1': 'Đã xác nhận',
    '2': 'Thay đổi lịch',
    '3': 'Đã hủy',
    '4': 'Đã hoàn thành',
    '5': 'Đã quá hạn',
};

export type ShiftUser = {
    shiftId: string;
    userId: string;
    isBooked: boolean;
    user: IUser;
};

export type AppointmentType = {
    id: string;
    userId: string;
    shiftId: string;
    doneBy: string | null;
    notes: string | null;
    artist: ShiftUser | null;
    shift: Shift;
};

export interface AppointmentResp extends PaginationResp {
    appointments: AppointmentType[];
}
