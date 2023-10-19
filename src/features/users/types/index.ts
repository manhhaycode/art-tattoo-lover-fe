import { ILogout } from '@/features/auth/types';

export interface IUpdateUser extends ILogout {}

export interface IUser {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    avatar: string;
    birthday: string;
    roleId: number;
}

export interface UserCredentials {
    email?: string;
    fullName?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    birthday?: string;
}

export interface UserPasswordCredentials {
    oldPassword: string;
    newPassword: string;
}
