import { ILogout } from '@/features/auth';
import { IUser } from '@/features/users';

export interface IMedia {
    id: string;
    url: string;
    type?: number;
}

export interface IFilter {
    searchKeyword?: string;
    category?: string;
    rating?: number[];
    viewPortNE?: {
        lat: number;
        lng: number;
    };
    viewPortSW?: {
        lat: number;
        lng: number;
    };
    page?: number;
    pageSize?: number;
    sort?: string;
}

export interface IUpdateStudio extends ILogout {}
export interface IUpdateUserStudio extends ILogout {}
export interface ICreateUserStudio extends ILogout {}
export interface IDeleteUserStudio extends ILogout {}

export interface IUpdateStudioReq extends IStudio {
    listRemoveMedia: string[];
    listNewMedia: IMedia[];
}

export interface IDeleteUserStudioReq {
    userId: string;
}
export interface ICreateUserStudioReq {
    email: string;
    roleId: number;
    studioId: string;
}
export interface IUpdateUserStudioReq {
    userId: string;
    isDisabled?: boolean;
    roleId?: number;
}

export interface IUserListReq {
    studioId: string;
    page: number;
    pageSize: number;
    searchKeyword?: string;
}

export interface IUserStudio {
    id: string;
    studioId: string;
    userId: string;
    isDisabled: boolean;
    user: IUser;
}

export interface IPaginationUserList {
    data: IUserStudio[];
    page: number;
    pageSize: number;
    total: number;
}

export interface IWorkingTime {
    dayOfWeek: number;
    closeAt: string;
    openAt: string;
}

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
}

export interface IPaginationStudio {
    data: IStudio[];
    page: number;
    pageSize: number;
    total: number;
}

export interface IStudio {
    id: string;
    name: string;
    slogan: string;
    introduction: string;
    detail: string;
    logo: string;
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
    website: string;
    address: string;
    latitude: number;
    longitude: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    rating: number;
    listCategory: ICategory[];
    listMedia: IMedia[];
    workingTimes: IWorkingTime[];
}
