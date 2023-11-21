import Load from '@/components/common/Load';
import { EPermission } from '@/features/auth';
import { useAuthStore } from '@/store/authStore';
import { Text, useMantineTheme } from '@mantine/core';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAppointmentArtist = lazy(() => import('@/features/appointments/components/MangeAppointmentArtist'));
export default function ManageAppointmentArtistPage() {
    const theme = useMantineTheme();
    const { accountType } = useAuthStore();
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (accountType?.permissions && accountType?.role) {
            const permissions = accountType.permissions;
            if (permissions.includes(EPermission.VIEW_STUDIO_BOOKING) && accountType.role.id === 5) setDisplay(true);
            else {
                setDisplay(false);
                navigate('/studio/dashboard');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType?.permissions]);
    return (
        display && (
            <div className="flex flex-col gap-y-5">
                <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                    Quản lý lịch hẹn xăm
                </Text>
                <Suspense fallback={<Load />}>
                    <ManageAppointmentArtist />
                </Suspense>
            </div>
        )
    );
}
