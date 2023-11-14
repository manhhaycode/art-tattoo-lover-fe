import { ColumnDef, useReactTable, getCoreRowModel, RowData } from '@tanstack/react-table';
import { ITableInvoice, useCreateInvoiceMutation } from '@/features/invoices';
import TableForm, { InputCell } from '@/components/TableForm';
import { useMemo, useState, useEffect } from 'react';
import { ActionIcon, Button, Group, Text, rem } from '@mantine/core';
import { TbPlus, TbTrashX } from 'react-icons/tb';
import { numbertoPrice } from '@/lib/helper';
import { useInvoiceStore } from '@/store/componentStore';
import { IService, useGetListServiceStudio } from '@/features/services';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => boolean;
    }
}

export default function TableInvoice() {
    const { appointment, payMethod, reset } = useInvoiceStore();
    const { accountType } = useAuthStore();
    const navigate = useNavigate();
    const { data: serviceList } = useGetListServiceStudio({
        studioId: accountType?.studioId,
        page: 0,
        pageSize: 1000000,
    });
    const [serviceListChoose, setServiceListChoose] = useState<IService[]>([]);
    const createInvoiceMuatation = useCreateInvoiceMutation({
        onSuccess: (data) => {
            console.log(data);
            toast.success('Tạo hóa đơn thành công');
            reset();
            navigate('/studio/manage-invoice');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Tạo hóa đơn thất bại');
        },
    });
    const column = useMemo<ColumnDef<ITableInvoice>[]>(
        () => [
            {
                accessorKey: 'zOrder',
                header: 'STT',
                align: 'center',
                cell: ({ row: { original } }) => {
                    return <Text className="text-sm font-semibold">{original.zOrder}</Text>;
                },
            },
            {
                accessorKey: 'service',
                header: 'Dịch vụ',
                align: 'center',
                cell: (cell) => {
                    return (
                        serviceList && (
                            <InputCell
                                select={{
                                    data: serviceList.data,
                                    value: 'id',
                                    label: 'name',
                                }}
                                formatValue={(value) => {
                                    return serviceList.data.find((e) => e.id === value)?.name || '';
                                }}
                                className="min-w-[300px]"
                                fieldValue={'service'}
                                cellContext={cell}
                            />
                        )
                    );
                },
            },
            {
                accessorKey: 'unitPrice',
                header: 'Đơn giá',
                align: 'center',
                cell: (cell) => {
                    return (
                        <InputCell
                            formatValue={(value) => {
                                return numbertoPrice(Number(value));
                            }}
                            validate={(value) => (value.length > 0 ? Number(value) > 0 : true)}
                            className="w-[150px]"
                            isNumber
                            fieldValue={'unitPrice'}
                            cellContext={cell}
                        />
                    );
                },
            },
            {
                accessorKey: 'quantity',
                header: 'Số lượng',
                align: 'center',
                cell: (cell) => {
                    return (
                        <InputCell
                            defaultValue={1}
                            className="w-[100px]"
                            isNumber
                            fieldValue={'quantity'}
                            validate={(value) => (value.length > 0 ? Number(value) >= 0 : true)}
                            cellContext={cell}
                        />
                    );
                },
            },
            {
                accessorKey: 'discount',
                header: 'Giảm giá',
                align: 'center',
                cell: (cell) => {
                    return (
                        <InputCell
                            formatValue={(e) => {
                                return e + '%';
                            }}
                            validate={(value) => (value.length > 0 ? Number(value) >= 0 : true)}
                            className="w-[100px]"
                            isNumber
                            fieldValue={'discount'}
                            cellContext={cell}
                        />
                    );
                },
            },
            {
                accessorKey: 'amount',
                header: 'Thành tiền',
                align: 'center',
                cell: ({ row: { original } }) => {
                    return <Text className="text-sm font-semibold">{numbertoPrice(original.amount)}</Text>;
                },
            },
            {
                id: 'action',
                header: 'Thao tác',
                cell: ({ row, table }) => {
                    return (
                        <Group>
                            <ActionIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (table.getRowModel().rows.length === 1) return;
                                    table.options.meta?.updateData(row.index, 'zOrder', 0);
                                    setData((old) =>
                                        old
                                            .filter((e) => e.zOrder !== 0)
                                            .map((e) => {
                                                if (e.zOrder > row.index + 1) {
                                                    return {
                                                        ...e,
                                                        zOrder: e.zOrder - 1,
                                                    };
                                                }
                                                return e;
                                            }),
                                    );
                                    setServiceListChoose((old) => {
                                        return old.filter((service) => service.id !== row.original.service);
                                    });
                                }}
                                color="red.6"
                            >
                                <TbTrashX />
                            </ActionIcon>
                        </Group>
                    );
                },
                enableSorting: false,
            },
        ],

        [serviceList],
    );

    const [data, setData] = useState<ITableInvoice[]>([
        {
            zOrder: 1,
            service: appointment?.service?.id || '',
            quantity: 1,
            unitPrice: appointment?.service?.minPrice || 0,
            amount: appointment?.service
                ? appointment.service.minPrice - (appointment.service.discount / 100) * appointment.service.minPrice
                : 0,
            discount: appointment?.service?.discount || 0,
        },
    ]);
    useEffect(() => {
        setData([
            {
                zOrder: 1,
                service: appointment?.service?.id || '',
                quantity: 1,
                unitPrice: appointment?.service?.minPrice || 0,
                amount: appointment?.service
                    ? appointment.service.minPrice - (appointment.service.discount / 100) * appointment.service.minPrice
                    : 0,
                discount: appointment?.service?.discount || 0,
            },
        ]);
    }, [appointment]);

    const table = useReactTable<ITableInvoice>({
        data: data,
        columns: column,
        meta: {
            updateData: (rowIndex, columnId, value) => {
                if (columnId === 'service' && typeof value === 'string' && value.length > 0) {
                    const service = serviceListChoose.find((service) => service.id === value);
                    if (service) {
                        toast.error('Dịch vụ đã được chọn');
                        return false;
                    }
                    setServiceListChoose((old) => {
                        const service = serviceList!.data.find((service) => service.id === value);
                        old.push(service!);
                        return old;
                    });
                }
                setData((old) =>
                    old.map((row, index) => {
                        let amount = row.amount;
                        if (columnId === 'quantity') {
                            const rootAmount = (value as number) * row.unitPrice;
                            amount = rootAmount - (rootAmount * (row.discount as number)) / 100;
                        }
                        if (columnId === 'unitPrice') {
                            const rootAmount = (value as number) * row.quantity;
                            amount = rootAmount - rootAmount * ((row.discount as number) / 100);
                        }
                        if (columnId === 'discount' && Number(value) !== row.discount) {
                            const rootAmount = row.unitPrice * row.quantity;
                            amount = rootAmount - ((value as number) / 100) * rootAmount;
                        }

                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                                amount,
                            };
                        }
                        return row;
                    }),
                );
                return true;
            },
        },
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        enableSorting: false,
    });

    return (
        <div className="flex flex-col gap-y-6">
            {/* className="!min-h-fit !max-h-fit" */}
            <TableForm table={table} />
            <div className="flex flex-col w-full gap-y-6">
                <Group justify="space-between">
                    <Button
                        onClick={() => {
                            setData((old) => [
                                ...old,
                                {
                                    zOrder: old.length + 1,
                                    service: '',
                                    quantity: 1,
                                    unitPrice: 0,
                                    amount: 0,
                                    discount: 0,
                                },
                            ]);
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                        leftSection={<TbPlus />}
                        variant="light"
                    >
                        Thêm dịch vụ
                    </Button>
                    <Group gap={rem(24)}>
                        <Text className="text-lg font-semibold">Tổng tiền:</Text>
                        <Text className="text-lg font-semibold">
                            {numbertoPrice(
                                table.getRowModel().rows.reduce((acc, row) => {
                                    return acc + Number(row.original.amount || 0);
                                }, 0),
                            )}
                        </Text>
                    </Group>
                    <Group justify="flex-end">
                        <Button
                            onClick={() => {
                                const isGuest = appointment?.user ? false : true;
                                const check = table.getRowModel().rows.every((e) => e.original.service !== '');
                                if (!check) {
                                    toast.error('Chọn dịch vụ cho tất cả các hàng');
                                    return;
                                }
                                createInvoiceMuatation.mutate({
                                    // studioId: accountType?.studioId || '',
                                    appointmentId: appointment?.id,
                                    isGuest,
                                    notes: '',
                                    payMethod: payMethod,
                                    total: table.getRowModel().rows.reduce((acc, row) => {
                                        return acc + Number(row.original.amount || 0);
                                    }, 0),
                                    services: table.getRowModel().rows.map((e) => {
                                        return {
                                            serviceId: e.original.service,
                                            quantity: Number(e.original.quantity),
                                            price: Number(e.original.unitPrice),
                                            discount: Number(e.original.discount),
                                        };
                                    }),
                                    userId: appointment?.user?.id,
                                });
                                console.log(table.getRowModel().rows.map((e) => e.original));
                            }}
                        >
                            Tạo hóa đơn
                        </Button>
                    </Group>
                </Group>
            </div>
        </div>
    );
}
