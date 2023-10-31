import { Select, BoxProps } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';
export default function SelectCell<T extends object>({
    onChange,
    onClick,
    cellContext,
    data,
    className,
    disabled,
}: {
    onChange?: (e: string | null, data: T) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, c: CellContext<T, unknown>) => void;
    cellContext: CellContext<T, unknown>;
    data: { value: string; label: string }[];
    disabled?: boolean;
    className?: BoxProps['className'];
}) {
    return (
        <Select
            disabled={disabled}
            onChange={(e) => {
                onChange && onChange(e, cellContext.cell.row.original);
            }}
            onClick={(e) => {
                onClick && onClick(e, cellContext);
            }}
            defaultValue={cellContext.cell.getValue()!.toString()}
            data={data}
            rightSectionProps={{ className: 'hidden' }}
            className={twMerge('text-sm font-semibold !max-w-[200px] ', className && className)}
            allowDeselect={false}
            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
            withCheckIcon={false}
        />
    );
}
