import { AspectRatio, Badge, Group, Image, Modal, Rating, Text, rem } from '@mantine/core';
import { IAppointmentStudio } from '@/features/appointments';
import { UserIcon } from '@/assets/icons';
import { convertStartEndTimeToDisplayFormat } from '@/lib/helper';
import AppointmentStatusTag from './AppointmentStatus';

export default function ViewAppointment({
    handleModalState,
    apointmentInfo,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    apointmentInfo?: IAppointmentStudio;
}) {
    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'lg'}
            title={<Text className="text-sm font-semibold">Thông tin lịch hẹn</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {apointmentInfo && (
                <>
                    <div className="flex flex-col gap-y-3 mb-6">
                        <Text className="text-sm font-semibold w-full">Thông tin khách hàng</Text>
                        <Group wrap="nowrap" key={apointmentInfo.id}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {apointmentInfo.user.avatar ? (
                                    <Image src={apointmentInfo.user.avatar} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Group gap={rem(8)}>
                                <Group gap={rem(8)}>
                                    <Text className="text-sm font-semibold">{apointmentInfo.user.fullName}</Text>
                                    <Text className="text-sm font-semibold">{apointmentInfo.user.phone}</Text>
                                </Group>
                                <Text className="text-sm font-semibold w-full">
                                    Ca {''}
                                    {convertStartEndTimeToDisplayFormat(
                                        new Date(apointmentInfo.shift.start + 'Z'),
                                        new Date(apointmentInfo.shift.end + 'Z'),
                                    )}
                                </Text>
                            </Group>
                        </Group>
                        <Text className="text-sm font-semibold w-full">Địa chỉ email: {apointmentInfo.user.email}</Text>
                        <Text className="text-sm font-semibold w-full">Số lần xăm tại studio: 0</Text>
                        <Text className="text-sm font-semibold w-full">
                            Ghi chú của khách hàng: {apointmentInfo.notes}
                        </Text>
                        <Group py={rem(4)} gap={rem(12)}>
                            <Text className="text-sm font-semibold">Dịch vụ xăm:</Text>
                            <Badge variant="light">{apointmentInfo.service?.name || 'Bất kỳ'}</Badge>
                        </Group>
                        <Group py={rem(4)} gap={rem(12)}>
                            <Text className="text-sm font-semibold">Trạng thái lịch hẹn:</Text>
                            <AppointmentStatusTag status={apointmentInfo.status} />
                        </Group>
                    </div>

                    <div className="flex flex-col gap-y-3 mb-4">
                        <Text className="text-sm font-semibold w-full">Thông tin artist</Text>
                        {apointmentInfo.artist ? (
                            <>
                                <Group wrap="nowrap">
                                    <AspectRatio
                                        miw={rem(36)}
                                        mih={rem(36)}
                                        className="rounded-full overflow-hidden relative"
                                    >
                                        {apointmentInfo.artist.user.avatar ? (
                                            <Image
                                                src={apointmentInfo.artist.user.avatar}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div>
                                                <UserIcon styles={{ height: '24px', width: '24px' }} />
                                            </div>
                                        )}
                                    </AspectRatio>
                                    <Group gap={rem(8)}>
                                        <Group gap={rem(8)}>
                                            <Text className="text-sm font-semibold">
                                                {apointmentInfo.artist.user.fullName}
                                            </Text>
                                            <Text className="text-sm font-semibold">
                                                {apointmentInfo.artist.user.phone}
                                            </Text>
                                        </Group>
                                        <Text className="text-sm font-semibold w-full">
                                            Ca {''}
                                            {convertStartEndTimeToDisplayFormat(
                                                new Date(apointmentInfo.shift.start + 'Z'),
                                                new Date(apointmentInfo.shift.end + 'Z'),
                                            )}
                                        </Text>
                                    </Group>
                                </Group>
                                <Text className="text-sm font-semibold w-full">
                                    Địa chỉ email: {apointmentInfo.artist.user.email}
                                </Text>
                                <Text className="text-sm font-semibold w-full">
                                    Số hình xăm hoàn thành tại studio: 0
                                </Text>
                                <Group py={rem(4)} gap={rem(12)}>
                                    <Text className="text-sm font-semibold">Tổng đánh giá:</Text>
                                    <Rating readOnly value={5} />
                                </Group>
                            </>
                        ) : (
                            <Text className="text-sm font-semibold w-full">Chưa có artist nhận lịch hẹn này</Text>
                        )}
                    </div>
                </>
            )}
        </Modal>
    );
}
