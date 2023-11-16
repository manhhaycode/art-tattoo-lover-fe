import { UserIcon } from '@/assets/icons';
import { EPermission, roleMap } from '@/features/auth';

import { useAuthStore } from '@/store/authStore';
import { Checkbox, Text, Group, AspectRatio, Image, rem, Button, Input } from '@mantine/core';
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

import { useGetListUserStudio, useUpdateUserStudioMutation } from '../../api';
import { IUpdateUserStudioReq, IUserStudio } from '@/features/studio';
import { toast } from 'react-hot-toast';
import AddNewUserStudio from '../AddNewUserStudio';
import queryClient from '@/lib/react-query';
import DeleteUserStudio from '../DeleteUserStudio';
import TableForm, { SelectCell } from '@/components/TableForm';

export default function ManageStaffStudio() {
    const { accountType } = useAuthStore();

    const [opened, { open, close }] = useDisclosure(false);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const defaultData = useMemo(() => [], []);
    const dataQuery = useGetListUserStudio({
        page: pageIndex,
        pageSize,
        studioId: accountType?.studioId ?? '',
        searchKeyword,
    });
    const [dataUpdate, setDataUpdate] = useState<Partial<IUpdateUserStudioReq> | null>(null);
    const [dataDelete, setDataDelete] = useState<IUserStudio[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const updateUserStudioMutation = useUpdateUserStudioMutation({});

    const columns = useMemo<ColumnDef<IUserStudio>[]>(
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
                    //   accountType.user?.id !== row.original.user.id
                    return (
                        <Checkbox
                            disabled={
                                accountType?.user?.id !== row.original.userId &&
                                (accountType?.role?.id ? accountType.role.id > row.original.user.roleId : false)
                            }
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    );
                },
            },
            {
                accessorKey: 'user.fullName',
                header: 'Họ và tên',
                cell: ({ row }) => {
                    return (
                        <Group wrap="nowrap" maw={250}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {row.original.user.avatar ? (
                                    <Image src={row.original.user.avatar} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold w-full">{row.original.user.fullName}</Text>
                        </Group>
                    );
                },
            },
            {
                accessorKey: 'user.email',
                header: 'Địa chỉ Email',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.user.email}</Text>;
                },
            },
            {
                accessorKey: 'user.phone',
                header: 'Số điện thoại',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.user.phone}</Text>;
                },
            },
            {
                accessorKey: 'user.roleId',
                header: 'Vai trò',
                cell: (cellContext) => {
                    const roleIdAccount = accountType?.role?.id || 0;
                    return (
                        <>
                            {roleIdAccount > cellContext.row.original.user.roleId ? (
                                <SelectCell
                                    disabled={
                                        accountType?.role?.id
                                            ? accountType.role.id > cellContext.row.original.user.roleId ||
                                              accountType.user?.id === cellContext.row.original.user.id
                                            : false
                                    }
                                    className="!max-w-[180px]"
                                    cellContext={cellContext}
                                    data={Object.entries(roleMap)
                                        .filter((role) => {
                                            return Number(role[0]) >= 3 && Number(role[0]) < 6;
                                        })
                                        .map(([key, value]) => ({ value: key, label: value }))}
                                />
                            ) : (
                                <SelectCell
                                    disabled={
                                        accountType?.role?.id
                                            ? accountType.role.id > cellContext.row.original.user.roleId ||
                                              accountType.user?.id === cellContext.row.original.user.id
                                            : false
                                    }
                                    className="!max-w-[180px]"
                                    cellContext={cellContext}
                                    data={Object.entries(roleMap)
                                        .filter((role) => {
                                            return (
                                                Number(role[0]) >= (accountType?.role?.id || 3) &&
                                                Number(role[0]) < 6 &&
                                                Number(role[0]) >= 3
                                            );
                                        })
                                        .map(([key, value]) => ({ value: key, label: value }))}
                                    onChange={(e, userStudio) => {
                                        if (e !== userStudio.user.roleId.toString()) {
                                            setDataUpdate({ roleId: Number(e) });
                                        }
                                    }}
                                    onClick={() => {
                                        if (!cellContext.row.getIsSelected())
                                            setRowSelection({ [cellContext.row.id]: true });
                                    }}
                                />
                            )}
                        </>
                    );
                },
            },
            {
                accessorKey: 'isDisabled',
                header: 'Trạng thái',
                cell: (cellContext) => {
                    return (
                        <SelectCell
                            disabled={
                                accountType?.role?.id
                                    ? accountType.role.id > cellContext.row.original.user.roleId ||
                                      accountType.user?.id === cellContext.row.original.user.id
                                    : false
                            }
                            className="!max-w-[150px]"
                            cellContext={cellContext}
                            data={[
                                {
                                    label: 'Đã kích hoạt',
                                    value: 'false',
                                },
                                {
                                    label: 'Đã tạm khóa',
                                    value: 'true',
                                },
                            ]}
                            onChange={(e, userStudio) => {
                                if (e !== userStudio.isDisabled.toString()) {
                                    setDataUpdate({ isDisabled: e === 'true' ? true : false });
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
                        <Group maw={100}>
                            <Button
                                color="red.6"
                                className="text-sm font-semibold cursor-pointer"
                                disabled={!row.getIsSelected()}
                                onClick={open}
                            >
                                Xóa
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
        enableRowSelection: (row) => {
            return accountType?.role?.id
                ? accountType.role.id <= row.original.user.roleId || accountType.user?.id === row.original.user.id
                : false;
        },
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row) => row.id,
        // getFilteredRowModel: getFilteredRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    const refreshData = useCallback(async (idToast?: string, success: boolean = true) => {
        await queryClient.invalidateQueries(['user-studio']);
        setRowSelection({});
        if (idToast)
            success
                ? toast.success('Cập nhật thành công', {
                      id: idToast,
                  })
                : toast.error('Có lỗi xảy ra trong quá trình cập nhật', {
                      id: idToast,
                  });
    }, []);

    useEffect(() => {
        const callAPI = async (promiseList: unknown[]) => {
            const id = toast.loading('Đang cập nhật...');
            await Promise.all(promiseList)
                .then(() => refreshData(id, true))
                .catch(() => refreshData(id, false));
        };
        if (dataUpdate) {
            const promiseList: unknown[] = [];
            Object.keys(rowSelection).map((id) => {
                promiseList.push(
                    new Promise((resolve, reject) =>
                        updateUserStudioMutation
                            .mutateAsync({ userId: id, ...dataUpdate })
                            .then(resolve)
                            .catch(reject),
                    ),
                );
            });
            callAPI(promiseList);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate]);

    useEffect(() => {
        if (dataQuery.data?.data && rowSelection) {
            const listId = Object.keys(rowSelection);
            setDataDelete((prev) => {
                const currentData = dataQuery.data?.data.filter((data) => {
                    return listId.includes(data.id);
                });

                const filterData = prev.filter((data) => {
                    return listId.includes(data.id);
                });

                // remove duplicate use Set
                const uniqueData = new Set([...filterData, ...currentData]);

                return [...uniqueData];
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelection]);

    return (
        <>
            <Group justify="space-between">
                <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm kiếm nhân viên studio"
                    className="w-1/2"
                />
                {accountType?.permissions?.includes(EPermission.MANAGE_OWNED_STUDIO) && (
                    <AddNewUserStudio refreshData={refreshData} />
                )}
            </Group>
            <TableForm
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                table={table}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
            <DeleteUserStudio dataList={dataDelete} opened={opened} close={close} refreshData={refreshData} />
        </>
    );
}
