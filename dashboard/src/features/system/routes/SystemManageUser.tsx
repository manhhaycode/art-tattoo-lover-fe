import { Text, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';

const ManageUser = lazy(() => import('@/features/system/components/ManageUser'));

export default function SystemManageUser() {
    const theme = useMantineTheme();
    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý thông tin người dùng
            </Text>
            <Suspense fallback={<div>Is loading...</div>}>
                <ManageUser />
            </Suspense>
        </div>
    );
}
