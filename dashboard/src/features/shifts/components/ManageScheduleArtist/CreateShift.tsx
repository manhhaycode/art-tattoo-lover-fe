import { Button, Group, Modal, Text, rem } from '@mantine/core';
import { ICreateShiftReq, getShiftList, useCreateShiftMutation } from '@/features/shifts';
import toast from 'react-hot-toast';
import { convertDateToString } from '@/lib/helper';
import { EventImpl } from '@fullcalendar/core/internal';
import { useAuthStore } from '@/store/authStore';
import { ErrorCode, errorMsg } from '@/common/types/error';
export default function CreateShift({
    handleModal,
    shiftCreate,
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
    shiftCreate?: ICreateShiftReq;
}) {
    const { accountType } = useAuthStore();
    const createShiftMutation = useCreateShiftMutation({
        onSuccess: async (data) => {
            console.log(data);
            const shift = await getShiftList({
                start: shiftCreate!.start,
                end: shiftCreate!.end,
                studioId: accountType?.studioId || '',
            });
            // shiftInfo?.setProp('publicId', shift[0].id);
            shiftInfo!.setProp('id', shift[0].id);
            // shiftInfo!.setExtendedProp('id', shift[0].id);
            shiftInfo!.setExtendedProp('shiftArtists', shift[0].shiftArtists);
            shiftInfo!.setExtendedProp('studioId', shift[0].studioId);
            toast.success('Đăng ký lịch mới thành công');
        },
        onError: (e) => {
            const error = errorMsg[e.message as ErrorCode];
            if (error) {
                toast.error(error);
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
            }
        },
    });

    return (
        <Modal
            onClose={handleModal[1].close}
            opened={handleModal[0]}
            title={<Text className="text-sm font-semibold">Xác nhận tạo ca làm việc mới</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {shiftCreate && (
                <>
                    <Text className="text-sm font-semibold">
                        Thời gian làm việc từ {convertDateToString(new Date(shiftCreate.start))} -{' '}
                        {convertDateToString(new Date(shiftCreate.end))}
                    </Text>
                    <Group justify="flex-end" mt={rem(16)}>
                        <Button
                            onClick={() => {
                                createShiftMutation.mutate({
                                    start: shiftCreate.start,
                                    end: shiftCreate.end,
                                });
                                handleModal[1].close();
                            }}
                        >
                            Xác nhận
                        </Button>
                    </Group>
                </>
            )}
        </Modal>
    );
}
