import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import SystemNav from './NavBar';

export default function SystemLayout() {
    return (
        <>
            <AppShell.Navbar p="md" className="flex flex-col justify-between">
                <SystemNav />
            </AppShell.Navbar>
            <AppShell.Main className="relative">
                <Outlet />
            </AppShell.Main>
        </>
    );
}
