import config from '@/config';
import axios, { AxiosRequestConfig } from 'axios';

const mapPlaceRequest = axios.create({
    baseURL: config.API.API_PLACE_URL,
});

export const getPlace = async (path: string, options: AxiosRequestConfig<object>) => {
    const response = await mapPlaceRequest.get(path, {
        ...options,
        params: {
            key: config.API.API_KEY,
            output: 'json',
            ...options.params,
        },
    });
    return response.data;
};

export default mapPlaceRequest;
