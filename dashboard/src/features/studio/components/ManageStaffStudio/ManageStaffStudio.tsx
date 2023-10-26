import { UserIcon } from '@/assets/icons';
import { IUser } from '@/features/users';
import { Checkbox, Table, ScrollArea, Text, Group, AspectRatio, Image } from '@mantine/core';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export default function ManageStaffStudio() {
    const data = useMemo<IUser[]>(
        () => [
            {
                id: '17189796-1c4c-4857-c26c-08dbd3bf84ff',
                email: '1@gmail.com',
                fullName: 'Mạnh Nguyễn',
                phone: '000034534534',
                address: 'string',
                avatar: 'string',
                birthday: '2023-10-23T11:54:14.04',
                roleId: 3,
                status: 0,
            },
            {
                id: '00000000-0000-0000-0000-000000012345',
                email: 'arttattoolover@gmail.com',
                fullName: 'Art Tattoo Lover Admin',
                phone: '0333159054',
                address: '',
                avatar: null,
                birthday: '2003-03-22T17:00:00',
                roleId: 1,
                status: 1,
            },
            {
                id: '143dcc51-ab9b-49b9-9c95-bf4fa2b372b2',
                email: 'dreon1008@gmail.com',
                fullName: 'Ngọc Thạch',
                phone: '132432243',
                address: 'Ho Chi Minh',
                avatar: 'https://storage.googleapis.com/arttattoolover-adf51.appspot.com/media/12247737-1b51-4b58-b231-7e61a54c99db.jpg',
                birthday: '2023-10-14T17:00:00',
                roleId: 6,
                status: 1,
            },
            {
                id: 'f3e4810c-9ef7-4d0d-8eaa-7f2587ab5d32',
                email: 'manhnvse173470@fpt.edu.vn',
                fullName: 'Mạnh Nguyễn',
                phone: '0333159054',
                address: '186 đường số 2',
                avatar: 'https://storage.googleapis.com/arttattoolover-adf51.appspot.com/media/64567d3d-b97c-4ab5-9365-99961297a4d6.jpg',
                birthday: '2003-03-22T17:00:00',
                roleId: 3,
                status: 0,
            },
            {
                id: '3f6122b2-3f39-4a52-9366-dbe19dca7095',
                email: 'xacca345@gmail.com',
                fullName: 'Mạnh Nguyễn',
                phone: '033159054',
                address: 'aaaaa',
                avatar: null,
                birthday: null,
                roleId: 6,
                status: 1,
            },
        ],
        [],
    );
    const [rowSelection, setRowSelection] = useState({});

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
                cell: ({ row }) => {
                    return <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />;
                },
            },
            {
                id: 'fullName',
                header: 'Họ và tên',
                cell: ({ row }) => {
                    return (
                        <Group>
                            <AspectRatio className="w-9 h-9 rounded-full overflow-hidden relative">
                                {row.original.avatar ? (
                                    <Image src={row.original.avatar} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold">{row.original.fullName}</Text>
                        </Group>
                    );
                },
            },
            {
                id: 'email',
                header: 'Email',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.email}</Text>;
                },
            },
            {
                id: 'phone',
                header: 'Số điện thoại',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.phone}</Text>;
                },
            },
            {
                id: 'roleId',
                header: 'Vai trò',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.roleId}</Text>;
                },
            },
            {
                id: 'status',
                header: 'Trạng thái',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.status}</Text>;
                },
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <ScrollArea>
            <Table miw={'400px'} verticalSpacing={'sm'}>
                <Table.Thead>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <Table.Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <Table.Th key={index} colSpan={header.colSpan}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </Table.Th>
                                    );
                                })}
                            </Table.Tr>
                        );
                    })}
                </Table.Thead>
                <Table.Tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Table.Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Table.Td key={cell.id}>
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
    );
}
