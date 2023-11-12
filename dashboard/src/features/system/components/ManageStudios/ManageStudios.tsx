import { EditIcon, StudioIcon } from '@/assets/icons';

import { Checkbox, Text, Group, AspectRatio, Image, rem, Input, Button } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

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
import { toast } from 'react-hot-toast';
import { IStudio, useGetListStudio, useUpdateStudioMutation } from '@/features/studio';
import CreateStudio from './CreateStudio';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import DropdownFilter from '@/components/DropdownFilter/DropdownFilter';

export default function ManageStudios() {
    const navigate = useNavigate();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const [listStatus, setListStatus] = useState<number[]>([0, 1, 2, 3]);

    const defaultData = useMemo(() => [], []);
    const dataQuery = useGetListStudio({ page: pageIndex, pageSize, searchKeyword, statusList: listStatus });
    const [dataUpdate, setDataUpdate] = useState<Partial<IStudio | null>>(null);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

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
                        <Group wrap="nowrap">
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
                            <Text className="text-sm font-semibold">{row.original.name}</Text>
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
                                    label: 'Đã kích hoạt',
                                    value: '0',
                                },
                                {
                                    label: 'Chưa kích hoạt',
                                    value: '1',
                                },
                                {
                                    label: 'Vô hiệu hóa',
                                    value: '2',
                                },
                                {
                                    label: 'Dừng hoạt động',
                                    value: '3',
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
                                leftSection={<EditIcon styles={{ fill: 'currentcolor' }} />}
                                onClick={() => {
                                    setRowSelection({ [row.id]: true });
                                    sessionStorage.setItem('tattus-studio', row.id);
                                    setAccountType({ ...accountType, studioId: row.id });
                                    navigate('/studio/dashboard');
                                }}
                            >
                                Sửa
                            </Button>
                            {/* <Button
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
                            </Button> */}
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

    const refreshData = useCallback(async (idToast?: string, success: boolean = true) => {
        await queryClient.invalidateQueries({ queryKey: ['studios'] });
        setRowSelection({});
        if (idToast)
            success
                ? toast.success('Cập nhật thành công', { id: idToast })
                : toast.error('Có lỗi xảy ra trong quá trình cập nhật', { id: idToast });
        // dataQuery.refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return (
        <>
            <Group justify="space-between">
                <Group className="w-1/2 gap-x-6 flex-nowrap">
                    <Input
                        defaultValue={searchKeyword}
                        onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                        placeholder="Tìm kiếm studio"
                        className="w-full"
                    />
                    <DropdownFilter
                        name="Trạng thái"
                        defaultValue={[
                            {
                                label: 'Đã kích hoạt',
                                value: '0',
                            },
                            {
                                label: 'Chưa kích hoạt',
                                value: '1',
                            },
                            {
                                label: 'Vô hiệu hóa',
                                value: '2',
                            },
                            {
                                label: 'Dừng hoạt động',
                                value: '3',
                            },
                        ]}
                        listOptions={[
                            {
                                label: 'Đã kích hoạt',
                                value: '0',
                            },
                            {
                                label: 'Chưa kích hoạt',
                                value: '1',
                            },
                            {
                                label: 'Vô hiệu hóa',
                                value: '2',
                            },
                            {
                                label: 'Dừng hoạt động',
                                value: '3',
                            },
                        ]}
                        value={'value'}
                        label={'label'}
                        onChange={(listSelect) => {
                            setListStatus(listSelect.map((status) => Number(status.value)));
                        }}
                    />
                </Group>
                <CreateStudio refreshData={refreshData} />
            </Group>
            <TableForm
                table={table}
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
        </>
    );
}
