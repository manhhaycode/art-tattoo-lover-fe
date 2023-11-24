import { IShift } from '@/features/shifts';
import { IMedia, IUserStudio } from '@/features/studio';
import { IUser } from '@/features/users';
import { ILogout } from '@/features/auth/types';
import { IService } from '@/features/services';

export interface IFilterAppointment {
    userId?: string;
    startDate?: string;
    endDate?: string;
    statusList?: number[];
    serviceList?: string[];
    searchKeyWord?: string;
    page?: number;
    pageSize?: number;
    artistId?: string;
}

export interface IPaginationListAppointmentStudio {
    appointments: IAppointmentStudio[];
    page: number;
    pageSize: number;
    total: number;
}

export interface IAppointmentStudio {
    id: string;
    user: IUser;
    shiftId: string;
    doneBy: string | null;
    notes: string;
    status: number;
    listMedia: IMedia[];
    artist: IUserStudio | null;
    shift: IShift;
    service: IService | null;
    duration: string;
}

export interface IUpdateAppointmentReq {
    id: string;
    shiftId?: string;
    notes?: string;
    artistId?: string;
    status?: number;
    duration?: string;
    listNewMedia?: IMedia[];
    listRemoveMedia?: string[];
}

export interface IUpdateAppointment extends ILogout {}

export enum EStatusAppointment {
    PENDING = 'Chờ xác nhận',
    CONFIRMED = 'Đã xác nhận',
    RESCHEDULED = 'Đã đổi lịch',
    CANCELED = 'Đã hủy',
    COMPLETED = 'Đã hoàn thành',
    LATE = 'Quá hạn xác nhận',
    BUSY = 'Studio bận',
}

export const statusAppointmentMap: Record<number, EStatusAppointment> = {
    0: EStatusAppointment.PENDING,
    1: EStatusAppointment.CONFIRMED,
    2: EStatusAppointment.RESCHEDULED,
    3: EStatusAppointment.CANCELED,
    4: EStatusAppointment.COMPLETED,
    5: EStatusAppointment.LATE,
    6: EStatusAppointment.BUSY,
};
