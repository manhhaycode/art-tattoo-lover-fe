// import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';
import {
    ICreateStudio,
    ICreateUser,
    ICreateUserReq,
    IDeleteStudio,
    IPaginationUserList,
    IPaginationUserListReq,
    IUpdateUser,
    IUpdateUserReq,
} from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUser } from '@/features/users';
import { IStudio } from '@/features/studio';

const getListUser = async (data: IPaginationUserListReq): Promise<IPaginationUserList> => {
    try {
        const response: IPaginationUserList = await httpAuth.get('/users', {
            params: data,
        });
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

export const updateUser = async (data: Partial<IUpdateUserReq>): Promise<IUpdateUser> => {
    const { id, ...body } = data;
    try {
        const resUpdate: IUpdateUser = await httpAuth.put(`/users/${id}`, body);
        return resUpdate;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const createUser = async (data: Partial<IUser>): Promise<IUpdateUser> => {
    try {
        const resUpdate: IUpdateUser = await httpAuth.post('/users', data);
        return resUpdate;
    } catch (e) {
        throw new Error(e.error);
    }
};

const createStudio = async (data: Partial<IStudio>): Promise<ICreateStudio> => {
    try {
        const resCreate: IUpdateUser = await httpAuth.post('studios/create', data);
        return resCreate;
    } catch (e) {
        throw new Error(e.error);
    }
};

const deleteStudio = async (id: string): Promise<IDeleteStudio> => {
    try {
        const response: IDeleteStudio = await httpAuth.remove(`/studios/${id}`, {});
        return response;
    } catch (_error) {
        throw new Error(_error);
    }
};

export const useGetListUser = (data: IPaginationUserListReq) => {
    return useQuery({
        queryKey: ['user-list', data],
        queryFn: () => getListUser(data),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useUpdateUserMutation = (
    handleFn: {
        onError?: (error: Error, variables: Partial<IUpdateUserReq>, context: unknown) => void;
        onSuccess?: (data: IUpdateUser, variables: Partial<IUpdateUserReq>, context: unknown) => void;
        onMutate?: (userData: Partial<IUpdateUserReq>) => Promise<IUpdateUser>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (userData: Partial<IUpdateUserReq>) => updateUser(userData),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useCreateUserMutation = (
    handleFn: {
        onError?: (error: Error, variables: Partial<ICreateUserReq>, context: unknown) => void;
        onSuccess?: (data: ICreateUser, variables: Partial<ICreateUserReq>, context: unknown) => void;
        onMutate?: (userData: Partial<ICreateUserReq>) => Promise<ICreateUser>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (userData: Partial<ICreateUserReq>) => createUser(userData),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useCreateStudioMutation = (
    handleFn: {
        onError?: (error: Error, variables: Partial<IStudio>, context: unknown) => void;
        onSuccess?: (data: ICreateStudio, variables: Partial<IStudio>, context: unknown) => void;
        onMutate?: (data: Partial<IStudio>) => Promise<ICreateStudio>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (data: Partial<IStudio>) => createStudio(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useDeleteStudioMutation = (
    handleFn: {
        onError?: (error: Error, variables: string, context: unknown) => void;
        onSuccess?: (data: IDeleteStudio, variables: string, context: unknown) => void;
        onMutate?: (id: string) => Promise<IDeleteStudio>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (id: string) => deleteStudio(id),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};
