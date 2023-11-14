import { useQuery } from '@tanstack/react-query';
import { getAdminDashboard, getBookingDaily, getStudioPopular } from '../api';
import DashboardAdminStat from '../components/DashboardStat/DashboardAdminStat';
import { Grid, GridCol } from '@mantine/core';
import DashboardBookingDaily from '../components/DashboardBookingDaily/DashboardBookingDaily';
import DashboardAdminAchievement from '../components/DashboardAchievement/DashboardAdminAchievement';

const SystemDashboard = () => {
    const { data: statData, isLoading: statLoading } = useQuery(['admin-dashboard'], async () => {
        const res = getAdminDashboard();

        return res;
    });

    const { data: bookingDailyData, isLoading: bookingDailyLoading } = useQuery(['booking-daily'], async () => {
        const res = getBookingDaily();

        return res;
    });

    const { data: mostPopularStudio, isLoading: mostPopularStudioLoading } = useQuery(
        ['most-popular-studio'],
        async () => {
            const res = getStudioPopular();

            return res;
        },
    );

    return (
        <div>
            <DashboardAdminStat data={statData} isLoading={statLoading} />
            <Grid className="mt-4">
                <GridCol span={8}>
                    <DashboardBookingDaily data={bookingDailyData} isLoading={bookingDailyLoading} />
                </GridCol>
                <GridCol span={4}>
                    <DashboardAdminAchievement
                        popularStudioData={mostPopularStudio}
                        testimonialData={statData?.testimonialData}
                        isLoading={statLoading || mostPopularStudioLoading}
                    />
                </GridCol>
            </Grid>
        </div>
    );
};

export default SystemDashboard;
