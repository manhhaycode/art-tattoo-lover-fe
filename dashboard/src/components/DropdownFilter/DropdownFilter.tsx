import { Button, Checkbox, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import DropwdownInput from '../Dropdown/DropwdownInput';
import { useClickOutside } from '@mantine/hooks';
import { FiFilter } from 'react-icons/fi';

interface DropdownFilterProps<T extends object> {
    name: string;
    listOptions: T[];
    value: keyof T;
    label: keyof T;
    onChange?: (value: T[]) => void;
}

export default function DropdownFilter<T extends object>(props: DropdownFilterProps<T>) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<T[]>([]);
    const ref = useClickOutside(() => setOpen(false));

    useEffect(() => {
        if (props.onChange) {
            props.onChange(selected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected.length]);

    return (
        <div ref={ref} className="relative">
            <Button leftSection={<FiFilter />} onClick={() => setOpen(true)} variant="light">
                {props.name}
            </Button>
            {open && (
                <DropwdownInput className="flex flex-col gap-y-4 w-fit max-w-[300px]">
                    {props.listOptions.map((option) => (
                        <Checkbox
                            checked={selected.some((item) => item[props.value] === option[props.value])}
                            key={option[props.value] as unknown as string}
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setSelected([...selected, option]);
                                } else {
                                    setSelected(selected.filter((item) => item[props.value] !== option[props.value]));
                                }
                            }}
                            label={
                                <Text className="text-sm font-semibold truncate max-w-[250px]">
                                    {option[props.label] as unknown as string}
                                </Text>
                            }
                        />
                    ))}
                </DropwdownInput>
            )}
        </div>
    );
}
