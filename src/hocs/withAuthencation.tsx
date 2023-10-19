import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/componentStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { isLogout } = useAuthStore();
    const { setTheme } = useThemeStore();
    useEffect(() => {
        setTheme('dark');
        if (!(Cookies.get('tattus-rft') || Cookies.get('tattus-at')) && !isLogout) {
            toast('Vui lòng đăng nhập để tiếp tục', { type: 'error', theme: 'dark' });
        }
        return () => {
            setTheme('light');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogout]);

    return Cookies.get('tattus-rft') || Cookies.get('tattus-at') ? children : <Navigate to="/" replace={true} />;
};

export default WithAuthencation;
