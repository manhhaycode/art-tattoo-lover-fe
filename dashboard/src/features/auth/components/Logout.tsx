import { useAuthStore } from '@/store/authStore';
import { useLogoutMutation } from '../api';
import Cookies from 'js-cookie';
import { Button } from '@mantine/core';

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
            color="red.7"
            onClick={() => {
                const rft = Cookies.get('tattus-rft');
                if (rft) logoutMutation.mutate(rft);
                else {
                    reset();
                    if (onSuccess) onSuccess();
                }
            }}
            className="w-full min-h-max"
        >
            <p className="justify-self-center font-semibold text-base leading-none">Đăng xuất</p>
        </Button>
    );
}
