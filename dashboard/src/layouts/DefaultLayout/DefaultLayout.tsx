// import { useModalStore } from '@/store/componentStore';
import { AppShell } from '@mantine/core';
import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import WithAuthencation from '@/hocs/withAuthencation';
// const Modal = lazy(() => import('@/components/Modal'));
// const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout() {
    // const { isModalVisible, reset } = useModalStore();
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
        // <div className="bg-dark-theme min-h-screen">
        //     <Header />
        //     <div>Đây là header</div>
        //     <main>
        //         <Outlet />
        //     </main>
        //     <Modal animate={isModalVisible} onClose={() => reset()} />
        //     <PortalModal idModal="main-modal" />
        // </div>
        <WithAuthencation>
            <AppShell header={{ height: 80 }} padding={'md'} navbar={{ width: 300, breakpoint: 'sm' }}>
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <Outlet />
            </AppShell>
        </WithAuthencation>
    );
}
