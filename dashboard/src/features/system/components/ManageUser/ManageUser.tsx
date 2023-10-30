import { UserIcon } from '@/assets/icons';
import { roleMap } from '@/features/auth';

import { Checkbox, Text, Group, AspectRatio, Image, rem, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    PaginationState,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import queryClient from '@/lib/react-query';
import { IUser } from '@/features/users';
import { useGetListUserStudio, useUpdateUserMutation } from '@/features/system';
import TableForm, { SelectCell } from '@/components/TableForm';
import { toast } from 'react-toastify';
import BasicUserInfo from '../BasicUserInfo';

export default function ManageUser() {
    const refreshData = useCallback(async () => {
        await queryClient.invalidateQueries(['user-list']);
        setRowSelection({});
    }, []);
    const editStateModal = useDisclosure(false);
    const createStateModal = useDisclosure(false);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const defaultData = useMemo(() => [], []);

    const dataQuery = useGetListUserStudio({ page: pageIndex, pageSize });
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const updateUserMutation = useUpdateUserMutation({
        onSuccess: () => {
            toast('Cập nhật thành công', { type: 'success' });
            dataQuery.refetch();
        },
    });

    const columns = useMemo<ColumnDef<IUser>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => {
                    return (
                        <Checkbox
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />
                    );
                },
                enableSorting: false,
                cell: ({ row }) => {
                    return <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />;
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
                    return <Text className="text-sm font-semibold max-w-[250px] truncate">{row.original.email}</Text>;
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
                            cellContext={cellContext}
                            data={Object.entries(roleMap).map(([key, value]) => ({ value: key, label: value }))}
                            onChange={(e, user) => {
                                if (e !== user.roleId.toString()) {
                                    updateUserMutation.mutate({ id: user.id, roleId: Number(e) });
                                }
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
                            cellContext={cellContext}
                            data={[
                                {
                                    label: 'Chưa kích hoạt',
                                    value: '0',
                                },
                                {
                                    label: 'Kích hoạt',
                                    value: '1',
                                },
                                {
                                    label: 'Vô hiệu hóa',
                                    value: '2',
                                },
                            ]}
                            onChange={(e, user) => {
                                if (e !== user.status.toString()) {
                                    updateUserMutation.mutate({ id: user.id, status: Number(e) });
                                }
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
                                className="text-sm font-semibold cursor-pointer"
                                onClick={() => {
                                    editStateModal[1].open();
                                    setRowSelection({ [row.index]: true });
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
        pageCount: dataQuery.data?.total ?? -1,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <>
            <Group justify="flex-end">
                <Button onClick={createStateModal[1].open}>Thêm mới người dùng</Button>
            </Group>
            <TableForm table={table} handlePagination={setPagination} pageIndex={pageIndex} pageSize={pageSize} />
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
                {Object.keys(rowSelection).length === 1 && (
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
