import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
    const { accountType } = useAuthStore();

    return accountType || Cookies.get('tattus-rft') || Cookies.get('tattus-at') ? (
        children
    ) : (
        <Navigate to="/" relative="route" replace />
    );
};

export default WithAuthencation;
