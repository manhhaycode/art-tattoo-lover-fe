import { useGetSessionMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { getRoleNameById } from '@/lib/helper';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setAccountType } = useAuthStore();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionUserMutation.mutate({});
        },
    });

    const sessionUserMutation = useGetSessionMutation({
        onSuccess: (data) => {
            setAccountType({
                role: { id: data.roleId, name: getRoleNameById(data.roleId) as string },
                permissions: data.permissions,
                studioId: data.studioId || sessionStorage.getItem('tattus-studioId') || undefined,
                user: { id: data.userId },
            });
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
