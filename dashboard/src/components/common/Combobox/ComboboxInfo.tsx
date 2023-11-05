/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combobox, ComboboxTarget, TextInput, useCombobox } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface IComboboxInfoProps<T extends object> {
    options: T[];
    optionElement: (option: T) => JSX.Element;
    onBlurInput?: () => void;
    onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeOptions?: (options: T[], handleInputValue: React.Dispatch<React.SetStateAction<string>>) => void;
    onSubmitOption?: (option: T, handleInputValue: React.Dispatch<React.SetStateAction<string>>) => void;
    handleFilter: (options: T[], inputValue: string) => T[];
    defaultValue?: string;
    fieldFind: string;
    gap?: number;
}

export default function ComboboxInfo<T extends object>({
    options,
    optionElement,
    onBlurInput,
    onChangeInput,
    onSubmitOption,
    onChangeOptions,
    handleFilter,
    defaultValue,
    fieldFind,
    gap,
}: IComboboxInfoProps<T>) {
    const combobox = useCombobox();
    const [value, setValue] = useState(defaultValue || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const [filterOption, setFilterOption] = useState<T[]>(handleFilter(options, defaultValue || ''));

    useEffect(() => {
        onChangeOptions && onChangeOptions(options, setValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    useEffect(() => {
        setFilterOption(handleFilter(options, value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Combobox
            onOptionSubmit={(optionValue, props) => {
                const optionSelect = options.find((option) => (option as any)[fieldFind] === optionValue);
                onSubmitOption && onSubmitOption(optionSelect!, setValue);
                combobox.closeDropdown();
                console.log(optionValue, props.key);
            }}
            store={combobox}
        >
            <ComboboxTarget>
                <TextInput
                    ref={inputRef}
                    placeholder="Nhập tên artist hoặc email"
                    value={value}
                    onChange={(event) => {
                        setValue(event.currentTarget.value);
                        onChangeInput && onChangeInput(event);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        onBlurInput && onBlurInput();
                    }}
                />
            </ComboboxTarget>
            <Combobox.Dropdown>
                <Combobox.Options
                    className={twMerge('flex flex-col p-1', gap ? `gap-y-${gap}` : 'gap-y-3')}
                    mah={200}
                    style={{ overflowY: 'auto' }}
                >
                    {filterOption.length === 0 ? (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    ) : (
                        filterOption.map((option) => {
                            return (
                                <Combobox.Option key={(option as any)[fieldFind]} value={(option as any)[fieldFind]}>
                                    {optionElement(option)}
                                </Combobox.Option>
                            );
                        })
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
