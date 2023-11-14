import ComboboxInfo from '@/components/common/Combobox';
import { IAppointmentStudio, useGetListAppointmentStudio } from '@/features/appointments';
import { formatStringTime } from '@/lib/helper';
import queryClient from '@/lib/react-query';
import { useInvoiceStore } from '@/store/componentStore';
import { Text } from '@mantine/core';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUnmount } from 'react-use';

export default function ComboboxAppointment() {
    const { appointment, setAppointment } = useInvoiceStore();
    const [selectAppointment, setSelectAppointment] = useState<IAppointmentStudio | undefined>(
        appointment as IAppointmentStudio,
    );
    const { data: shiftList } = useGetListAppointmentStudio({
        statusList: [1],
        userId: appointment?.user?.id,
        page: 0,
        pageSize: 1000,
    });

    useUnmount(() => {
        queryClient.invalidateQueries(['appointmentsStudio']);
    });

    return (
        shiftList &&
        appointment && (
            <ComboboxInfo
                placeholder="Nhập lịch hẹn khách hàng"
                gap={1}
                {...(appointment.shift && {
                    defaultValue: formatStringTime(appointment.shift.start),
                })}
                options={shiftList.appointments}
                optionElement={(option) => (
                    <Text className="text-sm font-semibold">{formatStringTime(option.shift.start)}</Text>
                )}
                onBlurInput={() => {
                    if (!selectAppointment) {
                        toast.error('Vui lòng chọn lịch hẹn trong danh sách');
                    }
                }}
                onChangeInput={() => {
                    setSelectAppointment(undefined);
                }}
                onSubmitOption={(option, setValue) => {
                    setValue(formatStringTime(option.shift.start));
                    setSelectAppointment(option);
                    setAppointment(option);
                }}
                handleFilter={(e, input) => {
                    return e.filter((appointment) => {
                        return formatStringTime(appointment.shift.start).includes(input);
                    });
                }}
                fieldFind={'id'}
                selected={selectAppointment}
                // onChangeSelected={(option, setValue) => {
                //     setValue(
                //         `Ca ${convertStartEndTimeToDisplayFormat(
                //             new Date(option.start + 'Z'),
                //             new Date(option.end + 'Z'),
                //         )}`,
                //     );
                // }}
            ></ComboboxInfo>
        )
    );
}
