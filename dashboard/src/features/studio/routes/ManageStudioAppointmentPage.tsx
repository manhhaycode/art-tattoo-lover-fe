import { Text, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';

const ManageStudioAppointment = lazy(() => import('@/features/appointments/components/ManageAppointment'));
export default function ManageStudioAppointmentPage() {
    const theme = useMantineTheme();
    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý lịch hẹn xăm
            </Text>
            <Suspense fallback={<div>Is Loading...</div>}>
                <ManageStudioAppointment />
            </Suspense>
        </div>
    );
}
