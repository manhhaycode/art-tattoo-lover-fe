import * as httpRequest from '@/lib/axios';
import { IFilter, IPaginationStudio, IStudio } from '../types';
import { useQuery } from '@tanstack/react-query';

const getListStudio = async (filter: IFilter): Promise<IPaginationStudio> => {
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

const getStudio = async (id: string): Promise<IStudio | null> => {
    if (id !== '') {
        try {
            const response: IStudio = await httpRequest.get(`/studios/${id}`);
            return response;
        } catch (_error) {
            console.log(_error);
        }
    }
    return null;
};

export const useGetStudio = (id: string) => {
    return useQuery({
        queryKey: ['studio', id],
        queryFn: () => getStudio(id),
        staleTime: Infinity,
        keepPreviousData: true,
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
