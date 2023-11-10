import { IShift } from '@/features/shifts';
import { IUserStudio } from '@/features/studio';
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
}

export interface IPaginationListAppointmentStudio {
    appointments: IAppointmentStudio[];
    page: number;
    pagesize: number;
    total: number;
}

export interface IAppointmentStudio {
    id: string;
    user: IUser;
    shiftId: string;
    doneBy: string | null;
    notes: string;
    status: number;
    listMedia: string[];
    artist: IUserStudio | null;
    shift: IShift;
    service: IService | null;
}

export interface IUpdateAppointmentReq {
    id: string;
    shiftId?: string;
    notes?: string;
    artistId?: string;
    status?: number;
    duration?: string;
}

export interface IUpdateAppointment extends ILogout {}

export enum EStatusAppointment {
    PENDING = 'Chờ xác nhận',
    CONFIRMED = 'Đã xác nhận',
    RESCHEDULED = 'Đã đổi lịch',
    CANCELED = 'Đã hủy',
    COMPLETED = 'Đã hoàn thành',
    LATE = 'Quá hạn xác nhận',
}

export const statusAppointmentMap: Record<number, EStatusAppointment> = {
    0: EStatusAppointment.PENDING,
    1: EStatusAppointment.CONFIRMED,
    2: EStatusAppointment.RESCHEDULED,
    3: EStatusAppointment.CANCELED,
    4: EStatusAppointment.COMPLETED,
    5: EStatusAppointment.LATE,
};
