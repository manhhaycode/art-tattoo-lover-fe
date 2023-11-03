import { Box, Button, Flex, Group, Modal, Text, rem } from '@mantine/core';
import { IShiftUser, useDeleteShiftMutation, useGetShiftDetail } from '@/features/shifts';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';
import toast from 'react-hot-toast';

export default function ManageShiftInfo({
    handleModal,
    shiftInfo,
    isDelete,
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
    isDelete: boolean;
}) {
    const { data } = useGetShiftDetail(shiftInfo ? shiftInfo._def.publicId : '');
    const deleteShiftMutation = useDeleteShiftMutation({
        onSuccess: () => {
            toast.success('Xóa ca làm việc thành công');
            shiftInfo!.remove();
            handleModal[1].close();
        },
        onError: (error) => {
            toast.error(error.message);
            handleModal[1].close();
        },
    });

    return (
        <Modal
            size={'lg'}
            onClose={handleModal[1].close}
            opened={handleModal[0]}
            title={
                <Text className="text-sm font-semibold">
                    {isDelete ? 'Xác nhận xóa ca làm việc' : 'Thông tin chi tiết ca làm việc'}
                </Text>
            }
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {shiftInfo && (
                <Box className="flex flex-col gap-y-5">
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
                                <Flex direction={'column'} key={shiftUser.stuUserId} gap={12}>
                                    {/* <AvartarIcon logo={user.avatar || undefined} fullName={user.fullName} />
                                    <Text>{user.fullName}</Text> */}
                                    <Text className="text-sm font-semibold">{shiftUser.stuUserId}</Text>
                                </Flex>
                            );
                        })}
                    {isDelete && (
                        <>
                            <Text className="text-sm font-semibold">
                                Bạn có chắc chắn muốn xóa ca làm việc này? Hành động này không thể hoàn tác
                            </Text>
                            <Group justify="flex-end" mt={rem(16)}>
                                <Button
                                    onClick={() => {
                                        deleteShiftMutation.mutate(shiftInfo._def.publicId);
                                        handleModal[1].close();
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Group>
                        </>
                    )}
                </Box>
            )}
        </Modal>
    );
}
