import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthenticationTitle } from '../components';
import { Suspense, lazy, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthenticationTitle = lazy(() => import('../components/AuthenticationTitle'));

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.message) {
            toast.error(location.state.message);
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
