import Loading from '@/components/Loading';
import { Suspense, lazy } from 'react';

const BecomeStudioForm = lazy(() => import('@/features/studios/components/BecomeStudio'));

export default function BecomeStudio() {
    return (
        <div className="pb-32">
            <Suspense fallback={<Loading />}>
                <BecomeStudioForm />
            </Suspense>
        </div>
    );
}
