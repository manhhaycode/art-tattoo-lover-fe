import * as httpRequest from '@/lib/axios';
import { MediaCredentials } from '../types';
import { IMedia } from '@/features/studios';
import { useMutation } from '@tanstack/react-query';

const uploadMedia = async (media: MediaCredentials): Promise<IMedia> => {
    try {
        const resMedia: IMedia = await httpRequest.post('/media/upload', media, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return resMedia;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const useUploadMediaMutation = (handleFn: {
    onError?: (error: Error, variables: MediaCredentials, context: unknown) => void;
    onSuccess?: (data: IMedia, variables: MediaCredentials, context: unknown) => void;
    onMutate?: (variables: MediaCredentials) => Promise<IMedia>;
}) => {
    return useMutation({
        mutationFn: (media: MediaCredentials) => uploadMedia(media),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
