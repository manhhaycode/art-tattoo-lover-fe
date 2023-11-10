import * as httpRequest from '@/lib/axios';
import { IFilter, IPaginationStudio, IStudio, StudioArtist, IServiceListStudioReq, IServiceListStudio } from '../types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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

export const getStudio = async (id: string): Promise<IStudio | null> => {
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

const getListServiceStudio = async (filter: IServiceListStudioReq): Promise<IServiceListStudio> => {
    try {
        const response: IServiceListStudio = await httpRequest.get('/studio/service', { params: filter });
        return response;
    } catch (error) {
        throw new Error(error);
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

export const useGetListStudio = (filter: IFilter) => {
    return useQuery({
        queryKey: ['studios', filter],
        queryFn: () => getListStudio(filter),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetListServiceStudio = (filter: IServiceListStudioReq) => {
    return useQuery({
        queryKey: ['studio-services', filter],
        queryFn: () => getListServiceStudio(filter),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: filter.studioId !== '',
    });
};

export const getStudioArtists = async (studioId: string): Promise<StudioArtist[]> => {
    try {
        const res = await httpRequest.get('/studios/artists', {
            params: {
                studioId,
            },
        });

        return res as StudioArtist[];
    } catch (error) {
        toast.error(error.message);
        return [];
    }
};
