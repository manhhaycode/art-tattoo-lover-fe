import { AspectRatio, Box, Group, Image, Modal, Text, rem } from '@mantine/core';
import { useGetShiftDetail } from '@/features/shifts';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';
import { UserIcon } from '@/assets/icons';

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
                </Box>
            )}
        </Modal>
    );
}
