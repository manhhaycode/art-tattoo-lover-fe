import * as httpRequest from '@/lib/axios';
// import * as httpAuth from '@/lib/axios-auth';
import { ICategory } from '../types';
import { useQuery } from '@tanstack/react-query';

const getListCategory = async (): Promise<ICategory[]> => {
    try {
        const res: ICategory[] = await httpRequest.get('/category');
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

export const useGetListCategory = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => getListCategory(),
        staleTime: Infinity,
        keepPreviousData: true,
    });
};
