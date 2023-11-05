import TableForm from '@/components/TableForm';
import { ActionIcon, AspectRatio, Badge, Checkbox, Group, Image, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';
import { useGetListAppointmentStudio } from '@/features/appointments';
import { IAppointmentStudio } from '@/features/appointments';
import queryClient from '@/lib/react-query';
import { EditIcon, UserIcon } from '@/assets/icons';
import { convertStartEndTimeToDisplayFormat, getDateAppointment } from '@/lib/helper';
import AppointmentStatusTag from './AppointmentStatus';
import EditAppointment from './EditAppointment';
import { useUnmount } from 'react-use';
import { AiOutlineCheck } from 'react-icons/ai';
import { TbCalendarCancel } from 'react-icons/tb';
import CancelAppointment from './CancelAppointment';

export default function ManageAppointment() {
    const editModalState = useDisclosure(false);
    const cancelModalState = useDisclosure(false);
    const [isedit, setIsEdit] = useState(false);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [date] = useState(getDateAppointment());
    const defaultData = useMemo(() => [], []);
    const dataQuery = useGetListAppointmentStudio({
        page: pageIndex,
        pageSize,
        startDate: date.start.toISOString(),
        endDate: date.end.toISOString(),
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
                    return <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />;
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
                cell: () => {
                    return <Badge variant="light">Xăm kín lưng</Badge>;
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
                                disabled={row.original.status === 3 || row.original.status === 4}
                                onClick={() => {
                                    editModalState[1].open();
                                    setIsEdit(true);
                                    setAppointmentChoose(row.original);
                                }}
                            >
                                <EditIcon />
                            </ActionIcon>

                            <ActionIcon
                                disabled={
                                    row.original.status === 1 || row.original.status === 3 || row.original.status === 4
                                }
                                onClick={() => {
                                    editModalState[1].open();
                                    setIsEdit(false);
                                    setAppointmentChoose(row.original);
                                }}
                                color="lime.4"
                            >
                                <AiOutlineCheck color="black" />
                            </ActionIcon>
                            <ActionIcon
                                disabled={
                                    !row.getIsSelected() || row.original.status === 3 || row.original.status === 4
                                }
                                onClick={() => {
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

    useUnmount(() => {
        queryClient.invalidateQueries(['appointmentsStudio']);
    });

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
                {/* <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm kiếm nhân viên studio"
                    className="w-1/2"
                /> */}
                {/* <AddNewUserStudio refreshData={refreshData} /> */}
            </Group>
            <TableForm
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                table={table}
                total={(dataQuery.data?.total && Math.ceil(dataQuery.data?.total / pageSize)) || 0}
            />
            <EditAppointment isEdit={isedit} handleModalState={editModalState} appointmentInfo={appointmentChooose} />
            {/* <ConfirmAppointment handleModalState={confirmModalState} appointmentInfo={appointmentChooose} /> */}
            <CancelAppointment handleModalState={cancelModalState} appointmentList={dataCancel} />
        </>
    );
}
