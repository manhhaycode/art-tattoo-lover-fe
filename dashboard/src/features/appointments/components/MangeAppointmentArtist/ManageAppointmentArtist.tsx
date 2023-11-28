import DropdownFilter from '@/components/DropdownFilter/DropdownFilter';
import { Group, Input, Pagination, SimpleGrid, rem } from '@mantine/core';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IAppointmentStudio, statusAppointmentMap, useGetListAppointmentArtist } from '@/features/appointments';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { useGetListServiceStudio } from '@/features/services';
import { getDateAppointment } from '@/lib/helper';
import queryClient from '@/lib/react-query';
import { useAuthStore } from '@/store/authStore';
import AppointmentCard from './AppointmentCard';
import { ViewAppointment } from '../ManageAppointment';
import 'dayjs/locale/vi';

export default function ManageAppointmentArtist() {
    const { accountType } = useAuthStore();
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
    const [listStatus, setListStatus] = useState<number[]>([1, 2]);
    const [listService, setListService] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const handleViewAppointment = useDisclosure();
    const [apointmentInfo, setApointmentInfo] = useState<IAppointmentStudio>();
    const dataQuery = useGetListAppointmentArtist(
        {
            page,
            pageSize: 16,
            startDate: date[0]?.toISOString(),
            endDate: date[1]?.toISOString(),
            searchKeyWord: searchKeyword,
            statusList: listStatus,
            serviceList: listService,
        },
        date[0] !== null && date[1] !== null,
    );
    const { data: serviceListStudio } = useGetListServiceStudio({
        page: 0,
        pageSize: 1000,
        searchKeyword: '',
        studioId: accountType?.studioId,
    });

    useEffect(() => {
        const date = getDateAppointment();
        setDate([date.start, date.end]);
        return () => {
            queryClient.invalidateQueries(['appointmentsArtist']);
        };
    }, []);
    return (
        <>
            <Group justify="space-between">
                <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm khách hàng theo tên, số điện thoại, email"
                    className="w-1/2"
                />
                <Group gap={rem(12)}>
                    <DropdownFilter
                        name="Trạng thái"
                        defaultValue={listStatus.map((status) => {
                            return {
                                value: status.toString(),
                                label: statusAppointmentMap[status],
                            };
                        })}
                        listOptions={Object.entries(statusAppointmentMap).map((status) => {
                            return {
                                value: status[0],
                                label: status[1],
                            };
                        })}
                        value={'value'}
                        label={'label'}
                        onChange={(listSelect) => {
                            setListStatus(listSelect.map((status) => Number(status.value)));
                        }}
                    />
                    {serviceListStudio && (
                        <DropdownFilter
                            name="Dịch vụ"
                            listOptions={serviceListStudio?.data.map((service) => {
                                return {
                                    value: service.id,
                                    label: service.name,
                                };
                            })}
                            value={'value'}
                            label={'label'}
                            onChange={(listSelect) => {
                                setListService(listSelect.map((service) => service.value));
                            }}
                        />
                    )}
                    <DatesProvider settings={{ locale: 'vi', firstDayOfWeek: 0, weekendDays: [0] }}>
                        <DatePickerInput
                            valueFormat="DD/MM"
                            placeholder="Chọn khoảng thời gian muốn xem"
                            type="range"
                            value={date}
                            onChange={setDate}
                        />
                    </DatesProvider>
                </Group>
            </Group>
            {dataQuery.data && (
                <>
                    <SimpleGrid cols={{ sm: 1, md: 2 }}>
                        {dataQuery.data.appointments.map((appointment) => {
                            return (
                                <AppointmentCard
                                    handleClick={(appointmentInfo) => {
                                        setApointmentInfo(appointmentInfo);
                                        handleViewAppointment[1].open();
                                    }}
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            );
                        })}
                    </SimpleGrid>
                    <div className="w-full flex justify-end">
                        <Pagination
                            value={page + 1}
                            fw={600}
                            fs="14px"
                            total={
                                (dataQuery.data?.total && Math.ceil(dataQuery.data?.total / dataQuery.data.pageSize)) ||
                                0
                            }
                            onChange={(e) => {
                                setPage(e - 1);
                            }}
                        />
                    </div>
                </>
            )}
            <ViewAppointment handleModalState={handleViewAppointment} apointmentInfo={apointmentInfo} />
        </>
    );
}
