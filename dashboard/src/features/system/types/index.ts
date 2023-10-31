import { ILogout } from '@/features/auth';
import { IUser, UserCredentials } from '@/features/users';

export interface IPaginationUserList {
    data: IUser[];
    page: number;
    pageSize: number;
    total: number;
}

export interface IPaginationUserListReq {
    page: number;
    pageSize: number;
    searchKeyword?: string;
}

export interface IUpdateUserReq extends UserCredentials {
    id: string;
    roleId: number;
    status: number;
}

export interface ICreateUserReq extends IUser {
    password: string;
}

export interface ICreateStudioReq {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    logo: string;
}

export interface IUpdateUser extends ILogout {}
export interface ICreateUser extends ILogout {}
export interface IDeleteStudio extends ILogout {}
export interface ICreateStudio extends ILogout {}
