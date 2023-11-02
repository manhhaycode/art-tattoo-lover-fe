import { Checkbox, Group, Text } from '@mantine/core';
import { IWorkingTime } from '../..';
import { useEffect, useState } from 'react';
import { TimeInput } from '@mantine/dates';
const listDayOfWeeks = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function EditWorkingTime({
    list,
    handleChange,
}: {
    list: IWorkingTime[];
    handleChange: (data: IWorkingTime[]) => void;
}) {
    const [data, setData] = useState<IWorkingTime[]>(list);

    useEffect(() => {
        setData(list);
    }, [list]);

    console.log(data);

    return (
        <>
            {listDayOfWeeks.map((dayOfWeek, index) => {
                return (
                    <Group key={index} gap={12}>
                        <Checkbox
                            checked={data.find((item) => item.dayOfWeek === index) ? true : false}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setData((prev) => {
                                        const i = prev.findIndex((item) => item.dayOfWeek === index);
                                        if (i !== -1) prev.splice(i, 1);
                                        handleChange([
                                            ...prev,
                                            { dayOfWeek: index, openAt: '00:00:00', closeAt: '23:59:00' },
                                        ]);

                                        return [...prev, { dayOfWeek: index, openAt: '00:00:00', closeAt: '23:59:00' }];
                                    });
                                } else {
                                    setData((prev) => {
                                        const i = prev.findIndex((item) => item.dayOfWeek === index);
                                        prev.splice(i, 1);
                                        handleChange([...prev]);
                                        return [...prev];
                                    });
                                }
                            }}
                        />
                        <Text className="font-semibold text-sm">{dayOfWeek}</Text>
                        <TimeInput
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
                            defaultValue={data.find((item) => item.dayOfWeek === index)?.openAt}
                        />
                        <TimeInput
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
