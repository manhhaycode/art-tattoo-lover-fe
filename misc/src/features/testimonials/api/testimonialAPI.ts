import { useMutation, useQuery } from '@tanstack/react-query';
import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';

import { ITestimonialCreateReq, ITestimonialPagination, ITestimonialPaginationReq } from '../types';
import { EditRes } from '@/common/types';

const getListTestimonial = async (filter: ITestimonialPaginationReq): Promise<ITestimonialPagination> => {
    try {
        const res: ITestimonialPagination = await httpRequest.post('/testimonial', filter);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

const createTestimonial = async (data: ITestimonialCreateReq): Promise<EditRes> => {
    try {
        const res: EditRes = await httpAuth.post('/testimonial/create', data);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

export const useGetListTestimonial = (filter: ITestimonialPaginationReq) => {
    return useQuery({
        queryKey: ['testimonialStu', filter],
        queryFn: () => getListTestimonial(filter),
        staleTime: 0,
        keepPreviousData: true,
    });
};

export const useCreateTestimonialMutation = (
    handleFn: {
        onError?: (error: unknown, variables: ITestimonialCreateReq, context: unknown) => void;
        onSuccess?: (data: EditRes, variables: ITestimonialCreateReq, context: unknown) => void;
        onMutate?: (variables: ITestimonialCreateReq) => Promise<EditRes>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (credentials: ITestimonialCreateReq) => createTestimonial(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};
