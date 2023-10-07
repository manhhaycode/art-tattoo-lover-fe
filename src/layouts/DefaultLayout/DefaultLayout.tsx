import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';
import { lazy } from 'react';

const Modal = lazy(() => import('@/components/Modal'));
const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const { isModalVisible, reset } = useModalStore();

    return (
        <div className="bg-dark-theme h-[4000px]">
            <Header />
            {children}
            <Modal animate={isModalVisible} onClose={() => reset()} />
            <PortalModal idModal="main-modal" />
        </div>
    );
}
