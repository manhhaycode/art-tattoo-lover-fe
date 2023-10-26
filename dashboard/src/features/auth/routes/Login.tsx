import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationTitle } from '../components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.messsage) {
            toast(location.state.messsage, { type: 'error', theme: 'dark' });
            navigate('/login', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return <AuthenticationTitle />;
}
