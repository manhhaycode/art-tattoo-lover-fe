import Load from '@/components/common/Load';
import { EPermission } from '@/features/auth';
import { useAuthStore } from '@/store/authStore';
import { Suspense, useEffect, useState, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, useMantineTheme } from '@mantine/core';
const ViewInvoice = lazy(() => import('@/features/invoices/componenents/ViewInvoice'));

export default function ManageInvoicePage() {
    const theme = useMantineTheme();
    const { accountType } = useAuthStore();
    const [display, setDisplay] = useState(false);
    const { invoiceId } = useParams();
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

    useEffect(() => {
        if (!invoiceId) {
            navigate('/studio/manage-invoice');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceId]);

    return (
        display && (
            <div className="flex flex-col gap-y-5">
                <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                    Xem chi tiết hóa đơn
                </Text>
                <Suspense fallback={<Load />}>{invoiceId && <ViewInvoice invoiceId={invoiceId} />}</Suspense>
            </div>
        )
    );
}
