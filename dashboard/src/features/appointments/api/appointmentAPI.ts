import * as httpAuth from '@/lib/axios-auth';
import {
    IFilterAppointment,
    IPaginationListAppointmentStudio,
    IUpdateAppointment,
    IUpdateAppointmentReq,
} from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
const getListAppointmentStudio = async (filter: IFilterAppointment): Promise<IPaginationListAppointmentStudio> => {
    try {
        const response = await httpAuth.get('/appointment/studio', {
            params: filter,
        });
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateAppointment = async (data: IUpdateAppointmentReq): Promise<IUpdateAppointment> => {
    const { id, ...rest } = data;
    try {
        const response = await httpAuth.put(`/appointment/studio/${id}`, rest);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const cancelAppointment = async (id: string): Promise<IUpdateAppointment> => {
    try {
        const response = await httpAuth.put(`/appointment/cancel/${id}`, {});
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const useGetListAppointmentStudio = (filter: IFilterAppointment, enabled?: boolean) => {
    return useQuery({
        queryKey: ['appointmentsStudio', filter],
        queryFn: () => getListAppointmentStudio(filter),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled,
    });
};

export const useUpdateAppointmentMutation = (handleFn: {
    onError?: (error: Error, variables: IUpdateAppointmentReq, context: unknown) => void;
    onSuccess?: (data: IUpdateAppointment, variables: IUpdateAppointmentReq, context: unknown) => void;
    onMutate?: (variables: IUpdateAppointmentReq) => Promise<IUpdateAppointment>;
}) => {
    return useMutation({
        mutationFn: (data: IUpdateAppointmentReq) => updateAppointment(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useCancelAppointmentMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IUpdateAppointment, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IUpdateAppointment>;
}) => {
    return useMutation({
        mutationFn: (id: string) => cancelAppointment(id),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
