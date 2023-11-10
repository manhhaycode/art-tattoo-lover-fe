import { toast } from 'react-toastify';
import { Shift } from '../types';
import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';

export type ShiftQuery = {
    studioId: string;
    start: string;
    end: string;
    artistId?: string;
};

export const getStudioShifts = async (query: ShiftQuery): Promise<Shift[]> => {
    try {
        const res = await httpRequest.get('/shift', {
            params: {
                ...query,
            },
        });
        return res as Shift[];
    } catch (error) {
        toast.error(error.message);

        return [];
    }
};

export type BookAppointment = {
    shiftId: string;
    notes?: string;
    artistId?: string;
    serviceId?: string;
};

export const bookAppointment = async (body: BookAppointment): Promise<void> => {
    try {
        return httpAuth.post('/appointment', body);
    } catch (error) {
        toast.error(error.message);
    }
};
