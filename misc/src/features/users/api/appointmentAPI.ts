import * as httpAuth from '@/lib/axios-auth';
import { AppointmentRescheduleReq, AppointmentResp } from '../types/appointment';
import { toast } from 'react-hot-toast';
import { PaginationQuery } from '@/config/types/pagination';

export const getAppointments = async (query: PaginationQuery): Promise<AppointmentResp> => {
    try {
        const res = await httpAuth.get('/appointment', {
            params: {
                ...query,
            },
        });

        return res as AppointmentResp;
    } catch (error) {
        toast.error(error.message);
        return {
            page: 0,
            pageSize: 0,
            total: 0,
            appointments: [],
        };
    }
};

export const cancelAppointment = async (id: string): Promise<void> => {
    try {
        return httpAuth.put(`/appointment/cancel/${id}`, {});
    } catch (error) {
        toast.error(error.message);
    }
};

export const rescheduleAppointment = async (req: AppointmentRescheduleReq): Promise<void> => {
    try {
        return httpAuth.put(`/appointment/reschedule/${req.appointmentId}`, req);
    } catch (error) {
        toast.error(error.message);
    }
};
