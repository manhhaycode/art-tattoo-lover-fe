import { IArtist, IUser } from '@/features/users';

export interface IMedia {
    id: string;
    url: string;
    type: number;
}

export interface IFilter {
    searchKeyword?: string;
    categoryId?: number;
    ratingList?: number[];
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

export interface IBecomeStudioReq {
    name: string;
    detail: string;
    logo: string;
    phone: string;
    email: string;
    website: string;
    facebook: string;
    instagram: string;
    address: string;
    latitude: number;
    longitude: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    redirectUrl: string;
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
    listService: IService[];
}

export type StudioArtist = {
    id: string;
    studioId: string;
    userId: string;
    isDisabled: boolean;
    user: IUser;
};

export type ShiftArtist = {
    shiftId: string;
    userId: string;
    isBooked: boolean;
    stuUser: IArtist;
};

export type Shift = {
    id: string;
    studioId: string;
    start: string;
    end: string;
    shiftArtists: ShiftArtist[];
};

export interface IServiceListStudioReq {
    studioId?: string;
    searchKeyword?: string;
    page: number;
    pageSize: number;
}
export interface IServiceListStudio {
    data: IService[];
    page: number;
    pageSize: number;
    total: number;
}

export interface IService {
    id: string;
    studioId: string;
    categoryId: number;
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    discount: number;
    isDisabled: boolean;
    thumbnail: string;
    expectDuration: string;
    category: ICategoryS;
    listMedia: IMedia[];
}

export interface ICategoryS {
    id: number;
    name: string;
    description: string;
    image: string;
}
