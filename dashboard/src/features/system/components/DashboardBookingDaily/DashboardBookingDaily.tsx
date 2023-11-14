import { IBookingDaily } from '../../types';
import { Group, Paper, Skeleton, Text, useComputedColorScheme } from '@mantine/core';

import ReactApexChart from 'react-apexcharts';

interface Props {
    data?: IBookingDaily[];
    isLoading: boolean;
}

const DashboardBookingDaily = ({ data, isLoading }: Props) => {
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    console.log(data);
    if (isLoading) {
        return <Skeleton height={400} radius={'md'} />;
    }

    return (
        <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
                <Text size="md" c="dimmed" className="font-semibold mb-4 ml-3">
                    Tổng số lượt đặt lịch 7 ngày gần nhất
                </Text>
            </Group>
            {data && (
                <ReactApexChart
                    options={{
                        chart: {
                            id: 'booking-daily',
                            toolbar: {
                                show: false,
                            },
                        },
                        xaxis: {
                            categories: data?.map((d) => d.date),
                            labels: {
                                style: {
                                    colors: computedColorScheme === 'dark' ? '#fff' : '#000', // This sets the color of the x-axis labels
                                },
                            },
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: computedColorScheme === 'dark' ? '#fff' : '#000', // This sets the color of the x-axis labels
                                },
                            },
                        },
                        stroke: {
                            width: 2,
                            curve: 'smooth',
                            dashArray: [0, 8], // This sets the line type to dashed
                        },
                        colors: [computedColorScheme === 'dark' ? '#ff3b5c' : '#3fc1fd'],
                        grid: {
                            borderColor: computedColorScheme === 'dark' ? '#333' : '#ddd',
                            strokeDashArray: 1,
                            xaxis: {
                                lines: {
                                    show: true,
                                },
                            },
                            yaxis: {
                                lines: {
                                    show: true,
                                },
                            },
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    }}
                    type="line"
                    series={[
                        {
                            name: 'Lượt đặt lịch',
                            data: data?.map((d) => d.times),
                        },
                    ]}
                    height={350}
                />
            )}
        </Paper>
    );
};

export default DashboardBookingDaily;
