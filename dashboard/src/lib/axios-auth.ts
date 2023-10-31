import config from '@/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { IRefreshToken } from '@/features/auth/types';
import { refreshToken } from '@/features/auth/api';
import { ErrorAuth } from './error';

const httpRequest = axios.create({
    baseURL: config.API.API_URL,
});

export const sleep = (ms = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

httpRequest.interceptors.request.use(async (value) => {
    const at = Cookies.get('tattus-at');
    const rf = Cookies.get('tattus-rft');
    if (!at || (at && at.length === 0)) {
        if (rf && rf.length > 0) {
            const res: IRefreshToken = await refreshToken();
            res && Cookies.set('tattus-at', res.accessToken, { expires: new Date(res.accessTokenExp * 1000) });
        } else {
            Cookies.remove('tattus-rft');
            Cookies.remove('tattus-at');
            throw new Error(ErrorAuth.AT_RT_INVALID);
        }
    }
    value.headers['Authorization'] = `Bearer ${Cookies.get('tattus-at')}`;
    return value;
});

httpRequest.interceptors.response.use(undefined, async (error) => {
    if (error instanceof Error && !(error instanceof AxiosError)) {
        return Promise.reject({ error: error.message });
    }

    if (error instanceof AxiosError && error.response) {
        if (error.request.responseURL.includes('/users/password')) {
            return Promise.reject(error.response.data);
        }
        try {
            if (error.response.status === 401) {
                const res: IRefreshToken = await refreshToken();
                res && Cookies.set('tattus-at', res.accessToken, { expires: new Date(res.accessTokenExp * 1000) });
            }
        } catch (e) {
            return Promise.reject({ error: (e as Error).message });
        }
        return Promise.reject(error.response.data);
    } else {
        throw new Error('Network Error');
    }
});

export const get = async (path: string, options?: AxiosRequestConfig<object>) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path: string, data?: object, options?: AxiosRequestConfig<object>) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const patch = async (path: string, data: object, options?: AxiosRequestConfig<object>) => {
    const response = await httpRequest.patch(path, data, options);
    return response.data;
};

export const put = async (path: string, data: object, options?: AxiosRequestConfig<object>) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const remove = async (path: string, options: AxiosRequestConfig<object>) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
