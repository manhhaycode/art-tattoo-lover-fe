import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/componentStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { reset } = useAuthStore();
    const { setTheme } = useThemeStore();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setTheme('dark');
        return () => {
            setTheme('light');
            if (
                !(
                    (Cookies.get('tattus-at') && Cookies.get('tattus-at')!.length > 0) ||
                    (Cookies.get('tattus-rft') && Cookies.get('tattus-rft')!.length > 0)
                )
            ) {
                reset();
                navigate('/', { state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' } });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        (Cookies.get('tattus-at') && Cookies.get('tattus-at')!.length > 0) ||
        (Cookies.get('tattus-rft') && Cookies.get('tattus-rft')!.length > 0 ? children : <></>)
    );
};

export default WithAuthencation;
