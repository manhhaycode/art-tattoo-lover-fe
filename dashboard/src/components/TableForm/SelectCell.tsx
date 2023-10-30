import { Select } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
export default function SelectCell<T extends object>({
    onChange,
    cellContext,
    data,
}: {
    onChange?: (e: string | null, data: T) => void;
    cellContext: CellContext<T, unknown>;
    data: { value: string; label: string }[];
}) {
    return (
        <Select
            onChange={(e) => {
                onChange && onChange(e, cellContext.cell.row.original);
            }}
            defaultValue={cellContext.cell.getValue()!.toString()}
            data={data}
            rightSectionProps={{ className: 'hidden' }}
            className="text-sm font-semibold !max-w-[200px]"
            allowDeselect={false}
            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
            withCheckIcon={false}
        />
    );
}
