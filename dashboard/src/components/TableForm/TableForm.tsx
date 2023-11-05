import { Group, Pagination, ScrollArea, Select, Table, Text, rem } from '@mantine/core';
import { PaginationState, Table as TableProps, flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import THead from '../THead';

export default function TableForm<T extends object>({
    table,
    handlePagination,
    pageIndex,
    pageSize,
    total,
    handleClickRow,
}: {
    table: TableProps<T>;
    handlePagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    pageIndex: number;
    pageSize: number;
    total: number;
    handleClickRow?: (row: T) => void;
}) {
    return (
        <>
            <ScrollArea
                classNames={{ scrollbar: '!sticky' }}
                className="!max-h-[calc(100vh-320px)] !min-h-[calc(100vh-320px)] overflow-y-auto"
            >
                <Table highlightOnHover verticalSpacing={'sm'} className="min-w-[1080px]">
                    <Table.Thead>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <Table.Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Fragment key={header.id}>
                                                {header.column.getCanSort() ? (
                                                    <THead header={header} />
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
                                <Table.Tr
                                    key={row.id}
                                    variant="disabled"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        handleClickRow && handleClickRow(row.original);
                                    }}
                                >
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
                        handlePagination({ pageIndex, pageSize: Number(e) });
                    }}
                    withCheckIcon={false}
                    data={['10', '20', '50', '100']}
                />
                <Pagination
                    fw={600}
                    fs="14px"
                    total={total}
                    onChange={(e) => {
                        handlePagination({ pageIndex: e - 1, pageSize });
                    }}
                />
            </Group>
        </>
    );
}
