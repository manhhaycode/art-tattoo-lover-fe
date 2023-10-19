import { useEffect } from 'react';
import { useGetUserMutation } from '../api';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
const useUserProfileManageState = () => {
    const { setAccountType, accountType, isChange, setIsChange } = useAuthStore();
    const getProfileMutation = useGetUserMutation({
        onSuccess: (data) => {
            setAccountType({ ...accountType, user: data });
            if (isChange) setIsChange(false);
        },
        onError: () => {
            if (Cookies.get('tattus-at')) {
                getProfileMutation.mutate({});
            }
        },
    });

    useEffect(() => {
        getProfileMutation.mutate({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isChange) getProfileMutation.mutate({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange]);

    return getProfileMutation;
};

export default useUserProfileManageState;
