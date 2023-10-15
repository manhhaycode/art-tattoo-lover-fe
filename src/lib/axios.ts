import config from '@/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { IRefreshToken } from '@/features/auth/types';
import { refreshToken } from '@/features/auth/api';

const httpRequest = axios.create({
    baseURL: config.API.API_URL,
});

export const sleep = (ms = 1000): Promise<void> => {
    console.log('Kindly remember to remove `sleep`');
    return new Promise((resolve) => setTimeout(resolve, ms));
};

httpRequest.interceptors.response.use(
    async (response) => {
        if (process.env.NODE_ENV === 'development') {
            await sleep();
        }
        return response;
    },
    async (error: AxiosError) => {
        const refreshTokenString = Cookies.get('tattus-rft');
        if (error.response) {
            if (!error.request.responseURL.includes('/auth/refresh') && refreshTokenString) {
                const res: IRefreshToken = await refreshToken();
                res && Cookies.set('tattus-at', res.accessToken, { expires: new Date(res.accessTokenExp * 1000) });
            } else {
                Cookies.remove('tattus-rft');
                Cookies.remove('tattus-at');
                sessionStorage.removeItem('tattus-session');
            }
            if (process.env.NODE_ENV === 'development') {
                await sleep();
            }
            return Promise.reject(error.response.data);
        } else {
            throw new Error('Network Error');
        }
    },
);

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

export const remove = async (path: string, options: AxiosRequestConfig<object>) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
