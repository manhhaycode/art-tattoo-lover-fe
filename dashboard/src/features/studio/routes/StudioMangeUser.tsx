import { Text, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';

const ManageStaffStudio = lazy(() => import('@/features/studio/components/ManageStaffStudio/ManageStaffStudio'));

export default function StudioMangeUser() {
    const theme = useMantineTheme();
    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý thông tin studio
            </Text>
            <Suspense fallback={<div>Is loading...</div>}>
                <ManageStaffStudio />
            </Suspense>
        </div>
    );
}
