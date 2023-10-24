import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';
import { lazy, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const Modal = lazy(() => import('@/components/Modal'));
const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout() {
    const { isModalVisible, reset } = useModalStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (searchParams.get('login') === 'true') {
            toast('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại', { type: 'error', theme: 'dark' });
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
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
