import { Checkbox, Group, Text } from '@mantine/core';
import { IWorkingTime } from '../..';
import { useEffect, useState } from 'react';
import { TimeInput } from '@mantine/dates';
const listDayOfWeeks = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function EditWorkingTime({
    list,
    handleChange,
    disabled,
}: {
    list: IWorkingTime[];
    handleChange: (data: IWorkingTime[]) => void;
    disabled?: boolean;
}) {
    const [data, setData] = useState<IWorkingTime[]>(list);

    useEffect(() => {
        setData(list);
    }, [list]);

    return (
        <>
            {listDayOfWeeks.map((dayOfWeek, index) => {
                return (
                    <Group key={index} gap={12}>
                        <Checkbox
                            disabled={disabled}
                            checked={data.find((item) => item.dayOfWeek === index) ? true : false}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    const i = data.findIndex((item) => item.dayOfWeek === index);
                                    if (i !== -1) data.splice(i, 1);
                                    setData([...data, { dayOfWeek: index, openAt: '00:00:00', closeAt: '23:59:00' }]);
                                    handleChange([
                                        ...data,
                                        { dayOfWeek: index, openAt: '00:00:00', closeAt: '23:59:00' },
                                    ]);
                                } else {
                                    const i = data.findIndex((item) => item.dayOfWeek === index);
                                    data.splice(i, 1);
                                    setData([...data]);
                                    handleChange([...data]);
                                }
                            }}
                        />
                        <Text className="font-semibold text-sm">{dayOfWeek}</Text>
                        <TimeInput
                            disabled={disabled}
                            onBlur={() => handleChange(data)}
                            value={data.find((item) => item.dayOfWeek === index)?.openAt || ''}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setData((prev) => {
                                    const item = prev.find((item) => item.dayOfWeek === index);
                                    if (!item)
                                        return [
                                            ...prev,
                                            { dayOfWeek: index, openAt: e.target.value, closeAt: '23:59:00' },
                                        ];
                                    else item.openAt = e.target.value + ':00';
                                    return [...prev];
                                });
                            }}
                        />
                        <TimeInput
                            disabled={disabled}
                            value={data.find((item) => item.dayOfWeek === index)?.closeAt || ''}
                            onBlur={() => handleChange(data)}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setData((prev) => {
                                    prev.find((item) => item.dayOfWeek === index)!.closeAt = e.target.value + ':00';
                                    return [...prev];
                                });
                            }}
                        />
                    </Group>
                );
            })}
        </>
    );
}
