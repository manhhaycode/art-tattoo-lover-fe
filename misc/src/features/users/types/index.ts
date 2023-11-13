import { ILogout } from '@/features/auth/types';
import { IMedia } from '@/features/media';

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
    listMedia: IMedia[];
}

export interface IArtist {
    id: string;
    studioId: string;
    userId: string;
    isDisabled: boolean;
    user: IUser;
}

export interface UserCredentials {
    fullName?: string;
    phone?: string;
    address?: string | null;
    avatar?: string | null;
    birthday?: string | null;
    listNewMedia?: IMedia[];
    listRemoveMedia?: string[];
}

export interface UserPasswordCredentials {
    oldPassword: string;
    newPassword: string;
}
