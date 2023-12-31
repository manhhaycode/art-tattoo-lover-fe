import { useAuthStore } from '@/store/authStore';
import { useLogoutMutation } from '../api';
import Cookies from 'js-cookie';
import Button from '@/components/common/Button';

export default function Logout({ onSuccess }: { onSuccess?: () => void }) {
    const { reset } = useAuthStore();
    const logoutMutation = useLogoutMutation({
        onSuccess: () => {
            reset();
            if (onSuccess) onSuccess();
        },
        onError: () => {
            reset();
            if (onSuccess) onSuccess();
        },
    });
    return (
        <Button
            isAnimate={true}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
                const rft = Cookies.get('tattus-rft');
                if (rft) logoutMutation.mutate(rft);
                else {
                    reset();
                    if (onSuccess) onSuccess();
                }
            }}
            className="w-full"
        >
            <p className="justify-self-center font-semibold text-base leading-none">Đăng xuất</p>
        </Button>
    );
}
