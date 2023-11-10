import TableForm from '@/components/TableForm';
import { ActionIcon, AspectRatio, Badge, Checkbox, Group, Image, Input, Text, rem } from '@mantine/core';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';
import { statusAppointmentMap, useGetListAppointmentStudio } from '@/features/appointments';
import { IAppointmentStudio } from '@/features/appointments';
import queryClient from '@/lib/react-query';
import { EditIcon, UserIcon } from '@/assets/icons';
import { convertStartEndTimeToDisplayFormat, getDateAppointment } from '@/lib/helper';
import AppointmentStatusTag from './AppointmentStatus';
import EditAppointment from './EditAppointment';
import { AiOutlineCheck } from 'react-icons/ai';
import { TbCalendarCancel } from 'react-icons/tb';
import CancelAppointment from './CancelAppointment';
import 'dayjs/locale/vi';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import ViewAppointment from './ViewAppointment';
import DropdownFilter from '@/components/DropdownFilter/DropdownFilter';
import { useGetListServiceStudio } from '@/features/services';
import { useAuthStore } from '@/store/authStore';

export default function ManageAppointment() {
    const { accountType } = useAuthStore();
    const editModalState = useDisclosure(false);
    const cancelModalState = useDisclosure(false);
    const viewModalState = useDisclosure(false);
    const [isedit, setIsEdit] = useState(false);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
    const [listStatus, setListStatus] = useState<number[]>([]);
    const [listService, setListService] = useState<string[]>([]);
    const defaultData = useMemo(() => [], []);
    const dataQuery = useGetListAppointmentStudio(
        {
            page: pageIndex,
            pageSize,
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

    const [dataCancel, setDataCancel] = useState<IAppointmentStudio[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [appointmentChooose, setAppointmentChoose] = useState<IAppointmentStudio>();

    const columns = useMemo<ColumnDef<IAppointmentStudio>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => {
                    return (
                        <Checkbox
                            checked={table.getIsAllPageRowsSelected()}
                            indeterminate={table.getIsSomePageRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />
                    );
                },
                enableSorting: false,
                size: 100,
                cell: ({ row }) => {
                    return (
                        <Checkbox
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    );
                },
            },
            {
                accessorKey: 'user.fullName',
                header: 'Khách hàng đặt lịch',
                cell: ({ row }) => {
                    return (
                        <Group wrap="nowrap" maw={250}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {row.original.user.avatar ? (
                                    <Image src={row.original.user.avatar} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <UserIcon styles={{ height: '24px', width: '24px' }} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold w-full">{row.original.user.fullName}</Text>
                        </Group>
                    );
                },
            },
            {
                accessorKey: 'user.phone',
                header: 'Số điện thoại',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.user.phone}</Text>;
                },
            },
            {
                accessorKey: 'id',
                header: 'Dịch vụ',
                cell: ({ row }) => {
                    return <Badge variant="light">{row.original.service?.name || 'Bất kỳ'}</Badge>;
                },
            },
            {
                accessorKey: 'shiftId',
                header: 'Ca đặt lịch',
                cell: ({ row }) => {
                    return (
                        <>
                            <Text className="text-sm font-semibold">
                                {convertStartEndTimeToDisplayFormat(
                                    new Date(row.original.shift.start + 'Z'),
                                    new Date(row.original.shift.end + 'Z'),
                                )}
                            </Text>
                        </>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái đặt lịch',
                cell: ({ row }) => {
                    return <AppointmentStatusTag status={row.original.status} />;
                },
            },
            {
                id: 'action',
                header: 'Thao tác',
                cell: ({ row }) => {
                    return (
                        <Group>
                            <ActionIcon
                                disabled={row.original.status > 2}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editModalState[1].open();
                                    setIsEdit(true);
                                    setAppointmentChoose(row.original);
                                }}
                            >
                                <EditIcon styles={{ fill: 'currentcolor' }} />
                            </ActionIcon>

                            <ActionIcon
                                disabled={row.original.status !== 0}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editModalState[1].open();
                                    setIsEdit(false);
                                    setAppointmentChoose(row.original);
                                }}
                                color="lime.4"
                            >
                                <AiOutlineCheck />
                            </ActionIcon>
                            <ActionIcon
                                disabled={!row.getIsSelected() || row.original.status >= 2}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    cancelModalState[1].open();
                                    setAppointmentChoose(row.original);
                                }}
                                color="red.6"
                            >
                                <TbCalendarCancel />
                            </ActionIcon>
                        </Group>
                    );
                },
                enableSorting: false,
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataQuery.data],
    );

    const table = useReactTable({
        data: dataQuery.data?.appointments ?? defaultData,
        columns,
        pageCount: dataQuery.data?.total ?? -1,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row) => row.id,
        debugTable: true,
    });

    useEffect(() => {
        const date = getDateAppointment();
        setDate([date.start, date.end]);
        return () => {
            queryClient.invalidateQueries(['appointmentsStudio']);
        };
    }, []);

    useEffect(() => {
        if (dataQuery.data && rowSelection) {
            const listId = Object.keys(rowSelection);
            setDataCancel((prev) => {
                const currentData = dataQuery.data.appointments.filter((data) => {
                    return listId.includes(data.id);
                });

                const filterData = prev.filter((data) => {
                    return listId.includes(data.id);
                });

                // remove duplicate use Set
                const uniqueData = new Set([...filterData, ...currentData]);

                return [...uniqueData];
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelection]);

    return (
        <>
            <Group justify="space-between">
                <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm kiếm nhân viên studio"
                    className="w-1/2"
                />
                <Group gap={rem(12)}>
                    <DropdownFilter
                        name="Trạng thái"
                        listOptions={Object.entries(statusAppointmentMap).map((status) => {
                            return {
                                value: status[0],
                                label: status[1],
                            };
                        })}
                        value={'value'}
                        label={'label'}
                        onChange={(listSelect) => {
                            console.log(listSelect);
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
                                console.log(listSelect);
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
            <TableForm
                handleClickRow={(row) => {
                    viewModalState[1].open();
                    setRowSelection({ [row.id]: true });
                    setAppointmentChoose(row);
                }}
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                table={table}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
            <EditAppointment isEdit={isedit} handleModalState={editModalState} appointmentInfo={appointmentChooose} />
            <ViewAppointment handleModalState={viewModalState} apointmentInfo={appointmentChooose} />
            <CancelAppointment handleModalState={cancelModalState} appointmentList={dataCancel} />
        </>
    );
}
