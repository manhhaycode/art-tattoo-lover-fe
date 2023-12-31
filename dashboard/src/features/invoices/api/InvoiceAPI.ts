import * as httpAuth from '@/lib/axios-auth';
import { CreateInvoiceReq, IInvoice, IInvoiceListStudio, ListInvoiceStudioReq } from '../types';
import { EditRes } from '@/common/types';
import { ILogout } from '@/features/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

const createInvoice = async (data: CreateInvoiceReq): Promise<EditRes> => {
    try {
        const res: EditRes = await httpAuth.post('/invoice', data);
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const getListInvoiceStudio = async (filter: ListInvoiceStudioReq): Promise<IInvoiceListStudio> => {
    try {
        const res: IInvoiceListStudio = await httpAuth.get('/invoice/studio', {
            params: filter,
            paramsSerializer: { indexes: null },
        });
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

const getInvoiceStudio = async (id: string): Promise<IInvoice> => {
    try {
        const res: IInvoice = await httpAuth.get(`/invoice/studio/${id}`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

export const useCreateInvoiceMutation = (handleFn: {
    onError?: (error: Error, variables: CreateInvoiceReq, context: unknown) => void;
    onSuccess?: (data: EditRes, variables: CreateInvoiceReq, context: unknown) => void;
    onMutate?: (data: CreateInvoiceReq) => Promise<ILogout>;
}) => {
    return useMutation({
        mutationFn: (data: CreateInvoiceReq) => createInvoice(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useGetListInvoiceStudio = (filter: ListInvoiceStudioReq) => {
    return useQuery({
        queryKey: ['invoicesStudio', filter],
        queryFn: () => getListInvoiceStudio(filter),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetInvoiceStudio = (id: string) => {
    return useQuery({
        queryKey: ['invoiceStudio', id],
        queryFn: () => getInvoiceStudio(id),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: id.length > 0,
    });
};
