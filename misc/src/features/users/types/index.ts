import { ILogout } from '@/features/auth/types';

export interface IUpdateUser extends ILogout {}

export interface IUser {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    address: string | null;
    avatar: string | null;
    birthday: string | null;
    roleId: number;
    status: number;
}

export interface IArtist {
    id: string;
    studioId: string;
    userId: string;
    isDisabled: boolean;
    user: IUser;
}

export interface UserCredentials {
    fullName: string;
    phone: string;
    address: string | null;
    avatar: string | null;
    birthday: string | null;
}

export interface UserPasswordCredentials {
    oldPassword: string;
    newPassword: string;
}
