import { Modal, Text, Group, Button, AspectRatio, Image, rem } from '@mantine/core';
import { toast } from 'react-hot-toast';
import { IService, useDeleteServiceMutation } from '@/features/services';
import { BiCategory } from 'react-icons/bi';
export default function DeleteService({
    dataList,
    handleModalState,
    refreshData,
}: {
    dataList: IService[];
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    refreshData: (idToast?: string, success?: boolean) => void;
}) {
    const deleteServiceMutation = useDeleteServiceMutation({
        // onSuccess: () => {
        //     close();
        //     refreshData();
        //     toast.success('Xóa dịch vụ thành công');
        // },
        // onError: () => {
        //     toast.error('Có lỗi xảy ra, vui lòng thử lại');
        // },
    });

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            centered
            title={<Text className="text-sm font-semibold">Xác nhận xóa dịch vụ khỏi studio</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <Text className="text-sm font-medium">
                Bạn có chắc muốn xóa những dịch vụ này khỏi studio không? Nhấn xác nhận để hoàn tất xóa dịch vụ
            </Text>

            <Text className="text-sm font-semibold mt-4 mb-4">Danh sách dịch vụ sẽ xóa</Text>
            <div className="flex flex-col gap-y-4">
                {dataList.map((data) => {
                    return (
                        <Group wrap="nowrap" key={data.id}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {data.thumbnail ? (
                                    <Image src={data.thumbnail} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <BiCategory size={24} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Group gap={rem(8)}>
                                <Text className="text-sm font-semibold w-full">Tên dịch vụ: {' ' + data.name}</Text>
                                <Text className="text-sm font-semibold w-full">
                                    Loại dịch vụ: {' ' + data.category.name}
                                </Text>
                            </Group>
                        </Group>
                    );
                })}
            </div>

            <Group mt={rem(24)} justify="flex-end">
                <Button onClick={handleModalState[1].close} variant="outline" color="gray">
                    Hủy
                </Button>
                <Button
                    loading={deleteServiceMutation.isLoading}
                    onClick={async () => {
                        const callAPI = async (promiseList: unknown[]) => {
                            const id = toast.loading('Đang cập nhật...');
                            await Promise.all(promiseList)
                                .then(() => refreshData(id, true))
                                .catch(() => refreshData(id, false));
                            handleModalState[1].close();
                        };
                        const promiseList: unknown[] = [];
                        dataList.map((service) => {
                            promiseList.push(
                                new Promise((resolve, reject) =>
                                    deleteServiceMutation.mutateAsync(service.id).then(resolve).catch(reject),
                                ),
                            );
                        });
                        callAPI(promiseList);
                    }}
                    color="red.6"
                >
                    Xác nhận
                </Button>
            </Group>
        </Modal>
    );
}
