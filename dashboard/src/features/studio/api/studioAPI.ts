import * as httpRequest from '@/lib/axios';
import { IFilter, IPaginationStudio, IStudio } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';

const getListStudio = async (filter: IFilter): Promise<IPaginationStudio> => {
    if (Object.keys(filter).length === 0)
        return {
            data: [],
            page: 0,
            pageSize: 0,
            total: 0,
        };
    try {
        const response: IPaginationStudio = await httpRequest.post('/studios', filter);
        return response;
    } catch (_error) {
        console.log(_error);
    }
    return {
        data: [],
        page: 0,
        pageSize: 0,
        total: 0,
    };
};

const getStudio = async (id: string): Promise<IStudio> => {
    try {
        const response: IStudio = await httpRequest.get(`/studios/${id}`);
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

export const useGetStudio = (id: string) => {
    return useQuery({
        queryKey: ['studio', id],
        queryFn: () => getStudio(id),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetStuidoMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IStudio, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IStudio | null>;
}) => {
    return useMutation({
        mutationFn: (email: string) => getStudio(email),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useGetListStudio = (filter: IFilter) => {
    return useQuery({
        queryKey: ['studios', filter],
        queryFn: () => getListStudio(filter),
        staleTime: Infinity,
        // keepPreviousData: true,
    });
};
