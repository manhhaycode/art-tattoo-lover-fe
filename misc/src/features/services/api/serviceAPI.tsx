import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';

import { IService, IServiceListStudio, IServiceListStudioReq } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EditRes } from '@/common/types';

const getListServiceStudio = async (filter: IServiceListStudioReq): Promise<IServiceListStudio> => {
    try {
        const response: IServiceListStudio = await httpRequest.get('/studio/service', { params: filter });
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

const createService = async (data: Partial<IService>): Promise<EditRes> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, category, ...rest } = data;
    try {
        const response: EditRes = await httpAuth.post('/studio/service/create', rest);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

const updateService = async (data: Partial<IService>): Promise<EditRes> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, listMedia, category, ...rest } = data;
    try {
        const response: EditRes = await httpAuth.put(`/studio/service/${id}`, rest);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteService = async (id: string): Promise<EditRes> => {
    try {
        const response: EditRes = await httpAuth.remove(`/studio/service/${id}`, {});
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const useGetListServiceStudio = (filter: IServiceListStudioReq) => {
    return useQuery({
        queryKey: ['servicesStudio', filter],
        queryFn: () => getListServiceStudio(filter),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: filter?.studioId ? true : false,
    });
};

export const useCreateServiceMutation = (handleFn: {
    onError?: (error: Error, variables: Partial<IService>, context: unknown) => void;
    onSuccess?: (data: EditRes, variables: Partial<IService>, context: unknown) => void;
    onMutate?: (data: Partial<IService>) => Promise<EditRes>;
}) => {
    return useMutation({
        mutationFn: (data: Partial<IService>) => createService(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useUpdateServiceMutation = (handleFn: {
    onError?: (error: Error, variables: Partial<IService>, context: unknown) => void;
    onSuccess?: (data: EditRes, variables: Partial<IService>, context: unknown) => void;
    onMutate?: (data: Partial<IService>) => Promise<EditRes>;
}) => {
    return useMutation({
        mutationFn: (data: Partial<IService>) => updateService(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useDeleteServiceMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: EditRes, variables: string, context: unknown) => void;
    onMutate?: (id: string) => Promise<EditRes>;
}) => {
    return useMutation({
        mutationFn: (id: string) => deleteService(id),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
