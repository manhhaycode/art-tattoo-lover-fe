import config from '@/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const httpRequest = axios.create({
    baseURL: config.API.API_URL,
});

httpRequest.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response) {
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

export const remove = async (path: string, options: AxiosRequestConfig<object>) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
