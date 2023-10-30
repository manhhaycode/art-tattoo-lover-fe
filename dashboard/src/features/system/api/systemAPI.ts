// import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';
import {
    ICreateUser,
    ICreateUserReq,
    IPaginationUserList,
    IPaginationUserListReq,
    IUpdateUser,
    IUpdateUserReq,
} from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUser } from '@/features/users';

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

export const useGetListUserStudio = (data: IPaginationUserListReq) => {
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
