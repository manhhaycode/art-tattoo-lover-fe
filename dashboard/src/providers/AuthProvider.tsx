import { useGetSessionMutation, useRefreshTokenMutation } from '@/features/auth/api';
import { getRoleNameById } from '@/lib/helper';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setAccountType, reset } = useAuthStore();
    const navigate = useNavigate();
    const refreshTokenMutation = useRefreshTokenMutation({
        onSuccess: () => {
            sessionUserMutation.mutate({});
        },
        onError: () => {
            reset();
            navigate('/login', {
                replace: true,
                state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' },
            });
        },
    });

    const sessionUserMutation = useGetSessionMutation({
        onSuccess: (data) => {
            if (data.status !== 1) {
                reset();
                navigate('/login', {
                    replace: true,
                    state: { message: 'Tài khoản của bạn đã bị khóa, hoặc chưa kích hoạt' },
                });
                return;
            }
            setAccountType({
                role: { id: data.roleId, name: getRoleNameById(data.roleId) as string },
                permissions: data.permissions,
                studioId: data.studioId || sessionStorage.getItem('tattus-studio') || undefined,
                user: { id: data.userId },
                status: data.status,
            });
        },
        onError: () => {
            if (Cookies.get('tattus-at')) {
                sessionUserMutation.mutate({});
            } else {
                navigate('/login', {
                    replace: true,
                    state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' },
                });
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
