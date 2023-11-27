import { useMemo, useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useGetListServiceStudio, IService, useUpdateServiceMutation } from '@/features/services';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import TableForm, { SelectCell } from '@/components/TableForm';
import { AspectRatio, Checkbox, Group, rem, Image, Text, Button, ActionIcon, Input } from '@mantine/core';
import { BiCategory } from 'react-icons/bi';
import { convertTimeToDisplayFormat, numbertoPrice } from '@/lib/helper';
import Load from '@/components/common/Load';
import { EditIcon } from '@/assets/icons';
import { TbTrashX } from 'react-icons/tb';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import BasicInfoService from '../BasicInfoService';
import queryClient from '@/lib/react-query';
import toast from 'react-hot-toast';
import DeleteService from './DeleteService';
import { EPermission } from '@/features/auth';
import { IconPhotoPlus } from '@tabler/icons-react';
import ManageMediaService from './ManageMediaService';

export default function ManageServiceStudio() {
    const { accountType } = useAuthStore();
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useDebouncedState('', 300, { leading: true });
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const basicInfoState = useDisclosure();
    const deleteServiceState = useDisclosure();
    const manageMediaState = useDisclosure();
    const [serviceChoose, setServiceChoose] = useState<IService>();
    const defaultData = useMemo(() => [], []);

    const { data, isFetching } = useGetListServiceStudio({
        studioId: accountType?.studioId,
        page: pageIndex,
        searchKeyword,
        pageSize,
    });

    const updateServiceMutation = useUpdateServiceMutation({});

    const [dataDelete, setDataDelete] = useState<IService[]>([]);
    const [dataUpdate, setDataUpdate] = useState<Partial<IService> | null>(null);

    const columns = useMemo<ColumnDef<IService>[]>(
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
                cell: ({ row }) => {
                    return (
                        <Checkbox
                            // disabled={
                            //     accountType?.user?.id !== row.original.userId &&
                            //     (accountType?.role?.id ? accountType.role.id > row.original.user.roleId : false)
                            // }
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    );
                },
            },
            {
                accessorKey: 'name',
                header: 'Tên dịch vụ',
                cell: ({ row }) => {
                    return (
                        <Group wrap="nowrap" maw={250}>
                            <AspectRatio miw={rem(36)} mih={rem(36)} className="rounded-full overflow-hidden relative">
                                {row.original.thumbnail ? (
                                    <Image src={row.original.thumbnail} className="object-cover w-full h-full" />
                                ) : (
                                    <div>
                                        <BiCategory size={20} />
                                    </div>
                                )}
                            </AspectRatio>
                            <Text className="text-sm font-semibold w-full">{row.original.name}</Text>
                        </Group>
                    );
                },
            },
            {
                accessorKey: 'maxPrice',
                header: 'Giá cao nhất',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{numbertoPrice(row.original.maxPrice)}</Text>;
                },
            },
            {
                accessorKey: 'minPrice',
                header: 'Giá thấp nhất',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{numbertoPrice(row.original.minPrice)}</Text>;
                },
            },
            {
                accessorKey: 'expectDuration',
                header: 'Dự kiến',
                cell: ({ row }) => {
                    return (
                        <Text className="text-sm font-semibold">
                            {convertTimeToDisplayFormat(row.original.expectDuration)}
                        </Text>
                    );
                },
            },
            {
                accessorKey: 'discount',
                header: 'Giảm giá',
                cell: ({ row }) => {
                    return <Text className="text-sm font-semibold">{row.original.discount.toString() + '%'}</Text>;
                },
            },
            {
                accessorKey: 'isDisabled',
                header: 'Trạng thái',
                cell: (cellContext) => {
                    return (
                        <SelectCell
                            disabled={!accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_SERVICES)}
                            className="!max-w-[150px]"
                            cellContext={cellContext}
                            data={[
                                {
                                    label: 'Hiển thị dịch vụ',
                                    value: 'false',
                                },
                                {
                                    label: 'Ẩn dịch vụ',
                                    value: 'true',
                                },
                            ]}
                            onChange={(e, service) => {
                                if (e !== service.isDisabled.toString()) {
                                    setDataUpdate({ isDisabled: e === 'true' ? true : false });
                                }
                            }}
                            onClick={() => {
                                if (!cellContext.row.getIsSelected()) setRowSelection({ [cellContext.row.id]: true });
                            }}
                        />
                    );
                },
            },
            {
                id: 'action',
                header: 'Thao tác',
                cell: ({ row }) => {
                    return (
                        <Group>
                            <ActionIcon
                                disabled={!accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_SERVICES)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    basicInfoState[1].open();
                                    setServiceChoose(row.original);
                                }}
                            >
                                <EditIcon styles={{ fill: 'currentcolor' }} />
                            </ActionIcon>

                            <ActionIcon
                                disabled={!accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_BOOKING)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    manageMediaState[1].open();
                                    setServiceChoose(row.original);
                                }}
                                color="lime.4"
                            >
                                <IconPhotoPlus size={16} />
                            </ActionIcon>

                            <ActionIcon
                                disabled={
                                    !row.getIsSelected() ||
                                    !accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_SERVICES)
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteServiceState[1].open();
                                    // setServiceChoose(row.original);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );

    const table = useReactTable({
        data: data?.data ?? defaultData,
        columns,
        pageCount: data?.total ?? -1,
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

    const refreshData = useCallback(async (idToast?: string, success: boolean = true) => {
        queryClient.invalidateQueries(['servicesStudio']);
        queryClient.invalidateQueries(['categories']);
        setRowSelection({});
        if (idToast) {
            if (success) toast.success('Cập nhật thành công', { id: idToast });
            else toast.error('Có lỗi xảy ra trong quá trình cập nhật', { id: idToast });
        }
    }, []);

    useEffect(() => {
        const callAPI = async (promiseList: unknown[]) => {
            const id = toast.loading('Đang cập nhật...');
            await Promise.all(promiseList)
                .then(() => refreshData(id, true))
                .catch(() => refreshData(id, false));
        };
        if (dataUpdate) {
            const promiseList: unknown[] = [];
            Object.keys(rowSelection).map((id) => {
                promiseList.push(
                    new Promise((resolve, reject) =>
                        updateServiceMutation
                            .mutateAsync({ id, ...dataUpdate })
                            .then(resolve)
                            .catch(reject),
                    ),
                );
            });
            callAPI(promiseList);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate]);

    useEffect(() => {
        if (data?.data && rowSelection) {
            const listId = Object.keys(rowSelection);
            setDataDelete((prev) => {
                const currentData = data.data.filter((data) => {
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

    useEffect(() => {
        const pageCount = data?.total && Math.ceil(data.total / pageSize);
        if (pageCount) {
            if (pageIndex > pageCount - 1) {
                setPagination((prev) => {
                    return {
                        ...prev,
                        pageIndex: 0,
                    };
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setRowSelection({});
    }, [searchKeyword]);

    return (
        data && (
            <>
                {isFetching && <Load />}
                <Group justify="space-between">
                    <Input
                        defaultValue={searchKeyword}
                        onChange={(event) => setSearchKeyword(event.currentTarget.value)}
                        placeholder="Tìm kiếm dịch vụ"
                        className="w-1/2"
                    />
                    {accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_SERVICES) && (
                        <Button
                            onClick={() => {
                                basicInfoState[1].open();
                                setServiceChoose(undefined);
                            }}
                        >
                            Thêm dịch vụ
                        </Button>
                    )}
                </Group>
                <TableForm
                    handlePagination={setPagination}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    table={table}
                    total={(data?.total && Math.ceil(data?.total / pageSize)) || 0}
                />
                {accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_SERVICES) && (
                    <>
                        <BasicInfoService
                            handleModalState={basicInfoState}
                            serviceInfo={serviceChoose}
                            refreshData={refreshData}
                        />
                        <DeleteService
                            dataList={dataDelete}
                            handleModalState={deleteServiceState}
                            refreshData={refreshData}
                        />
                        <ManageMediaService
                            serviceInfo={serviceChoose}
                            handleModalState={manageMediaState}
                            refreshData={refreshData}
                        />
                    </>
                )}
            </>
        )
    );
}
