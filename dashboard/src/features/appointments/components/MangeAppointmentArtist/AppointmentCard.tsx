import { UserIcon } from '@/assets/icons';
import { IAppointmentStudio } from '@/features/appointments';
import { convertStartEndTimeToDisplayFormat } from '@/lib/helper';
import { AspectRatio, Box, Group, rem, Image, Text, Flex } from '@mantine/core';
import { AppointmentStatusTag } from '../ManageAppointment';

export default function AppointmentCard({
    appointment,
    handleClick,
}: {
    appointment: IAppointmentStudio;
    handleClick: (appointmentInfo: IAppointmentStudio) => void;
}) {
    return (
        <Box
            onClick={() => handleClick(appointment)}
            className="border border-stroke-gray rounded-md p-4 cursor-pointer"
        >
            <Group wrap="nowrap">
                <AspectRatio miw={rem(40)} mih={rem(40)} className="rounded-full overflow-hidden relative">
                    {appointment.user.avatar ? (
                        <Image src={appointment.user.avatar} className="object-cover w-full h-full" />
                    ) : (
                        <div>
                            <UserIcon styles={{ height: '24px', width: '24px' }} />
                        </div>
                    )}
                </AspectRatio>
                <Flex direction={'column'} gap={rem(8)} className="flex-1">
                    <Group gap={rem(16)} justify="space-between">
                        <Text className="text-sm font-semibold max-w-[60%] truncate">
                            Tên KH: {appointment.user.fullName}
                        </Text>
                        <Text className="text-sm font-semibold">
                            Ca:{' '}
                            {convertStartEndTimeToDisplayFormat(
                                new Date(appointment.shift.start + 'Z'),
                                new Date(appointment.shift.end + 'Z'),
                            )}
                        </Text>
                    </Group>
                    <Group gap={3} justify="space-between">
                        <Text className="text-sm font-semibold max-w-[60%] truncate">
                            Dịch vụ: {appointment.service?.name}
                        </Text>
                        <AppointmentStatusTag status={appointment.status} />
                    </Group>
                </Flex>
            </Group>
            <Text className="text-sm font-semibold w-full pt-3">{appointment.notes}</Text>
        </Box>
    );
}
