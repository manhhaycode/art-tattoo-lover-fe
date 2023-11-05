import { AspectRatio, Button, Group, Image, Modal, Text, rem } from '@mantine/core';
import { IAppointmentStudio, useUpdateAppointmentMutation } from '@/features/appointments';
import { UserIcon } from '@/assets/icons';
import toast from 'react-hot-toast';
import { convertStartEndTimeToDisplayFormat } from '@/lib/helper';
import queryClient from '@/lib/react-query';

export default function CancelAppointment({
    handleModalState,
    appointmentList,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    appointmentList?: IAppointmentStudio[];
}) {
    const updateAppointmentMutation = useUpdateAppointmentMutation({
        onSuccess: () => {
            toast.success('Hủy lịch hẹn thành công');
            queryClient.invalidateQueries(['appointmentsStudio']);
            handleModalState[1].close();
        },
        onError: (error) => {
            toast.error('Hủy lịch hẹn thất bại');
            queryClient.invalidateQueries(['appointmentsStudio']);
            console.log(error);
        },
    });

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'lg'}
            title={<Text className="text-sm font-semibold">Xác nhận hủy lịch hẹn này</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {appointmentList && (
                <>
                    <Text className="text-sm font-medium">Bạn có chắc muốn hủy những lịch hẹn này không?</Text>

                    <Text className="text-sm font-semibold mt-4 mb-4">Danh sách các lịch hẹn sẽ hủy</Text>
                    <div className="flex flex-col gap-y-5">
                        {appointmentList.map((data) => {
                            return (
                                <Group wrap="nowrap" key={data.id}>
                                    <AspectRatio
                                        miw={rem(36)}
                                        mih={rem(36)}
                                        className="rounded-full overflow-hidden relative"
                                    >
                                        {data.user.avatar ? (
                                            <Image src={data.user.avatar} className="object-cover w-full h-full" />
                                        ) : (
                                            <div>
                                                <UserIcon styles={{ height: '24px', width: '24px' }} />
                                            </div>
                                        )}
                                    </AspectRatio>
                                    <Group gap={rem(8)}>
                                        <Group gap={rem(8)}>
                                            <Text className="text-sm font-semibold">{data.user.fullName}</Text>
                                            <Text className="text-sm font-semibold">{data.user.phone}</Text>
                                        </Group>
                                        <Text className="text-sm font-semibold w-full">
                                            Ca {''}
                                            {convertStartEndTimeToDisplayFormat(
                                                new Date(data.shift.start + 'Z'),
                                                new Date(data.shift.end + 'Z'),
                                            )}
                                        </Text>
                                    </Group>
                                </Group>
                            );
                        })}
                    </div>

                    <Group mt={rem(24)} justify="flex-end">
                        <Button onClick={handleModalState[1].close} variant="outline" color="gray">
                            Hủy
                        </Button>
                        <Button
                            loading={updateAppointmentMutation.isLoading}
                            onClick={() => {
                                appointmentList.map((appointment) => {
                                    updateAppointmentMutation.mutate({ id: appointment.id, status: 3 });
                                });
                            }}
                            color="red.6"
                        >
                            Xác nhận
                        </Button>
                    </Group>
                </>
            )}
        </Modal>
    );
}
