import { useGetSessionUserMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/componentStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setAccountType, setIsAuth } = useAuthStore();
    const { reset } = useModalStore();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionUserMutation.mutate({});
        },
    });

    const sessionUserMutation = useGetSessionUserMutation({
        onSuccess: (data) => {
            setAccountType({
                role: { id: data.user.roleId, name: 'Member' },
                permissions: [],
                user: { id: data.user.id, fullName: data.user.fullName },
            });
            setIsAuth(true);
            reset();
        },
        onError: () => {
            if (Cookies.get('tattus-at')) {
                sessionUserMutation.mutate({});
            }
        },
    });

    useEffect(() => {
        const rft = Cookies.get('tattus-rft');
        const at = Cookies.get('tattus-at');
        if (at) {
            sessionUserMutation.mutate({});
        } else {
            if (rft) {
                refreshTokenMutation.mutate({});
            } else {
                sessionStorage.removeItem('tattus-session');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}
