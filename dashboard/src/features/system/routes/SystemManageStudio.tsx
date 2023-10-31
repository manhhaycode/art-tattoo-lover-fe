import { Suspense, lazy } from 'react';
import { Text, useMantineTheme } from '@mantine/core';

const ManageStudios = lazy(() => import('@/features/system/components/ManageStudios'));
export default function SystemManageStudio() {
    const theme = useMantineTheme();
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
