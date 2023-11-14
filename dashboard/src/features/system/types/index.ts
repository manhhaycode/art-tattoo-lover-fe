import { ILogout } from '@/features/auth';
import { IStudio } from '@/features/studio';
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

export interface IAdminDashboard {
    studioData: IStudioAdminDashboard;
    userData: IUserAdminDashboard;
    testimonialData: ITestimonialAdminDashboard;
    bookingData: IBookingAdminDashboard;
    revenueData: IRevenueStudioDashboard;
}

export interface IStudioDashboard {
    userData: IUserAdminDashboard;
    testimonialData: ITestimonialAdminDashboard;
    bookingData: IBookingAdminDashboard;
    revenueData: IRevenueStudioDashboard;
}

export interface IStudioAdminDashboard {
    totalStudio: number;
    totalStudioThisMonth: number;
    totalStudioLastMonth: number;
}

export interface IUserAdminDashboard {
    totalUser: number;
    totalUserThisMonth: number;
    totalUserLastMonth: number;
}

export interface ITestimonialAdminDashboard {
    avgTestimonial: number;
    totalTestimonial: number;
}

export interface IRevenueStudioDashboard {
    totalRevenue: number;
    totalRevenueThisMonth: number;
    totalRevenueLastMonth: number;
}

export interface IBookingAdminDashboard {
    totalBooking: number;
    totalBookingThisMonth: number;
    totalBookingLastMonth: number;
}

export interface IBookingDaily {
    date: string;
    times: number;
}

export interface IMostPopularStudio {
    studio: IStudio;
    studioId: string;
    totalBooking: number;
    totalRevenue: number;
}

export interface IMostPopularArtist {
    artistId: string;
    totalBooking: number;
    totalRevenue: number;
    artist: {
        userId: string;
        user: IUser;
    };
}
