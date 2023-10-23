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
    const at = Cookies.get('tattus-at');
    const rf = Cookies.get('tattus-rft');

    useEffect(() => {
        setTheme('dark');
        if (!((rf && rf.length > 0) || (at && at.length > 0))) {
            reset();
            navigate('/', { replace: true, state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' } });
        }
        return () => {
            setTheme('light');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, at, rf]);

    return <>{(rf && rf.length > 0) || (at && at.length > 0) ? children : <></>}</>;
};

export default WithAuthencation;
