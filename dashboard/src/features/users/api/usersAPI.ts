import * as httpAuth from '@/lib/axios-auth';
import { ISearchUserPagination, IUpdateUser, IUser, UserCredentials, UserPasswordCredentials } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IPaginationReq } from '@/common/types';

export const getUser = async (): Promise<IUser> => {
    try {
        const resUser = await httpAuth.get(`/users/profile`);
        return resUser;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const searchUser = async (filter: IPaginationReq): Promise<ISearchUserPagination> => {
    if (filter.searchKeyword === '') return { data: [], total: 0, page: filter.page, pageSize: filter.pageSize };
    try {
        const res: ISearchUserPagination = await httpAuth.get('/users/search', {
            params: filter,
        });
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const updateBasicInfo = async (data: UserCredentials): Promise<IUpdateUser> => {
    try {
        const resUpdate = await httpAuth.put(`/users/profile`, data);
        return resUpdate;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const changePasswordUser = async (data: UserPasswordCredentials): Promise<IUpdateUser> => {
    try {
        const resUpdate = await httpAuth.put(`/users/password`, data);
        return resUpdate;
    } catch (e) {
        throw new Error(e.error);
    }
};
export const useSearchUser = (filter: IPaginationReq) => {
    return useQuery({
        queryKey: ['user-search', filter],
        queryFn: () => searchUser(filter),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};

export const useGetUserMutation = (
    handleFn: {
        onError?: (error: Error, variables: unknown, context: unknown) => void;
        onSuccess?: (data: IUser, variables: unknown, context: unknown) => void;
        onMutate?: () => Promise<IUser>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: getUser,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useUpdateBasicInfoMutation = (
    handleFn: {
        onError?: (error: Error, variables: UserCredentials, context: unknown) => void;
        onSuccess?: (data: IUpdateUser, variables: UserCredentials, context: unknown) => void;
        onMutate?: (userData: UserCredentials) => Promise<IUpdateUser>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (userData: UserCredentials) => updateBasicInfo(userData),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useChangePasswordMutation = (handleFn: {
    onError?: (error: Error, variables: UserPasswordCredentials, context: unknown) => void;
    onSuccess?: (data: IUpdateUser, variables: UserPasswordCredentials, context: unknown) => void;
    onMutate?: (data: UserPasswordCredentials) => Promise<IUpdateUser>;
}) => {
    return useMutation({
        mutationFn: (data: UserPasswordCredentials) => changePasswordUser(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
