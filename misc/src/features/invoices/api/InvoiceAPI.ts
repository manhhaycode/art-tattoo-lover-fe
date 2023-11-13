import * as httpAuth from '@/lib/axios-auth';
import { useQuery } from '@tanstack/react-query';
import { PaginationQuery } from '@/config/types/pagination';
import { IInvoiceList } from '../types';

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

export const useGetListInvoice = (filter: PaginationQuery) => {
    return useQuery({
        queryKey: ['invoices', filter],
        queryFn: () => getListInvoice(filter),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

// export const useGetInvoiceStudio = (id: string) => {
//     return useQuery({
//         queryKey: ['invoiceStudio', id],
//         queryFn: () => getInvoiceStudio(id),
//         staleTime: Infinity,
//         keepPreviousData: true,
//         enabled: id.length > 0,
//     });
// };
