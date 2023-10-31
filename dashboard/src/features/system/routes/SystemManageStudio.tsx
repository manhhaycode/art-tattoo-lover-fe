import { Suspense, lazy, useEffect } from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageStudios = lazy(() => import('@/features/system/components/ManageStudios'));
export default function SystemManageStudio() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.message) {
            toast(location.state.message, { type: 'error', theme: 'dark' });
            navigate('/system/manage-studios', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý thông tin studio
            </Text>
            <Suspense fallback={<div>Is loading...</div>}>
                <ManageStudios />
            </Suspense>
        </div>
    );
}
