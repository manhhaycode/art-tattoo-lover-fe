import React from 'react';
import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';
import { Login, Register } from '@/components/Authentication';
import Modal from '@/components/Modal';
import { createPortal } from 'react-dom';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const { isModalVisible, isLoginModalVisible, isRegisterModalVisible, reset } = useModalStore();
    const modal = document.getElementById('main-modal');

    return (
        <div className="bg-dark-theme h-[4000px]">
            <Header />
            {children}
            <Modal animate={isModalVisible} onClose={() => reset()} />
            {isLoginModalVisible && modal && createPortal(<Login />, modal)}
            {isRegisterModalVisible && modal && createPortal(<Register />, modal)}
        </div>
    );
}
