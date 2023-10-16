import { useGetSessionUserMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isAuth, setAccountType, setIsAuth } = useAuthStore();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionUserMutation.mutate({});
        },
    });

    const sessionUserMutation = useGetSessionUserMutation(
        {
            onSuccess: (data) => {
                setAccountType({
                    role: { id: data.user.roleId, name: 'Member' },
                    permissions: [],
                    user: { id: data.user.id, fullName: data.user.fullName },
                });
                setIsAuth(true);
            },
        },
        1,
    );

    useEffect(() => {
        const rft = Cookies.get('tattus-rft');

        if (isAuth) {
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
