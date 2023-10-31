import { StudioIcon } from '@/assets/icons';

import { Checkbox, Text, Group, AspectRatio, Image, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    PaginationState,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState, useEffect } from 'react';
import queryClient from '@/lib/react-query';
import TableForm, { SelectCell } from '@/components/TableForm';
import { Id, toast } from 'react-toastify';
import { IStudio, useGetListStudio, useUpdateStudioMutation } from '@/features/studio';
import DeleteStudios from './DeleteStudios';
import CreateStudio from './CreateStudio';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function ManageStudios() {
    const navigate = useNavigate();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const defaultData = useMemo(() => [], []);
    const dataQuery = useGetListStudio({ page: pageIndex, pageSize });
    const [dataUpdate, setDataUpdate] = useState<Partial<IStudio | null>>(null);
    const [dataDelete, setDataDelete] = useState<IStudio[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [opened, { open, close }] = useDisclosure(false);

    const updateStudioMutation = useUpdateStudioMutation({});

    const { accountType, setAccountType } = useAuthStore();

    const columns = useMemo<ColumnDef<IStudio>[]>(
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
                accessorKey: 'name',
                header: 'Tên studio',
                cell: ({ row }) => {
                    return (
                        <Group wrap="nowrap" maw={240}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {row.original.logo ? (
                                    <Image src={row.original.logo} className="object-cover w-full h-full" alt="" />
                                ) : (
                                    <div>
                                        <StudioIcon
                                            styles={{ height: '24px', width: '24px', stroke: 'currentcolor' }}
                                        />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold max-w-[150px]">{row.original.name}</Text>
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
                            onChange={(e, studio) => {
                                if (e !== studio.status.toString()) {
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
                                className="text-sm font-semibold cursor-pointer"
                                onClick={() => {
                                    setRowSelection({ [row.id]: true });
                                    sessionStorage.setItem('tattus-studio', row.id);
                                    setAccountType({ ...accountType, studioId: row.id });
                                    navigate('/studio/dashboard');
                                }}
                            >
                                Sửa
                            </Button>
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
        pageCount: (dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
        getRowId: (row) => row.id,
    });

    const refreshData = useCallback(async (idToast?: Id, success: boolean = true) => {
        await queryClient.invalidateQueries({ queryKey: ['studios'] });
        setRowSelection({});
        if (idToast)
            success
                ? toast.update(idToast, {
                      render: 'Cập nhật thành công',
                      type: 'success',
                      isLoading: false,
                      autoClose: 3000,
                      theme: 'colored',
                  })
                : toast.update(idToast, {
                      render: 'Có lỗi xảy ra trong quá trình cập nhật',
                      type: 'error',
                      isLoading: false,
                      autoClose: 3000,
                      theme: 'colored',
                  });
        // dataQuery.refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const callAPI = async (promiseList: unknown[]) => {
            const id = toast.loading('Đang cập nhật...', { isLoading: true, theme: 'dark' });
            await Promise.all(promiseList)
                .then(() => refreshData(id, true))
                .catch(() => refreshData(id, false));
        };

        if (dataUpdate) {
            const promiseList: unknown[] = [];
            Object.keys(rowSelection).map((id) => {
                promiseList.push(
                    new Promise((resolve, reject) =>
                        updateStudioMutation
                            .mutateAsync({ id, ...dataUpdate })
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
            <CreateStudio refreshData={refreshData} />
            <TableForm
                table={table}
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
            <DeleteStudios dataList={dataDelete} opened={opened} close={close} refreshData={refreshData} />
        </>
    );
}
