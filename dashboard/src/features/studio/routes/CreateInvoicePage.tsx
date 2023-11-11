import Load from '@/components/common/Load';
import { EPermission } from '@/features/auth';
import { useAuthStore } from '@/store/authStore';
import { Suspense, useEffect, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, useMantineTheme } from '@mantine/core';
const CreateInvoice = lazy(() => import('@/features/invoices/componenents/CreateInvoice'));

export default function CreateInvoicePage() {
    const theme = useMantineTheme();
    const { accountType } = useAuthStore();
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (accountType?.permissions) {
            const permissions = accountType.permissions;
            if (
                permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ||
                permissions.includes(EPermission.VIEW_STUDIO_INVOICE)
            )
                setDisplay(true);
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
                    Tạo hóa đơn mới
                </Text>
                <Suspense fallback={<Load />}>
                    <CreateInvoice />
                </Suspense>
            </div>
        )
    );
}
