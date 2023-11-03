import { createPortal } from 'react-dom';
import { useModalStore } from '@/store/componentStore';
import { Login, Register, ResetPassword } from '@/features/auth/components';
import BookingModal from '@/features/studios/components/BookingModal';

export default function PortalModal({ idModal }: { idModal: string }) {
    const modal = document.getElementById(idModal);
    const { isLoginModalVisible, isRegisterModalVisible, isResetPasswordModalVisible, bookingModal } = useModalStore();
    return (
        <>
            {isLoginModalVisible && createPortal(<Login />, modal!)}
            {isRegisterModalVisible && createPortal(<Register />, modal!)}
            {isResetPasswordModalVisible && createPortal(<ResetPassword />, modal!)}
            {bookingModal.visible && bookingModal.studioId && createPortal(<BookingModal />, modal!)}
        </>
    );
}
