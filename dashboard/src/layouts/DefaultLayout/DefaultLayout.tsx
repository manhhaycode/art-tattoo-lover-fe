// import { useModalStore } from '@/store/componentStore';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import WithAuthencation from '@/hocs/withAuthencation';
// const Modal = lazy(() => import('@/components/Modal'));
// const PortalModal = lazy(() => import('@/components/Portal/PortalModal'));

export default function DefaultLayout() {
    return (
        <WithAuthencation>
            <AppShell header={{ height: 80 }} padding={'md'} navbar={{ width: 320, breakpoint: 'sm' }}>
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <Outlet />
            </AppShell>
        </WithAuthencation>
    );
}
