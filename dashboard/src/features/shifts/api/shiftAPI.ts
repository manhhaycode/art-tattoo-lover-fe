import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';
import { ICreateShift, ICreateShiftReq, IDeleteShift, IGenerateShift, IShift, IShiftReq } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const getShiftList = async (filter: IShiftReq): Promise<IShift[]> => {
    if (filter.end.length === 0 || filter.start.length === 0) {
        return [];
    }
    try {
        const res: IShift[] = await httpAuth.get('/shift/studio', {
            params: filter,
        });
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const generateShift = async (shiftDuration: string): Promise<IGenerateShift> => {
    try {
        const res: IGenerateShift = await httpAuth.post('/shift/generate', {
            shiftDuration,
        });
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const registerShift = async (shiftId: string): Promise<IGenerateShift> => {
    try {
        const res: IGenerateShift = await httpAuth.put(`/shift/register/${shiftId}`, {});
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const createShift = async (time: ICreateShiftReq): Promise<ICreateShift> => {
    try {
        const res: ICreateShift = await httpAuth.post('/shift', time);
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const getShiftDetail = async (shiftId: string): Promise<IShift | null> => {
    if (shiftId.length === 0) {
        return null;
    }
    try {
        const res: IShift = await httpRequest.get(`/shift/${shiftId}`);
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const deleteShift = async (shiftId: string): Promise<IDeleteShift> => {
    try {
        const res: IDeleteShift = await httpAuth.remove(`/shift/${shiftId}`, {});
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const updateShift = async (data: { shiftId: string; time: ICreateShiftReq }): Promise<ICreateShift> => {
    try {
        const res: ICreateShift = await httpAuth.put(`/shift/${data.shiftId}`, data.time);
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const useGetShiftList = (filter: IShiftReq) => {
    return useQuery({
        queryKey: ['shifts', filter],
        queryFn: () => getShiftList(filter),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: filter.end.length > 0 && filter.start.length > 0,
    });
};

export const useGetShiftDetail = (shiftId: string) => {
    return useQuery({
        queryKey: ['shift', shiftId],
        queryFn: () => getShiftDetail(shiftId),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: shiftId.length > 0,
    });
};

export const useGenerateShiftMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IGenerateShift, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IGenerateShift>;
}) => {
    return useMutation({
        mutationFn: (shiftDuration: string) => generateShift(shiftDuration),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useRegisterShiftMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IGenerateShift, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IGenerateShift>;
}) => {
    return useMutation({
        mutationFn: (shiftId: string) => registerShift(shiftId),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useCreateShiftMutation = (handleFn: {
    onError?: (error: Error, variables: ICreateShiftReq, context: unknown) => void;
    onSuccess?: (data: IGenerateShift, variables: ICreateShiftReq, context: unknown) => void;
    onMutate?: (time: ICreateShiftReq) => Promise<IGenerateShift>;
}) => {
    return useMutation({
        mutationFn: (time: ICreateShiftReq) => createShift(time),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useDeleteShiftMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IDeleteShift, variables: string, context: unknown) => void;
    onMutate?: (shiftId: string) => Promise<IDeleteShift>;
}) => {
    return useMutation({
        mutationFn: (shiftId: string) => deleteShift(shiftId),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
