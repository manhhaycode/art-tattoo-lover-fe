import Footer from '@/layouts/components/Footer';
import Header from '@/layouts/components/Header';
import { useModalStore } from '@/store/componentStore';
import { lazy, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Modal = lazy(() => import('@/components/Modal'));
const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout() {
    const { isModalVisible, reset } = useModalStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.message) {
            toast.error(location.state.message);
            location.state = undefined;
            navigate('/', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div className="bg-dark-theme min-h-screen">
            <Header />
            <main>
                <Outlet />
            </main>
            <Modal animate={isModalVisible} onClose={() => reset()} />
            <PortalModal idModal="main-modal" />
            <Footer />
        </div>
    );
}
