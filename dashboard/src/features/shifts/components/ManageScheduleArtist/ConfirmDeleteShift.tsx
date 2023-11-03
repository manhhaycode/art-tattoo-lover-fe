import { Box, Modal, Text } from '@mantine/core';
import { IShiftUser, useGetShiftDetail } from '@/features/shifts';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';

export default function ManageShiftInfo({
    handleModal,
    shiftInfo,
}: {
    handleModal: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    shiftInfo?: EventImpl;
}) {
    const { data } = useGetShiftDetail(shiftInfo ? shiftInfo._def.publicId : '');

    return (
        <Modal
            size={'lg'}
            onClose={handleModal[1].close}
            opened={handleModal[0]}
            title={<Text className="text-sm font-semibold">Xác nhận xóa ca đăng ký</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {shiftInfo && (
                <Box className="flex flex-col gap-y-4">
                    <Text className="text-sm font-semibold">
                        Thời gian làm việc từ {convertDateToString(shiftInfo.start!)} -{' '}
                        {convertDateToString(shiftInfo.end!)}
                    </Text>
                    {data && data.shiftUsers.length > 0 ? (
                        <Text className="text-sm font-semibold">Các artist đã đăng ký ca này</Text>
                    ) : (
                        <Text className="text-sm font-semibold">Chưa có artist nào đăng ký ca này</Text>
                    )}
                    {data &&
                        data.shiftUsers.map((shiftUser: IShiftUser) => {
                            return (
                                // <Group key={user.id} gap={12}>
                                //     <AvartarIcon logo={user.avatar || undefined} fullName={user.fullName} />
                                //     <Text>{user.fullName}</Text>
                                // </Group>
                                <Text className="text-sm font-semibold" key={shiftUser.stuUserId}>
                                    {shiftUser.stuUserId}
                                </Text>
                            );
                        })}
                </Box>
            )}
        </Modal>
    );
}
