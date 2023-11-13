import { PaginationResp } from '@/config/types/pagination';
import { IService } from '@/features/services';
import { IStudio } from '@/features/studios';
import { IUser } from '@/features/users';
import { AppointmentType } from '@/features/users/types/appointment';

export interface CreateInvoiceReq {
    total: number;
    payMethod: number;
    notes: string;
    appointmentId?: string;
    userId?: string;
    isGuest: boolean;
    services: IServiceInvoiceCreate[];
}

export interface IServiceInvoiceCreate {
    serviceId: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface IServiceInvoice {
    service: IService;
    quantity: number;
    price: number;
    discount: number;
}

export interface ITableInvoice {
    zOrder: number;
    service: string;
    unitPrice: number;
    quantity: number;
    amount: number;
    discount: number;
}

export const paymentInvoiceMap: Record<number, string> = {
    0: 'Thanh toán bằng tiền mặt',
    1: 'Thanh toán bằng thẻ',
    2: 'Thanh toán chuyển khoản',
};

export interface IInvoice {
    id: string;
    studioId: string;
    userId: string;
    total: number;
    studio: IStudio;
    payMethod: number;
    notes: string;
    appointmentId: string | null;
    createdAt: string;
    user: IUser;
    appointment: AppointmentType | null;
    invoiceServices: IServiceInvoice[];
}

export interface IInvoiceList extends PaginationResp {
    invoices: IInvoice[];
}
