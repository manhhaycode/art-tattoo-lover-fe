import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { StudioNav } from '../components/NavBar';

export default function StudioLayout() {
    return (
        <>
            <AppShell.Navbar p="md" className="flex flex-col justify-between">
                <StudioNav />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </>
    );
}
