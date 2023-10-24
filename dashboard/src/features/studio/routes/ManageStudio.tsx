import BasicInfoForm from '../components/BasicInfoForm';
import { Text, useMantineTheme } from '@mantine/core';

export default function ManageStudio() {
    const theme = useMantineTheme();

    return (
        <div className="flex flex-col gap-y-5">
            <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                Quản lý thông tin studio
            </Text>
            <BasicInfoForm />
        </div>
    );
}
