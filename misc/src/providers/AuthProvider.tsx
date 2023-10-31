import { useGetSessionUserMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { resetAuthStore } from '@/lib/helper';
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
            if (data.user.status === 1) {
                setAccountType({
                    role: { id: data.user.roleId, name: 'Member' },
                    permissions: [],
                    user: data.user,
                });
                setIsAuth(true);
                reset();
            } else resetAuthStore();
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
