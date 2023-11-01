import { AppShell } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import { StudioNav } from '../components/NavBar';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { resetAuthStore } from '@/lib/helper';

export default function StudioLayout() {
    const { accountType, reset } = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (accountType && !accountType.studioId) {
            if (accountType.role!.id <= 2)
                navigate('/system/manage-studios', {
                    replace: true,
                    state: { message: 'Vui lòng chọn studio để chỉnh sửa trước' },
                });
            else {
                resetAuthStore();
                reset();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType?.studioId]);
    return (
        <>
            {accountType?.studioId && (
                <>
                    <AppShell.Navbar p="md" className="flex flex-col justify-between">
                        <StudioNav />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Outlet />
                    </AppShell.Main>
                </>
            )}
        </>
    );
}
