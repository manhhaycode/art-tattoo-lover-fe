import { ILogout } from '@/features/auth';

export interface IShiftReq {
    start: string;
    end: string;
    studioId: string;
    artistId?: string;
}

export interface IShift {
    id: string;
    start: string;
    end: string;
    studioId: string;
    shiftUsers: IShiftUser[];
}

export interface IShiftUser {
    shiftId: string;
    stuUserId: string;
    isBooked: boolean;
}

export interface ICreateShiftReq {
    start: string;
    end: string;
}

export interface IRegisterShift extends ILogout {}
export interface IGenerateShift extends ILogout {}
export interface ICreateShift extends ILogout {}
export interface IDeleteShift extends ILogout {}
