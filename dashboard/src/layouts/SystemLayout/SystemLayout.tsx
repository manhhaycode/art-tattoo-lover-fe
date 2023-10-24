import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export default function SystemLayout() {
    return (
        <>
            <AppShell.Navbar p="md">Đây là nav</AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </>
    );
}
