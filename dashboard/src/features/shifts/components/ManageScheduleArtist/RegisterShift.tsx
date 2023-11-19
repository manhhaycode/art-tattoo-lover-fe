import { AspectRatio, Box, Button, Group, Image, Loader, Modal, Text, rem } from '@mantine/core';
import { useGetShiftDetail, useRegisterShiftMutation } from '@/features/shifts';
import toast from 'react-hot-toast';
import queryClient from '@/lib/react-query';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';
import { UserIcon } from '@/assets/icons';
import { ErrorCode, errorMsg } from '@/common/types/error';

export default function RegisterShift({
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
    const registerShiftMutation = useRegisterShiftMutation({
        onSuccess: () => {
            toast.success('Đăng ký ca làm việc thành công');
            handleModal[1].close();
            queryClient.invalidateQueries(['shifts']);
            queryClient.invalidateQueries(['shift', shiftInfo ? shiftInfo._def.publicId : '']);
            queryClient.invalidateQueries(['shiftsArtist']);
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
            onClose={handleModal[1].close}
            opened={handleModal[0]}
            title={<Text className="text-sm font-semibold">Đăng ký ca làm việc</Text>}
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
                    {data ? (
                        data.shiftArtists.length > 0 ? (
                            <Text className="text-sm font-semibold">Các artist đã đăng ký ca này</Text>
                        ) : (
                            <Text className="text-sm font-semibold">Chưa có artist nào đăng ký ca này</Text>
                        )
                    ) : (
                        <div className="h-full w-full flex items-center justify-center">
                            <Loader size={'sm'} />
                        </div>
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
                    {!shiftInfo.backgroundColor && (
                        <Group justify="flex-end" mt={rem(16)}>
                            <Button
                                disabled={registerShiftMutation.isLoading}
                                loading={registerShiftMutation.isLoading}
                                onClick={() => registerShiftMutation.mutate(shiftInfo._def.publicId)}
                            >
                                Đăng ký
                            </Button>
                        </Group>
                    )}
                </Box>
            )}
        </Modal>
    );
}
