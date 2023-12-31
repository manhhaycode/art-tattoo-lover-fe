import { IMedia, Shift } from '@/features/studios';
import { IUser } from '.';
import { PaginationResp } from '@/config/types/pagination';
import { IService } from '@/features/services';

export const AppointmentStatus = {
    '0': 'Chờ xác nhận',
    '1': 'Đã xác nhận',
    '2': 'Đã đặt lại',
    '3': 'Đã hủy',
    '4': 'Đã hoàn thành',
    '5': 'Đã quá hạn',
    '6': 'Studio bận',
};

export const AppointmentStatusString = {
    PENDING: '0',
    CONFIRMED: '1',
    RESCHEDULED: '2',
    CANCELED: '3',
    DONE: '4',
    LATE: '5',
    BUSY: '6',
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
    status: keyof typeof AppointmentStatus;
    service: IService;
    duration: string;
    listMedia: IMedia[];
};

export type AppointmentRescheduleReq = {
    appointmentId: string;
    shiftId: string;
    notes?: string;
    artistId?: string;
};

export interface AppointmentResp extends PaginationResp {
    appointments: AppointmentType[];
}
