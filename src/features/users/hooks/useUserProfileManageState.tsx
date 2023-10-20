import { useEffect, useState } from 'react';
import { useGetUserMutation } from '../api';
import { useAuthStore } from '@/store/authStore';
import { ErrorAuth } from '@/lib/error';
const useUserProfileManageState = () => {
    const { setAccountType, accountType, isChange, setIsChange } = useAuthStore();
    const [onMount, setOnMount] = useState(false);
    const getProfileMutation = useGetUserMutation({
        onSuccess: (data) => {
            setAccountType({ ...accountType, user: data });
            if (isChange) setIsChange(false);
        },
        onError: (error) => {
            if (error.message === ErrorAuth.AT_INVALID) {
                getProfileMutation.mutate({});
            }
        },
    });

    useEffect(() => {
        if (accountType) {
            getProfileMutation.mutate({});
        }
        setOnMount(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isChange) getProfileMutation.mutate({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange]);

    return { ...getProfileMutation, accountType, onMount };
};

export default useUserProfileManageState;
