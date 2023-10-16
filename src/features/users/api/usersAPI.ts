import * as httpRequest from '@/lib/axios';
import Cookies from 'js-cookie';
import { IUser } from '../types';

export const getUser = async (): Promise<IUser> => {
    try {
        const resUser = await httpRequest.get(`/users/profile`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('tattus-at')}`,
            },
        });
        return resUser;
    } catch (e) {
        throw new Error(e.error);
    }
};
