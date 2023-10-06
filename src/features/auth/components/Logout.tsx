import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useLogoutMutation } from '../api';
import Cookies from 'js-cookie';

export default function Logout({ onSuccess }: { onSuccess?: () => void }) {
    const { reset } = useAuthStore();
    const logoutMutation = useLogoutMutation({
        onSuccess: () => {
            reset();
            if (onSuccess) onSuccess();
        },
        onError: () => {
            alert('Đăng xuất thất bại, vui lòng thử lại sau');
        },
    });
    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => {
                const rft = Cookies.get('tattus-rft');
                if (rft) logoutMutation.mutate(rft);
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit w-full "
        >
            <p className="justify-self-center font-semibold text-base leading-none">Đăng xuất</p>
        </motion.button>
    );
}
