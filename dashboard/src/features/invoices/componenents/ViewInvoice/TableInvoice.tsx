import { ColumnDef, useReactTable, getCoreRowModel, RowData } from '@tanstack/react-table';
import { IServiceInvoice } from '@/features/invoices';
import TableForm from '@/components/TableForm';
import { useMemo } from 'react';
import { Group, Text, rem } from '@mantine/core';
import { numbertoPrice } from '@/lib/helper';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => boolean;
    }
}

export default function TableInvoice({ serviceList, total }: { serviceList: IServiceInvoice[]; total: number }) {
    const column = useMemo<ColumnDef<IServiceInvoice>[]>(
        () => [
            {
                accessorKey: 'zOrder',
                header: 'STT',
                align: 'center',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.index + 1}</Text>;
                },
            },
            {
                accessorKey: 'service',
                header: 'Dịch vụ',
                align: 'center',
                cell: ({ row }) => {
                    return <Text className="font-semibold text-sm">{row.original.service.name}</Text>;
                },
            },
            {
                accessorKey: 'unitPrice',
                header: 'Đơn giá',
                align: 'center',
                cell: ({ row }) => {
                    return (
                        <Text className="text-sm font-semibold">
                            {row.original.price && numbertoPrice(row.original.price)}
                        </Text>
                    );
                },
            },
            {
                accessorKey: 'quantity',
                header: 'Số lượng',
                align: 'center',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.quantity}</Text>;
                },
            },
            {
                accessorKey: 'discount',
                header: 'Giảm giá',
                align: 'center',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.discount + '%'}</Text>;
                },
            },
            {
                accessorKey: 'amount',
                header: 'Thành tiền',
                align: 'center',
                cell: ({ row: { original } }) => {
                    const amount =
                        original.price * original.quantity -
                        original.price * original.quantity * (original.discount / 100);
                    return (
                        <Text className="text-sm font-semibold">
                            {amount && !isNaN(amount) && numbertoPrice(amount)}
                        </Text>
                    );
                },
            },
        ],

        [],
    );

    const table = useReactTable<IServiceInvoice>({
        data: serviceList,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        enableSorting: false,
    });

    return (
        <div className="flex flex-col gap-y-6">
            <TableForm table={table} />
            <div className="flex flex-col w-full gap-y-6">
                <Group justify="center">
                    <Group gap={rem(24)}>
                        <Text className="text-lg font-semibold">Tổng tiền:</Text>
                        <Text className="text-lg font-semibold">{numbertoPrice(total)}</Text>
                    </Group>
                </Group>
            </div>
        </div>
    );
}
