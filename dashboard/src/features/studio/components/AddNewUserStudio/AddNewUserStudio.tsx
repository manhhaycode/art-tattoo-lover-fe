import { Button, Group, Input, Modal, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUserStudioMutation } from '@/features/studio';
import { ICreateUserStudioReq } from '@/features/studio';
import { toast } from 'react-hot-toast';
import { roleMap } from '@/features/auth';
import { useAuthStore } from '@/store/authStore';
import { ErrorCode, errorMsg } from '@/common/types/error';

export default function AddNewUserStudio({ refreshData }: { refreshData: () => void }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { accountType } = useAuthStore();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
        reset,
        trigger,
    } = useForm<ICreateUserStudioReq>({ mode: 'onBlur', defaultValues: { studioId: accountType?.studioId } });
    const createUserStudioMutation = useCreateUserStudioMutation({
        onSuccess: () => {
            close();
            toast.success('Thêm tài khoản thành công');
            refreshData();
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

    const onSubmit: SubmitHandler<ICreateUserStudioReq> = async (data) => {
        createUserStudioMutation.mutate(data);
    };
    return (
        <Group justify="end">
            <Button
                onClick={() => {
                    open();
                    reset();
                }}
            >
                Thêm tài khoản mới vào studio
            </Button>
            <Modal
                size={'lg'}
                opened={opened}
                onClose={close}
                centered
                title={<Text className="text-sm font-semibold">Thêm tài khoản mới vào studio</Text>}
                overlayProps={{
                    backgroundOpacity: 0.7,
                    blur: 2,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Địa chỉ Email</label>
                            <Input
                                placeholder="Nhập địa chỉ email"
                                className="w-full"
                                {...register('email', {
                                    pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: 'Sai định dạng email',
                                    },
                                    required: 'Email không được để trống',
                                    onChange: () => {
                                        trigger('email');
                                    },
                                })}
                            />
                            {errors.email && (
                                <label className="text-xs font-semibold text-red-500">{errors.email.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Vai trò trong studio</label>
                            <Select
                                {...register('roleId', {
                                    required: 'Vai trò không được để trống',
                                })}
                                placeholder="Chọn vai trò trong studio"
                                onChange={(e) => {
                                    setValue('roleId', Number(e), { shouldValidate: true });
                                }}
                                data={Object.entries(roleMap)
                                    .filter((role) => {
                                        return (
                                            Number(role[0]) >= (accountType?.role?.id || 3) &&
                                            Number(role[0]) < 6 &&
                                            Number(role[0]) >= 3
                                        );
                                    })
                                    .map(([key, value]) => ({ value: key, label: value }))}
                                rightSectionProps={{ className: 'hidden' }}
                                className="text-sm font-semibold"
                                allowDeselect={false}
                                classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                                withCheckIcon={false}
                            />
                            {errors.roleId && (
                                <label className="text-xs font-semibold text-red-500">{errors.roleId.message}</label>
                            )}
                        </div>
                        <Button
                            disabled={!isValid || !isDirty || createUserStudioMutation.isLoading}
                            loading={createUserStudioMutation.isLoading}
                            type="submit"
                            className="max-w-fit"
                        >
                            Thêm
                        </Button>
                    </div>
                </form>
            </Modal>
        </Group>
    );
}
