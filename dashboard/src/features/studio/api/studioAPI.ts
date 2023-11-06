import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';

import {
    ICreateUserStudio,
    ICreateUserStudioReq,
    IDeleteUserStudio,
    IFilter,
    IPaginationStudio,
    IPaginationUserList,
    IStudio,
    IUpdateStudio,
    IUpdateUserStudio,
    IUpdateUserStudioReq,
    IUserListReq,
    IUserStudio,
} from '../types';
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

const getStudioArtist = async (studioId: string): Promise<IUserStudio[]> => {
    try {
        const response: IUserStudio[] = await httpRequest.get('/studios/artists', {
            params: { studioId },
        });
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

const getUserStudio = async (data: IUserListReq): Promise<IPaginationUserList> => {
    try {
        const response: IPaginationUserList = await httpAuth.get('/studios/user', {
            params: data,
        });
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

const updateStudio = async (data: Partial<IStudio>): Promise<IUpdateStudio> => {
    try {
        const response: IUpdateStudio = await httpAuth.put(`/studios/${data.id}`, data);
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

const deleteUserStudio = async (id: string): Promise<IDeleteUserStudio> => {
    try {
        const response: IDeleteUserStudio = await httpAuth.remove(`/studios/user/${id}`, {});
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

const createUserStudio = async (data: ICreateUserStudioReq): Promise<ICreateUserStudio> => {
    try {
        const response: ICreateUserStudio = await httpAuth.post('/studios/create/user', data);
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

const updateUserStudio = async (data: IUpdateUserStudioReq): Promise<IUpdateUserStudio> => {
    try {
        const response: IUpdateUserStudio = await httpAuth.put(`/studios/user/${data.userId}`, {
            isDisabled: data.isDisabled,
            roleId: data.roleId,
        });
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

export const useGetStudio = (id: string) => {
    return useQuery({
        queryKey: ['studio', id],
        queryFn: () => getStudio(id),
        staleTime: 0,
        enabled: id.length > 0,
    });
};

export const useGetStuidoMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IStudio, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IStudio | null>;
}) => {
    return useMutation({
        mutationFn: (id: string) => getStudio(id),
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
        keepPreviousData: true,
    });
};

export const useGetListUserStudio = (data: IUserListReq) => {
    return useQuery({
        queryKey: ['user-studio', data],
        queryFn: () => getUserStudio(data),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetListArtistOfStudio = (studioId: string) => {
    return useQuery({
        queryKey: ['artist-studio', studioId],
        queryFn: () => getStudioArtist(studioId),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: studioId.length > 0,
    });
};

export const useUpdateStudioMutation = (handleFn: {
    onError?: (error: Error, variables: Partial<IStudio>, context: unknown) => void;
    onSuccess?: (data: IUpdateStudio, variables: Partial<IStudio>, context: unknown) => void;
    onMutate?: (variables: Partial<IStudio>) => Promise<IUpdateStudio>;
}) => {
    return useMutation({
        mutationFn: (data: Partial<IStudio>) => updateStudio(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useUpdateUserStudioMutation = (handleFn: {
    onError?: (error: Error, variables: IUpdateUserStudioReq, context: unknown) => void;
    onSuccess?: (data: IUpdateUserStudio, variables: IUpdateUserStudioReq, context: unknown) => void;
    onMutate?: (variables: IUpdateUserStudioReq) => Promise<IUpdateUserStudio>;
}) => {
    return useMutation({
        mutationFn: (data: IUpdateUserStudioReq) => updateUserStudio(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useCreateUserStudioMutation = (handleFn: {
    onError?: (error: Error, variables: ICreateUserStudioReq, context: unknown) => void;
    onSuccess?: (data: ICreateUserStudio, variables: ICreateUserStudioReq, context: unknown) => void;
    onMutate?: (variables: ICreateUserStudioReq) => Promise<ICreateUserStudio>;
}) => {
    return useMutation({
        mutationFn: (data: ICreateUserStudioReq) => createUserStudio(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useDeleteUserStudioMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IDeleteUserStudio, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IDeleteUserStudio>;
}) => {
    return useMutation({
        mutationFn: (id: string) => deleteUserStudio(id),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
