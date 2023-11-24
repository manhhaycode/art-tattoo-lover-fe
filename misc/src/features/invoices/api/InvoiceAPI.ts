import * as httpAuth from '@/lib/axios-auth';
import { useQuery } from '@tanstack/react-query';
import { PaginationQuery } from '@/config/types/pagination';
import { IInvoice, IInvoiceList } from '../types';

const getListInvoice = async (filter: PaginationQuery): Promise<IInvoiceList> => {
    try {
        const res: IInvoiceList = await httpAuth.get('/invoice', {
            params: filter,
        });
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

const getInvoice = async (id: string): Promise<IInvoice> => {
    try {
        const res: IInvoice = await httpAuth.get(`/invoice/${id}`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

export const useGetListInvoice = (filter: PaginationQuery) => {
    return useQuery({
        queryKey: ['invoices', filter],
        queryFn: () => getListInvoice(filter),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetInvoice = (id: string) => {
    return useQuery({
        queryKey: ['invoice', id],
        queryFn: () => getInvoice(id),
        staleTime: 0,
        keepPreviousData: true,
    });
};
