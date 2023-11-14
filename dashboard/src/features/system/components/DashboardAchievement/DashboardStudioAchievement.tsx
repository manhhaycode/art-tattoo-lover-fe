import { Center, Group, Paper, RingProgress, rem, Text, Skeleton, Avatar } from '@mantine/core';
import { IMostPopularArtist, ITestimonialAdminDashboard } from '../../types';
import { IconCalendar, IconCoin, IconStarFilled } from '@tabler/icons-react';
import { numbertoPrice } from '@/lib/helper';
import defaultAva from '@/assets/img/default-ava.png';

interface Props {
    testimonialData?: ITestimonialAdminDashboard;
    isLoading: boolean;
    popularArtistData?: IMostPopularArtist;
}

const DashboardStudioAchievement = ({ testimonialData, isLoading, popularArtistData }: Props) => {
    if (isLoading) return <Skeleton height={400} radius={'md'} />;

    return (
        <div className="flex flex-col gap-3">
            {testimonialData && (
                <Paper withBorder radius="md" p="xs">
                    <Group>
                        <RingProgress
                            size={80}
                            roundCaps
                            thickness={8}
                            sections={[{ value: (testimonialData.avgTestimonial / 5) * 100, color: 'yellow' }]}
                            label={
                                <Center>
                                    <IconStarFilled
                                        style={{ width: rem(20), height: rem(20) }}
                                        stroke={1.5}
                                        className="text-yellow-400"
                                    />
                                </Center>
                            }
                        />

                        <div>
                            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                                Đánh giá trung bình
                            </Text>
                            <Text fw={700} size="xl" className="text-yellow-400">
                                {testimonialData?.avgTestimonial.toFixed(1)}
                            </Text>
                        </div>
                    </Group>
                </Paper>
            )}
            {popularArtistData && popularArtistData.artist && (
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                    <Text
                        ta="center"
                        fz="lg"
                        fw={700}
                        variant="gradient"
                        gradient={{ from: 'yellow', to: 'orange' }}
                        className="mb-4"
                    >
                        Artist của tháng
                    </Text>
                    <Avatar
                        src={popularArtistData.artist.user.avatar || defaultAva}
                        size={120}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {popularArtistData.artist.user.fullName}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        {popularArtistData.artist.user.email} • Tattoo Artist
                    </Text>
                    <div className="flex flex-col gap-1 mt-2">
                        <div className="flex gap-1 items-center justify-center">
                            <IconCoin size={18} />
                            <Text className="text-sm">Doanh thu: {numbertoPrice(popularArtistData.totalRevenue)}</Text>
                        </div>
                        <div className="flex gap-1 items-center justify-center">
                            <IconCalendar size={18} />
                            <Text className="text-sm">Lịch hẹn: {popularArtistData.totalBooking}</Text>
                        </div>
                    </div>
                </Paper>
            )}
        </div>
    );
};

export default DashboardStudioAchievement;
