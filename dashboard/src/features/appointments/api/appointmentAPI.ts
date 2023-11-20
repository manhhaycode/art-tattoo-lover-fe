import * as httpAuth from '@/lib/axios-auth';
import {
    IAppointmentStudio,
    IFilterAppointment,
    IPaginationListAppointmentStudio,
    IUpdateAppointment,
    IUpdateAppointmentReq,
} from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
const getListAppointmentStudio = async (filter: IFilterAppointment): Promise<IPaginationListAppointmentStudio> => {
    try {
        const response = await httpAuth.get(`/appointment/studio`, {
            params: filter,
            paramsSerializer: { indexes: null },
        });
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAppointmentStudio = async (id: string): Promise<IAppointmentStudio> => {
    try {
        const response: IAppointmentStudio = await httpAuth.get(`/appointment/studio/${id}`);
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
    } catch (e) {
        throw new Error(e.error);
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

export const useGetAppointmentStudio = (id: string) => {
    return useQuery({
        queryKey: ['appointmentStudio', id],
        queryFn: () => getAppointmentStudio(id),
        staleTime: Infinity,
        keepPreviousData: true,
        enabled: id.length > 0,
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
