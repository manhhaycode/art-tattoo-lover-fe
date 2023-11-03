import * as httpAuth from '@/lib/axios-auth';
import { AppointmentResp } from '../types/appointment';
import { toast } from 'react-toastify';
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
