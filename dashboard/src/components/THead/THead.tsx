import { Center, Group, Table, Text, rem } from '@mantine/core';
import { Header, flexRender } from '@tanstack/react-table';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TbSelector } from 'react-icons/tb';

interface ThProps<T extends object> {
    header: Header<T, unknown>;
}

export default function Th<T extends object>({ header }: ThProps<T>) {
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
}
