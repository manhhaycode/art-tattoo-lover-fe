import { AspectRatio, Box, Button, Group, Image, Modal, Text, rem } from '@mantine/core';
import { useDeleteShiftMutation, useGetShiftDetail } from '@/features/shifts';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';
import toast from 'react-hot-toast';
import { UserIcon } from '@/assets/icons';
import { ErrorCode, errorMsg } from '@/common/types/error';

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
        onError: (e) => {
            const error = errorMsg[e.message as ErrorCode];
            if (error) {
                toast.error(error);
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
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
                    {data && data.shiftArtists.length > 0 ? (
                        <Text className="text-sm font-semibold">Các artist đã đăng ký ca này</Text>
                    ) : (
                        <Text className="text-sm font-semibold">Chưa có artist nào đăng ký ca này</Text>
                    )}
                    {data &&
                        data.shiftArtists.map((artist) => {
                            return (
                                <Group wrap="nowrap" key={data.id}>
                                    <AspectRatio
                                        miw={rem(36)}
                                        mih={rem(36)}
                                        className="rounded-full overflow-hidden relative"
                                    >
                                        {artist.stuUser.user.avatar ? (
                                            <Image
                                                src={artist.stuUser.user.avatar}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div>
                                                <UserIcon styles={{ height: '24px', width: '24px' }} />
                                            </div>
                                        )}
                                    </AspectRatio>
                                    <Group gap={rem(8)}>
                                        <Text className="text-sm font-semibold w-full">
                                            {artist.stuUser.user.fullName}
                                        </Text>
                                        <Text className="text-sm font-semibold w-full">
                                            {artist.stuUser.user.email}
                                        </Text>
                                    </Group>
                                </Group>
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
