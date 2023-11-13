import Loading from '@/components/Loading';
import { Suspense, lazy } from 'react';

const ManageInvoice = lazy(() => import('@/features/invoices/components/Invoice'));

export default function UserHistoryPage() {
    return (
        <div className="px-6 py-4 w-full">
            <h1 className="font-semibold text-2xl">Lịch sử và hóa đơn xăm tại studio</h1>
            <Suspense fallback={<Loading />}>
                <ManageInvoice />
            </Suspense>
        </div>
    );
}
