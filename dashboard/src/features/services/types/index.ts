import { IPagination, IPaginationReq } from '@/common/types';
import { IMedia } from '@/features/studio';

export interface IServiceListStudioReq extends IPaginationReq {
    studioId?: string;
}

export interface IServiceListStudio extends IPagination {
    data: IService[];
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
    category: ICategory;
    listMedia: IMedia[];
    listNewMedia?: IMedia[];
    listRemoveMedia?: string[];
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
    image: string;
}
