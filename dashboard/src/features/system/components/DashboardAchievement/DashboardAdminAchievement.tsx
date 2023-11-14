import { Center, Group, Paper, RingProgress, rem, Text, Skeleton, Badge, Card } from '@mantine/core';
import { IMostPopularStudio, ITestimonialAdminDashboard } from '../../types';
import { IconCalendar, IconCoin, IconStarFilled } from '@tabler/icons-react';
import { numbertoPrice } from '@/lib/helper';

interface Props {
    testimonialData?: ITestimonialAdminDashboard;
    isLoading: boolean;
    popularStudioData?: IMostPopularStudio;
}

const DashboardAdminAchievement = ({ testimonialData, isLoading, popularStudioData }: Props) => {
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
            {popularStudioData && popularStudioData.studio && (
                <Card withBorder radius="md" className="relative">
                    <Card.Section>
                        <img
                            src={popularStudioData.studio.logo}
                            alt={'studio-popular'}
                            className="w-full aspect-video object-center object-cover mx-auto"
                        />
                    </Card.Section>

                    <Badge
                        variant="gradient"
                        gradient={{ from: 'yellow', to: 'red' }}
                        className="absolute top-3 right-3"
                    >
                        Studio nổi bật
                    </Badge>

                    <div className="flex justify-between items-center">
                        <Text fw={600} component="h4" className="my-3">
                            {popularStudioData.studio.name}
                        </Text>

                        <div className="flex gap-1 item-center text-yellow-400">
                            <IconStarFilled size={18} />
                            <Text className="text-sm">{popularStudioData.studio.rating.toFixed(1)}</Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <IconCoin size={18} />
                            <Text className="text-sm">
                                Tổng doanh thu: {numbertoPrice(popularStudioData.totalRevenue)}
                            </Text>
                        </div>
                        <div className="flex gap-1 items-center">
                            <IconCalendar size={18} />
                            <Text className="text-sm">Tổng số lịch hẹn: {popularStudioData.totalBooking}</Text>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DashboardAdminAchievement;
