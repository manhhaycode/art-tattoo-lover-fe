import Load from '@/components/common/Load';
import { EPermission } from '@/features/auth';
import { useAuthStore } from '@/store/authStore';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ScheduleWorking = lazy(() => import('@/features/shifts/components/ManageScheduleArtist'));

export default function ManageScheduleArtistPage() {
    const { accountType } = useAuthStore();
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (accountType?.permissions) {
            const permissions = accountType.permissions;
            if (
                permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ||
                permissions.includes(EPermission.VIEW_STUDIO_ARTISTS_SCHEDULE)
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
            <div className="flex flex-col gap-y-4">
                <Suspense fallback={<Load />}>
                    <ScheduleWorking />
                </Suspense>
            </div>
        )
    );
}
