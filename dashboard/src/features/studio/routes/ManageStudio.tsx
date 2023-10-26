// import BasicInfoForm from '../components/BasicInfoForm';
import { Text, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';

const BasicInfoForm = lazy(() => import('../components/BasicInfoForm'));
export default function ManageStudio() {
    const theme = useMantineTheme();

    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý thông tin studio
            </Text>
            <Suspense fallback={<div>Is loading...</div>}>
                <BasicInfoForm />
            </Suspense>
        </div>
    );
}
