// An code phần này muốn đổi gì thì đổi
import Loading from '@/components/Loading';
import { lazy } from 'react';

const BecomeStudioForm = lazy(() => import('@/features/studios/components/BecomeStudio'));
import { Suspense } from 'react';

export default function BecomeStudio() {
    return (
        <Suspense fallback={<Loading />}>
            <BecomeStudioForm />
        </Suspense>
    );
}
