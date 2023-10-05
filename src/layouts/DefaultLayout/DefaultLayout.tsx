import React, { lazy } from 'react';
// import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';

const Modal = lazy(() => import('@/components/Modal'));
const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));
const Header = lazy(() => import('@/layouts/components/Header'));

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
