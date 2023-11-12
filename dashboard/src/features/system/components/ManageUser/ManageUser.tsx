import { EditIcon, UserIcon } from '@/assets/icons';
import { roleMap } from '@/features/auth';

import { Checkbox, Text, Group, AspectRatio, Image, rem, Button, Modal, Input } from '@mantine/core';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    PaginationState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import queryClient from '@/lib/react-query';
import { IUser } from '@/features/users';
import { useGetListUser, useUpdateUserMutation } from '@/features/system';
import TableForm, { SelectCell } from '@/components/TableForm';
import { toast } from 'react-hot-toast';
import BasicUserInfo from '../BasicUserInfo';
import { useAuthStore } from '@/store/authStore';

export default function ManageUser() {
    const editStateModal = useDisclosure(false);
    const createStateModal = useDisclosure(false);
    const { accountType } = useAuthStore();

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });

    const defaultData = useMemo(() => [], []);

    const dataQuery = useGetListUser({ page: pageIndex, pageSize, searchKeyword });
    const [dataUpdate, setDataUpdate] = useState<Partial<IUser> | null>(null);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const updateUserMutation = useUpdateUserMutation({});

    const columns = useMemo<ColumnDef<IUser>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => {
                    return (
                        <Checkbox
                            checked={table.getIsAllPageRowsSelected()}
                            indeterminate={table.getIsSomePageRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />
                    );
                },
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <Checkbox
                            disabled={accountType?.role?.id ? accountType.role.id > row.original.roleId : false}
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    );
                },
            },
            {
                accessorKey: 'fullName',
                header: 'Họ và tên',
                cell: ({ row }) => {
                    return (
                        <Group wrap="nowrap" maw={240}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {row.original.avatar ? (
                                    <Image src={row.original.avatar} className="object-cover w-full h-full" alt="" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold max-w-[150px]">{row.original.fullName}</Text>
                        </Group>
                    );
                },
            },
            {
                accessorKey: 'email',
                header: 'Địa chỉ Email',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold max-w-[240px] truncate">{row.original.email}</Text>;
                },
            },
            // {
            //     accessorKey: 'phone',
            //     header: 'Số điện thoại',
            //     cell: ({ row }) => {
            //         return <Text className="text-sm font-semibold">{row.original.phone}</Text>;
            //     },
            // },
            {
                accessorKey: 'roleId',
                header: 'Vai trò',
                cell: (cellContext) => {
                    return (
                        <SelectCell
                            disabled={
                                accountType?.role?.id ? accountType.role.id > cellContext.row.original.roleId : false
                            }
                            cellContext={cellContext}
                            data={Object.entries(roleMap).map(([key, value]) => ({ value: key, label: value }))}
                            onChange={(e, user) => {
                                if (e !== user.roleId.toString()) {
                                    setDataUpdate({ roleId: Number(e) });
                                }
                            }}
                            onClick={() => {
                                if (!cellContext.row.getIsSelected()) setRowSelection({ [cellContext.row.id]: true });
                            }}
                        />
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái',
                cell: (cellContext) => {
                    return (
                        <SelectCell
                            className="!max-w-[150px]"
                            disabled={
                                accountType?.role?.id ? accountType.role.id > cellContext.row.original.roleId : false
                            }
                            cellContext={cellContext}
                            data={[
                                {
                                    label: 'Chưa kích hoạt',
                                    value: '0',
                                },
                                {
                                    label: 'Đã Kích hoạt',
                                    value: '1',
                                },
                                {
                                    label: 'Vô hiệu hóa',
                                    value: '2',
                                },
                            ]}
                            onChange={(e, user) => {
                                if (e !== user.status.toString()) {
                                    setDataUpdate({ status: Number(e) });
                                }
                            }}
                            onClick={() => {
                                if (!cellContext.row.getIsSelected()) setRowSelection({ [cellContext.row.id]: true });
                            }}
                        />
                    );
                },
            },
            {
                id: 'action',
                header: 'Thao tác',
                cell: ({ row }) => {
                    return (
                        <Group maw={50}>
                            <Button
                                leftSection={<EditIcon styles={{ fill: 'currentcolor' }} />}
                                disabled={accountType?.role?.id ? accountType.role.id > row.original.roleId : false}
                                className="text-sm font-semibold cursor-pointer"
                                onClick={() => {
                                    editStateModal[1].open();
                                    setRowSelection({ [row.id]: true });
                                }}
                            >
                                Sửa
                            </Button>
                        </Group>
                    );
                },
                enableSorting: false,
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataQuery.data?.data],
    );

    const table = useReactTable({
        data: dataQuery.data?.data ?? defaultData,
        columns,
        pageCount: (dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: (row) => {
            return accountType?.role?.id ? accountType.role.id <= row.original.roleId : false;
        },
        onRowSelectionChange: setRowSelection,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row) => row.id,
        debugTable: true,
    });

    const refreshData = useCallback(async (idToast?: string, success: boolean = true) => {
        await queryClient.invalidateQueries(['user-list']);
        setRowSelection({});
        if (idToast) {
            if (success) toast.success('Cập nhật thành công', { id: idToast });
            else toast.error('Có lỗi xảy ra trong quá trình cập nhật', { id: idToast });
        }
    }, []);

    useEffect(() => {
        const callAPI = async (promiseList: unknown[]) => {
            const id = toast.loading('Đang cập nhật...');
            await Promise.all(promiseList);
            refreshData(id);
        };
        if (dataUpdate && Object.keys(rowSelection).length > 0) {
            const promiseList: unknown[] = [];
            Object.keys(rowSelection).map((id) => {
                promiseList.push(
                    new Promise((resolve) => updateUserMutation.mutateAsync({ id, ...dataUpdate }).then(resolve)),
                );
            });
            callAPI(promiseList);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate]);

    return (
        <>
            <Group justify="space-between">
                <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm kiếm người dùng"
                    className="w-1/2"
                />
                <Button onClick={createStateModal[1].open}>Thêm mới người dùng</Button>
            </Group>
            <TableForm
                table={table}
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
            {/* <DeleteUserStudio table={table} opened={opened} close={close} refreshData={refreshData} /> */}
            <Modal onClose={createStateModal[1].close} opened={createStateModal[0]} size="xl">
                <BasicUserInfo
                    onChangedOrCreate={() => {
                        refreshData();
                        createStateModal[1].close();
                    }}
                />
            </Modal>

            <Modal onClose={editStateModal[1].close} opened={editStateModal[0]} size="xl">
                {table.getRowModel().rows.filter((row) => row.getIsSelected()).length > 0 && (
                    <BasicUserInfo
                        userInfo={table.getRowModel().rows.filter((row) => row.getIsSelected())[0].original}
                        onChangedOrCreate={() => {
                            refreshData();
                            editStateModal[1].close();
                        }}
                    />
                )}
            </Modal>
        </>
    );
}
