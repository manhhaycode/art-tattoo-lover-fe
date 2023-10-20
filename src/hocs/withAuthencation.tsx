import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/componentStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { reset } = useAuthStore();
    const { setTheme } = useThemeStore();
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
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (Cookies.get('tattus-at') && Cookies.get('tattus-at')!.length > 0) ||
        (Cookies.get('tattus-rft') && Cookies.get('tattus-rft')!.length > 0) ? (
        children
    ) : (
        <Navigate to="/?login=true" replace={true} />
    );
};

export default WithAuthencation;
