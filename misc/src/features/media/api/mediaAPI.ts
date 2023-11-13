import * as httpRequest from '@/lib/axios';
import { IMediaCreate, MediaCredentials } from '../types';
import { useMutation } from '@tanstack/react-query';

const uploadMedia = async (media: MediaCredentials): Promise<IMediaCreate> => {
    try {
        const resMedia: IMediaCreate = await httpRequest.post('/media/upload', media, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return resMedia;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const useUploadMediaMutation = (handleFn: {
    onError?: (error: Error, variables: MediaCredentials, context: unknown) => void;
    onSuccess?: (data: IMediaCreate, variables: MediaCredentials, context: unknown) => void;
    onMutate?: (variables: MediaCredentials) => Promise<IMediaCreate>;
}) => {
    return useMutation({
        mutationFn: (media: MediaCredentials) => uploadMedia(media),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
