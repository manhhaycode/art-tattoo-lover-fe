import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Modal = lazy(() => import('@/components/Modal'));
const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout() {
    const { isModalVisible, reset } = useModalStore();

    return (
        <div className="bg-dark-theme min-h-screen">
            <Header />
            <main>
                <Outlet />
            </main>
            <Modal animate={isModalVisible} onClose={() => reset()} />
            <PortalModal idModal="main-modal" />
        </div>
    );
}
