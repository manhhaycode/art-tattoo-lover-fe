import { Select, Input, Text } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectProps<T2 extends object> {
    data: T2[];
    value: keyof T2;
    label: keyof T2;
}
export default function InputCell<T, T2 extends object>({
    cellContext,
    select,
    isNumber,
    fieldValue,
    className,
    formatValue,
    onChange,
    defaultValue,
    validate,
}: {
    onChange?: (e: string | null) => void;
    // onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, c: CellContext<T, unknown>) => void;
    cellContext: CellContext<T, unknown>;
    fieldValue: keyof T;
    select?: SelectProps<T2>;
    isNumber?: boolean;
    className?: string;
    defaultValue?: string | number;
    formatValue?: (value: string) => string;
    validate?: (value: string) => boolean;
}) {
    const {
        row: { index, original },
        column: { id },
        table,
    } = cellContext;
    const initialValue = original[fieldValue];
    const [click, setClick] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(initialValue as unknown as string);

    const onBlur = (valueI?: string | number) => {
        table.options.meta?.updateData(index, id, valueI !== undefined ? valueI : value);
        setClick(false);
    };

    useEffect(() => {
        setValue(initialValue as unknown as string);
    }, [initialValue]);

    useEffect(() => {
        if (click) {
            inputRef.current?.focus();
            selectRef.current?.focus();
        }
    }, [click]);

    return (
        <div
            className={className ? className : ''}
            onClick={() => {
                setClick(true);
            }}
        >
            {(click && value.toString().length > 0) || value.toString().length === 0 ? (
                <>
                    {!select ? (
                        <Input
                            ref={inputRef}
                            value={value as unknown as string}
                            onChange={(e) => {
                                if (validate && !validate(e.target.value)) return;
                                setValue(e.target.value);
                                onChange && onChange(e.target.value as unknown as string);
                            }}
                            {...(isNumber && { type: 'number' })}
                            {...(className && { classNames: { input: className, wrapper: className } })}
                            onBlur={() => {
                                if (isNumber && (value.length === 0 || isNaN(Number(value)))) {
                                    setValue(defaultValue ? defaultValue.toString() : '0');
                                    onBlur(defaultValue ? defaultValue : 0);
                                    return;
                                }
                                onBlur();
                            }}
                        />
                    ) : (
                        <Select
                            ref={selectRef}
                            value={value as unknown as string}
                            {...(isNumber && { type: 'number' })}
                            data={select.data.map((d) => ({
                                value: d[select.value] as unknown as string,
                                label: d[select.label] as unknown as string,
                            }))}
                            onChange={(e) => {
                                if (e) {
                                    setValue(e);
                                    onChange && onChange(e);
                                }
                            }}
                            onBlur={() => onBlur()}
                            rightSectionProps={{ className: 'hidden' }}
                            className="text-sm font-semibold"
                            allowDeselect={false}
                            classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                            withCheckIcon={false}
                            searchable
                        />
                    )}
                </>
            ) : (
                <Text
                    className={twMerge(
                        'text-sm font-semibold min-h-[36px] flex items-center',
                        className ? className : '',
                    )}
                >
                    {formatValue ? formatValue(value) : value}
                </Text>
            )}
        </div>
    );
}
