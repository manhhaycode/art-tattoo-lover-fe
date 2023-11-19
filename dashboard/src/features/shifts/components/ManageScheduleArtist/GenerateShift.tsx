import { Button, Group, Input, Modal, Text, rem } from '@mantine/core';
import { useState } from 'react';
import { useGenerateShiftMutation } from '@/features/shifts';
import toast from 'react-hot-toast';
import queryClient from '@/lib/react-query';
import { ErrorCode, errorMsg } from '@/common/types/error';

export default function GenerateShift({
    handleModal,
}: {
    handleModal: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
}) {
    const generateShiftMutation = useGenerateShiftMutation({
        onSuccess: () => {
            toast.success('Tạo lịch thành công');
            queryClient.invalidateQueries(['shifts']);
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

    const [duration, setDuration] = useState('');

    return (
        <Modal
            onClose={handleModal[1].close}
            opened={handleModal[0]}
            title={<Text className="text-sm font-semibold">Tạo lịch dịch trên thời gian hoạt động</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <Input
                onChange={(e) => setDuration(e.currentTarget.value)}
                value={duration}
                placeholder="Nhập khoảng thời gian giữa các ca (dạng hh:mm)"
            />
            <Group justify="flex-end" mt={rem(16)}>
                <Button
                    type="submit"
                    onClick={() => {
                        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                        if (!duration)
                            return toast.error('Vui lòng nhập khoảng thời gian giữa các ca', { duration: 1000 });
                        if (duration.match(regex)) return generateShiftMutation.mutate(duration + ':00');
                        return toast.error('Vui lòng nhập đúng định dạng hh:mm', { duration: 1000 });
                    }}
                >
                    Tạo lịch
                </Button>
            </Group>
        </Modal>
    );
}
