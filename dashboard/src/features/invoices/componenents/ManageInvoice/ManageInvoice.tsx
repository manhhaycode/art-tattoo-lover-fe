import { useMemo, useState } from 'react';
import { IInvoice, useGetListInvoiceStudio } from '@/features/invoices';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { AspectRatio, Group, Text, rem, Image, Input } from '@mantine/core';
import { UserIcon } from '@/assets/icons';
import { convertGMTtoGMTPlus7, formatStringTime, numbertoPrice } from '@/lib/helper';
import { useDebouncedState } from '@mantine/hooks';
import TableForm from '@/components/TableForm';
import DropdownFilter from '@/components/DropdownFilter/DropdownFilter';
import { useGetListServiceStudio } from '@/features/services';
import { useAuthStore } from '@/store/authStore';
import { useUnmount } from 'react-use';
import queryClient from '@/lib/react-query';
import { useNavigate } from 'react-router-dom';

export default function ManageInvoice() {
    const { accountType } = useAuthStore();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const [serviceList, setServiceList] = useState<string[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const navigate = useNavigate();

    const defaultData = useMemo(() => [], []);
    const { data } = useGetListInvoiceStudio({
        page: pageIndex,
        pageSize,
        searchKeyword,
        serviceList,
    });

    const { data: serviceListStudio } = useGetListServiceStudio({
        page: 0,
        pageSize: 1000,
        searchKeyword: '',
        studioId: accountType?.studioId,
    });

    const columns = useMemo<ColumnDef<IInvoice>[]>(
        () => [
            {
                accessorKey: 'user.fullName',
                header: 'Tên khách hàng',
                cell: ({ row }) => (
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
                ),
            },
            {
                accessorKey: 'user.phone',
                header: 'Số điện thoại',
                cell: ({ row }) => <Text className="text-sm font-semibold">{row.original.user.phone}</Text>,
            },
            {
                accessorKey: 'total',
                header: 'Tổng hóa đơn',
                cell: ({ row }) => <Text className="text-sm font-semibold">{numbertoPrice(row.original.total)}</Text>,
            },
            {
                accessorKey: 'payMethod',
                header: 'Thanh toán',
                cell: ({ row }) => {
                    const payment = row.original.payMethod;
                    return (
                        <Text className="text-sm font-semibold">
                            {payment == 0 ? 'Tiền mặt' : payment == 1 ? 'Thẻ' : 'Chuyển khoản'}
                        </Text>
                    );
                },
            },
            {
                accessorKey: 'appointment.shift.start',
                header: () => 'Lịch hẹn',
                cell: ({ row }) => {
                    const appointment = row.original.appointment;
                    return (
                        <Text className="text-sm font-semibold">
                            {appointment ? formatStringTime(appointment.shift.start) : 'Không có lịch hẹn'}
                        </Text>
                    );
                },
            },
            {
                accessorKey: 'createdAt',
                header: 'Ngày tạo',
                cell: ({ row }) => (
                    <Text className="text-sm font-semibold">
                        {convertGMTtoGMTPlus7(new Date(row.original.createdAt))}
                    </Text>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: data?.invoices || defaultData,
        columns,
        pageCount: data?.total ?? -1,
        state: {
            sorting,
        },
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    useUnmount(() => {
        queryClient.invalidateQueries(['invoicesStudio']);
    });

    return (
        <>
            <Group gap={rem(24)}>
                <Input
                    defaultValue={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                    placeholder="Tìm kiếm hóa đơn theo tên khách hàng, số điện thoại, email..."
                    className="w-1/2"
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
                            setServiceList(listSelect.map((service) => service.value));
                        }}
                    />
                )}
            </Group>
            <TableForm
                handleClickRow={(row) => navigate(`/studio/manage-invoice/view/${row.id}`)}
                handlePagination={setPagination}
                pageIndex={pageIndex}
                pageSize={pageSize}
                table={table}
                total={(data?.total && Math.ceil(data?.total / pageSize)) || 0}
            />
        </>
    );
}
