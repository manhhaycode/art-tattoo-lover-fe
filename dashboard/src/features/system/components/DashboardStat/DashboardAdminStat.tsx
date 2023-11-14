import { IAdminDashboard } from '../../types';

import { Group, Paper, Text, SimpleGrid, Skeleton } from '@mantine/core';
import {
    IconArrowUpRight,
    IconArrowDownRight,
    IconUserPlus,
    IconBuildingStore,
    IconCalendarEvent,
} from '@tabler/icons-react';
import { useMemo } from 'react';

interface Props {
    data?: IAdminDashboard;
    isLoading: boolean;
}

const DashboardAdminStat = ({ data, isLoading }: Props) => {
    const statData = useMemo(() => {
        if (!data) {
            return [];
        }
        return [
            {
                title: 'Người dùng mới',
                value: data.userData.totalUserThisMonth,
                diff: data.userData.totalUserThisMonth / data.userData.totalUserLastMonth,
                icon: IconUserPlus,
            },
            {
                title: 'Studio mới',
                value: data.studioData.totalStudioThisMonth,
                diff: data.studioData.totalStudioThisMonth / data.studioData.totalStudioLastMonth,
                icon: IconBuildingStore,
            },
            {
                title: 'Lượt đặt lịch',
                value: data.bookingData.totalBookingThisMonth,
                diff: data.bookingData.totalBookingThisMonth / data.bookingData.totalBookingLastMonth,
                icon: IconCalendarEvent,
            },
        ];
    }, [data]);

    if (isLoading) {
        return (
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Skeleton height={140} radius="md" />
                <Skeleton height={140} radius="md" />
                <Skeleton height={140} radius="md" />
            </SimpleGrid>
        );
    }

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                {statData.map((stat) => {
                    const Icon = stat.icon;
                    const DiffIcon = stat.diff > 1 ? IconArrowUpRight : IconArrowDownRight;

                    return (
                        <Paper withBorder p="md" radius="md" key={stat.title}>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed" className="font-bold">
                                    {stat.title}
                                </Text>
                                <Icon size="1.4rem" stroke={1.5} />
                            </Group>

                            <Group align="flex-end" gap="xs" mt={25}>
                                <Text className="text-2xl font-bold">{stat.value}</Text>
                                <Text
                                    c={stat.diff > 1 ? 'teal' : 'red'}
                                    fz="sm"
                                    fw={500}
                                    className="flex gap-2 items-center"
                                >
                                    <span>
                                        {(stat.diff > 1 ? (stat.diff - 1) * 100 : (1 - stat.diff) * 100).toFixed(2)}%
                                    </span>
                                    <DiffIcon size="1rem" stroke={1.5} />
                                </Text>
                            </Group>

                            <Text fz="xs" c="dimmed" mt={7}>
                                Compared to previous month
                            </Text>
                        </Paper>
                    );
                })}
            </SimpleGrid>
        </>
    );
};

export default DashboardAdminStat;
