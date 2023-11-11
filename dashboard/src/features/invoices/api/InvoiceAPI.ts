import * as httpAuth from '@/lib/axios-auth';
import { CreateInvoiceReq, IInvoiceListStudio, ListInvoiceStudioReq } from '../types';
import { EditRes } from '@/common/types';
import { ILogout } from '@/features/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

const createInvoice = async (data: CreateInvoiceReq): Promise<EditRes> => {
    try {
        const res: EditRes = await httpAuth.post('/invoice', data);
        return res;
    } catch (error) {
        throw new Error(error);
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

export const useCreateInvoiceMutation = (
    handleFn: {
        onError?: (error: unknown, variables: CreateInvoiceReq, context: unknown) => void;
        onSuccess?: (data: EditRes, variables: CreateInvoiceReq, context: unknown) => void;
        onMutate?: (data: CreateInvoiceReq) => Promise<ILogout>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (data: CreateInvoiceReq) => createInvoice(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
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
