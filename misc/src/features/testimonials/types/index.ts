import { PaginationQuery, PaginationResp } from '@/config/types/pagination';
import { IUser } from '@/features/users';

export interface ITestimonial {
    id: string;
    studioId: string;
    title: string;
    content: string;
    rating: number;
    createdBy: string;
    createdAt: string;
    updateAt: string;
    userDto: IUser;
}

export interface ITestimonialCreateReq {
    studioId: string;
    title: string;
    content: string;
    rating: number;
}

export interface ITestimonialPaginationReq extends PaginationQuery {
    studioId: string;
}

export interface ITestimonialPagination extends PaginationResp {
    data: ITestimonial[];
}
