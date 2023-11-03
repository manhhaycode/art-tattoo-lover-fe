import { Modal, Text, Group, Button, AspectRatio, Image, rem } from '@mantine/core';
import { UserIcon } from '@/assets/icons';
import { toast } from 'react-hot-toast';
import { useDeleteStudioMutation } from '@/features/system';
import { IStudio } from '@/features/studio';
export default function DeleteStudios({
    dataList,
    opened,
    close,
    refreshData,
}: {
    dataList: IStudio[];
    opened: boolean;
    close: () => void;
    refreshData: (id: string, success: boolean) => void;
}) {
    const deleteStudioMutation = useDeleteStudioMutation({});

    return (
        <Modal
            opened={opened}
            onClose={close}
            centered
            title={<Text className="text-sm font-semibold">Xác nhận xóa studio</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <Text className="text-sm font-medium">
                Bạn có chắc muốn xóa những studio này không? Nhấn xác nhận để hoàn tất xóa studio
            </Text>

            <Text className="text-sm font-semibold mt-4 mb-4">Danh sách studio sẽ xóa</Text>
            <div className="flex flex-col gap-y-4">
                {dataList.map((data) => {
                    return (
                        <Group wrap="nowrap" key={data.id}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {data.logo ? (
                                    <Image src={data.logo} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Group gap={rem(8)}>
                                <Text className="text-sm font-semibold w-full">{data.name}</Text>
                                <Text className="text-sm font-semibold w-full">{data.email}</Text>
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
                        const callAPI = async (promiseList: unknown[]) => {
                            const id = toast.loading('Đang cập nhật...');
                            await Promise.all(promiseList)
                                .then(() => refreshData(id, true))
                                .catch(() => refreshData(id, false));
                            close();
                        };

                        if (dataList.length > 0) {
                            const promiseList: unknown[] = [];
                            dataList.map((data) => {
                                promiseList.push(
                                    new Promise((resolve, reject) =>
                                        deleteStudioMutation.mutateAsync(data.id).then(resolve).catch(reject),
                                    ),
                                );
                            });
                            callAPI(promiseList);
                        }
                    }}
                    color="red.6"
                >
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
}
