import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

export const login = (email: string, password: string): Promise<AxiosResponse> => {
    const promise = axios({
        method: 'POST',
        url: `${API_ENDPOINT}/auth`,
        data: {
            email,
            password,
        },
    });
    return promise;
};
