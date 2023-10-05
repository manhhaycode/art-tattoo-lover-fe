import { createPortal } from 'react-dom';
import { useModalStore } from '@/store/componentStore';
import { Login, Register } from '@/features/auth/components';
export default function PortalModal({ idModal }: { idModal: string }) {
    const modal = document.getElementById(idModal);
    const { isLoginModalVisible, isRegisterModalVisible } = useModalStore();
    return (
        <>
            {isLoginModalVisible && createPortal(<Login />, modal!)}
            {isRegisterModalVisible && createPortal(<Register />, modal!)}
        </>
    );
}
