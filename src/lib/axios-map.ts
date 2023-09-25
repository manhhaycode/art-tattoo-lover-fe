import config from '@/config';
import axios, { AxiosRequestConfig } from 'axios';

const mapPlaceRequest = axios.create({
    baseURL: config.API.API_PLACE_URL,
});

export const get = async (path: string, config: AxiosRequestConfig<object>) => {
    const response = await mapPlaceRequest.get(path, config);
    return response.data;
};

export default mapPlaceRequest;
