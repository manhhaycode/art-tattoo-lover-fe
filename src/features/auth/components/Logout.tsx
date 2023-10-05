import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

export default function Logout({ onSuccess }: { onSuccess?: () => void }) {
    const { reset } = useAuthStore();
    return (
        <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => {
                reset();

                if (onSuccess) onSuccess();
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit w-full "
        >
            <p className="justify-self-center font-semibold text-base leading-none">Đăng xuất</p>
        </motion.button>
    );
}
