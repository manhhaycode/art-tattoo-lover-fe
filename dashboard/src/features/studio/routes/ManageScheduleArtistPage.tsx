import { Box } from '@mantine/core';
import { Suspense, lazy } from 'react';
const ScheduleWorking = lazy(() => import('@/features/shifts/components/ManageScheduleArtist'));
export default function ManageScheduleArtistPage() {
    return (
        <div className="flex flex-col gap-y-4">
            <Suspense fallback={<Box>Loading...</Box>}>
                <ScheduleWorking />
            </Suspense>
        </div>
    );
}
