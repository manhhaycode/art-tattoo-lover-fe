import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthenticationTitle } from '../components';
import { Suspense, lazy, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthenticationTitle = lazy(() => import('../components/AuthenticationTitle'));

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.message) {
            toast(location.state.message, { type: 'error', theme: 'dark' });
            navigate('/login', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return (
        <Suspense fallback={<div></div>}>
            <AuthenticationTitle />
        </Suspense>
    );
}
