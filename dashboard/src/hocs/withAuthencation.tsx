import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { reset } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const at = Cookies.get('tattus-at');
    const rf = Cookies.get('tattus-rft');

    useEffect(() => {
        if (!((rf && rf.length > 0) || (at && at.length > 0))) {
            reset();
            navigate('/login', {
                replace: true,
                state: { message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, at, rf]);

    return <>{(rf && rf.length > 0) || (at && at.length > 0) ? children : <></>}</>;
};

export default WithAuthencation;
