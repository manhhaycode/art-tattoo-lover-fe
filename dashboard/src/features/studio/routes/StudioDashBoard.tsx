import { getBookingDaily, getStudioDashboard, getStudioPopularArtist } from '@/features/system';
import DashboardStudioAchievement from '@/features/system/components/DashboardAchievement/DashboardStudioAchievement';
import DashboardBookingDaily from '@/features/system/components/DashboardBookingDaily/DashboardBookingDaily';
import DashboardStudioStat from '@/features/system/components/DashboardStat/DashboardStudioStat';
import { useAuthStore } from '@/store/authStore';
import { Grid, GridCol } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

export default function StudioDashBoard() {
    const { accountType } = useAuthStore();
    const studioId = accountType?.studioId;

    const { data: statData, isLoading: statLoading } = useQuery(['studio-dashboard', studioId], async () => {
        if (!studioId) {
            return;
        }
        const res = getStudioDashboard(studioId);

        return res;
    });

    const { data: bookingDailyData, isLoading: bookingDailyLoading } = useQuery(
        ['booking-daily', studioId],
        async () => {
            if (!studioId) {
                return;
            }
            const res = getBookingDaily(studioId);

            return res;
        },
    );

    const { data: mostPopularArtist, isLoading: mostPopularArtistLoading } = useQuery(
        ['most-popular-artist', studioId],
        async () => {
            if (!studioId) {
                return;
            }
            const res = getStudioPopularArtist(studioId);

            return res;
        },
    );

    return (
        <div>
            <DashboardStudioStat data={statData} isLoading={statLoading} />
            <Grid className="mt-4">
                <GridCol span={8}>
                    <DashboardBookingDaily data={bookingDailyData} isLoading={bookingDailyLoading} />
                </GridCol>
                <GridCol span={4}>
                    <DashboardStudioAchievement
                        popularArtistData={mostPopularArtist}
                        testimonialData={statData?.testimonialData}
                        isLoading={statLoading || mostPopularArtistLoading}
                    />
                </GridCol>
            </Grid>
        </div>
    );
}
