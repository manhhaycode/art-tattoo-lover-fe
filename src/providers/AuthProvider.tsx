import { useGetSessionMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isAuth, setAccountType, setIsAuth } = useAuthStore();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionMutation.mutate({});
        },
    });

    const sessionMutation = useGetSessionMutation(
        {
            onSuccess: (data) => {
                setAccountType({
                    role: { id: data.roleId, name: 'Member' },
                    permissions: [],
                    user: { id: data.userId, name: 'Mạnh Nguyễn' },
                });
                setIsAuth(true);
            },
        },
        1,
    );

    useEffect(() => {
        const rft = Cookies.get('tattus-rft');

        if (isAuth) {
            sessionMutation.mutate({});
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
