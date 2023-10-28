import { UserIcon } from '@/assets/icons';
import { roleMap } from '@/features/auth';

import { useAuthStore } from '@/store/authStore';
import {
    Checkbox,
    Table,
    ScrollArea,
    Text,
    Group,
    AspectRatio,
    Image,
    Center,
    rem,
    Pagination,
    Select,
    Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
    SortingState,
    getSortedRowModel,
    Header,
    PaginationState,
} from '@tanstack/react-table';
import { Fragment, useCallback, useMemo, useReducer, useState } from 'react';

import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { TbSelector } from 'react-icons/tb';
import { useGetListUserStudio, useUpdateUserStudioMutation } from '../../api';
import { IUserStudio } from '@/features/studio';
import { toast } from 'react-toastify';
import AddNewUserStudio from '../AddNewUserStudio';
import queryClient from '@/lib/react-query';
import DeleteUserStudio from '../DeleteUserStudio';
interface ThProps {
    header: Header<IUserStudio, unknown>;
}

const Th = ({ header }: ThProps) => {
    const Icon =
        header.column.getIsSorted() !== false
            ? header.column.getIsSorted() === 'asc'
                ? FiChevronUp
                : FiChevronDown
            : TbSelector;
    return (
        <Table.Th
            key={header.id}
            {...{
                colSpan: header.colSpan,
                onClick: () => header.column.toggleSorting(undefined, true),
            }}
            className="hover:bg-[light-dark(var(--mantine-color-gray-0),var(--mantine-color-dark-6))] cursor-pointer select-none"
        >
            <Group justify="space-between" maw={250}>
                <Text fw={600} fz="sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </Text>
                <Center>
                    <Icon style={{ width: rem(24), height: rem(24) }} fill="currentColor" stroke="1.5" />
                </Center>
            </Group>
        </Table.Th>
    );
};

export default function ManageStaffStudio() {
    const { accountType } = useAuthStore();
    const rerender = useReducer(() => ({}), {})[1];
    const refreshData = useCallback(async () => {
        await queryClient.invalidateQueries(['user-studio']);
        setRowSelection({});
    }, []);
    const [opened, { open, close }] = useDisclosure(false);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const defaultData = useMemo(() => [], []);

    const dataQuery = useGetListUserStudio({ page: pageIndex, pageSize, studioId: accountType?.studioId ?? '' });
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const updateUserStudioMutation = useUpdateUserStudioMutation({
        onSuccess: () => {
            rerender();
            toast('Cập nhật thành công', { type: 'success' });
            dataQuery.refetch();
        },
    });

    const columns = useMemo<ColumnDef<IUserStudio>[]>(
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
                cell: ({ row }) => {
                    return (
                        <Select
                            onChange={(e) => {
                                rerender();
                                updateUserStudioMutation.mutate({ userId: row.original.id, roleId: Number(e) });
                            }}
                            defaultValue={row.original.user.roleId.toString()}
                            data={Object.entries(roleMap).map(([key, value]) => ({ value: key, label: value }))}
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold !max-w-[150px]"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                        />
                    );
                },
            },
            {
                accessorKey: 'isDisabled',
                header: 'Trạng thái',
                cell: ({ row }) => {
                    return (
                        <Select
                            defaultValue={row.original.isDisabled.toString()}
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
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold !max-w-[150px]"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                            onChange={(e) => {
                                if (e !== row.original.isDisabled.toString()) {
                                    updateUserStudioMutation.mutate({
                                        userId: row.original.id,
                                        isDisabled: e === 'true',
                                    });
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
                        <Group maw={100}>
                            {accountType?.role && (accountType.role.id === 1 || accountType?.role.id === 2) && (
                                <Button
                                    disabled={accountType?.role && accountType.role.id > 2}
                                    className="text-sm font-semibold cursor-pointer"
                                    onClick={() => console.log(row.original)}
                                >
                                    Sửa
                                </Button>
                            )}
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
        [],
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
            <AddNewUserStudio refreshData={refreshData} />
            <ScrollArea
                classNames={{ scrollbar: '!sticky' }}
                className="!max-h-[calc(100vh-320px)] !min-h-[calc(100vh-320px)] overflow-y-auto"
            >
                <Table highlightOnHover verticalSpacing={'sm'} className="!min-w-[1180px]">
                    <Table.Thead>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <Table.Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Fragment key={header.id}>
                                                {header.column.getCanSort() ? (
                                                    <Th header={header} />
                                                ) : (
                                                    <Table.Th>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                    </Table.Th>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </Table.Tr>
                            );
                        })}
                    </Table.Thead>
                    <Table.Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Table.Tr key={row.original.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Table.Td className="!max-w-[250px]" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Table.Td>
                                        );
                                    })}
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            <Group mt={rem(24)} className="justify-end">
                <Text fs="14px" fw={600}>
                    Số dòng trên trang:
                </Text>
                <Select
                    defaultValue={'10'}
                    rightSectionProps={{ className: 'hidden' }}
                    className="text-sm font-semibold !max-w-[60px]"
                    allowDeselect={false}
                    classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                    onChange={(e) => {
                        setPagination({ pageIndex, pageSize: Number(e) });
                    }}
                    withCheckIcon={false}
                    data={['10', '20', '50', '100']}
                />
                <Pagination
                    fw={600}
                    fs="14px"
                    total={10}
                    onChange={(e) => {
                        setPagination({ pageIndex: e - 1, pageSize });
                    }}
                />
            </Group>
            <DeleteUserStudio table={table} opened={opened} close={close} refreshData={refreshData} />
        </>
    );
}
