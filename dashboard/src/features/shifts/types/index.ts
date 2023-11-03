import { ILogout } from '@/features/auth';
import { IUserStudio } from '@/features/studio';

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
    shiftArtists: IShiftArtists[];
}

export interface IShiftArtists {
    shiftId: string;
    stuUserId: string;
    stuUser: IUserStudio;
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
