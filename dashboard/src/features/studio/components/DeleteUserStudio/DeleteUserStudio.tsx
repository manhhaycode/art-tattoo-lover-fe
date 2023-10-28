import { Modal, Text, Group, Button, AspectRatio, Image, rem } from '@mantine/core';
import { Table } from '@tanstack/react-table';
import { IUserStudio, useDeleteUserStudioMutation } from '@/features/studio';
import { UserIcon } from '@/assets/icons';
import { toast } from 'react-toastify';
export default function DeleteUserStudio({
    table,
    opened,
    close,
    refreshData,
}: {
    table: Table<IUserStudio>;
    opened: boolean;
    close: () => void;
    refreshData: () => void;
}) {
    const deleteUserStudioMutation = useDeleteUserStudioMutation({
        onSuccess: () => {
            close();
            refreshData();
            toast('Xóa tài khoản thành công', { type: 'success' });
        },
        onError: () => {
            toast('Có lỗi xảy ra, vui lòng thử lại', { type: 'error' });
        },
    });

    return (
        <Modal
            opened={opened}
            onClose={close}
            centered
            title={<Text className="text-sm font-semibold">Xác nhận xóa tài khoản khỏi studio</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <Text className="text-sm font-medium">
                Bạn có chắc muốn xóa những tài khoản này khỏi studio không? Nhấn xác nhận để hoàn tất xóa tài khoản
            </Text>

            <Text className="text-sm font-semibold mt-4 mb-4">Danh sách tài khoản sẽ xóa</Text>
            <div className="flex flex-col gap-y-4">
                {table
                    .getRowModel()
                    .rows.filter((row) => row.getIsSelected())
                    .map((row) => {
                        return (
                            <Group wrap="nowrap" key={row.id}>
                                <AspectRatio
                                    miw={rem(36)}
                                    mih={rem(36)}
                                    className="rounded-full overflow-hidden relative"
                                >
                                    {row.original.user.avatar ? (
                                        <Image src={row.original.user.avatar} className="object-cover w-full h-full" />
                                    ) : (
                                        <div>
                                            <UserIcon styles={{ height: '24px', width: '24px' }} />
                                        </div>
                                    )}
                                </AspectRatio>
                                <Group gap={rem(8)}>
                                    <Text className="text-sm font-semibold w-full">{row.original.user.fullName}</Text>
                                    <Text className="text-sm font-semibold w-full">{row.original.user.email}</Text>
                                </Group>
                            </Group>
                        );
                    })}
            </div>

            <Group mt={rem(24)} justify="flex-end">
                <Button onClick={close} variant="outline" color="gray">
                    Hủy
                </Button>
                <Button
                    onClick={() => {
                        table
                            .getRowModel()
                            .rows.filter((row) => row.getIsSelected())
                            .map((row) => {
                                deleteUserStudioMutation.mutate(row.original.id);
                            });
                    }}
                    color="red.6"
                >
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
}
