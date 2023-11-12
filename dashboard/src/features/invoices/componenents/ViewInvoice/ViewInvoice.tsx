import {
    AspectRatio,
    Box,
    Checkbox,
    Group,
    Image,
    SimpleGrid,
    Text,
    UnstyledButton,
    rem,
    useMantineColorScheme,
} from '@mantine/core';
import { TbUserCircle } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import { paymentInvoiceMap, useGetInvoiceStudio } from '@/features/invoices';
import { MdPayment } from 'react-icons/md';
import CardImg from '@/assets/img/debit-card.png';
import TransferImg from '@/assets/img/money-transfer.png';
import PayImg from '@/assets/img/pay.png';
import { CaculateIcon } from '@/assets/icons';
import TableInvoice from './TableInvoice';
import { formatStringTime } from '@/lib/helper';

export default function ViewInvoice({ invoiceId }: { invoiceId: string }) {
    const schema = useMantineColorScheme();
    const { data: invoice, isError } = useGetInvoiceStudio(invoiceId);

    if (isError) {
        return <Text className="text-2xl font-semibold text-red-500 mx-auto">Không tìm thấy hóa đơn</Text>;
    }

    return (
        <Box className="flex flex-col gap-y-6">
            <Box
                {...(schema.colorScheme !== 'dark' && {
                    style: {
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    },
                })}
                className={twMerge('rounded-xl p-6 m-0', schema.colorScheme === 'dark' && 'bg-dark-theme')}
            >
                <Group justify="space-between">
                    <Group gap={rem(12)}>
                        <TbUserCircle size={32} />
                        <Text className="text-xl font-semibold">Thông tin khách hàng</Text>
                    </Group>
                </Group>
                {invoice?.appointment?.user ? (
                    <Box className="grid grid-cols-2 gap-x-14 gap-y-6 mt-6">
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Tên khách hàng</Text>
                            <Text className="font-semibold text-sm">{invoice.appointment.user.fullName}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Địa chí khách hàng</Text>
                            <Text className="font-semibold text-sm">{invoice.appointment.user.address}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Số điện thoại khách hàng</Text>
                            <Text className="font-semibold text-sm">{invoice.appointment.user.phone}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Địa chỉ email khách hàng</Text>
                            <Text className="font-semibold text-sm">{invoice.appointment.user.email}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Lịch hẹn của khách hàng</Text>
                            <Text className="font-semibold text-sm">
                                {formatStringTime(invoice.appointment.shift.start)}
                            </Text>
                        </Box>
                    </Box>
                ) : (
                    <Text className="text-base font-medium italic text-red-500 mt-6">Khách hàng ngoài</Text>
                )}
            </Box>

            <Box
                {...(schema.colorScheme !== 'dark' && {
                    style: {
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    },
                })}
                className={twMerge('rounded-xl p-6 m-0', schema.colorScheme === 'dark' && 'bg-dark-theme')}
            >
                <Group gap={rem(12)}>
                    <MdPayment size={32} />
                    <Text className="text-xl font-semibold">Phương thức thanh toán</Text>
                </Group>
                <SimpleGrid cols={{ sm: 1, md: 3 }} className="mt-6">
                    {invoice && (
                        <UnstyledButton className="flex items-center justify-between border border-solid rounded px-3 py-4 w-full border-[var(--mantine-primary-color-filled)] bg-[var(--mantine-primary-color-light)]">
                            <Group gap={rem(16)}>
                                <AspectRatio ratio={1} className="w-12">
                                    <Image
                                        src={
                                            Number(invoice.payMethod) === 0
                                                ? PayImg
                                                : Number(invoice.payMethod) === 1
                                                ? CardImg
                                                : TransferImg
                                        }
                                        alt="banking"
                                    />
                                </AspectRatio>
                                <Text className="text-base font-semibold">{paymentInvoiceMap[invoice.payMethod]}</Text>
                            </Group>
                            <Checkbox readOnly checked={true} classNames={{ input: 'cursor-pointer' }} size="md" />
                        </UnstyledButton>
                    )}
                </SimpleGrid>
            </Box>

            <Box
                {...(schema.colorScheme !== 'dark' && {
                    style: {
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    },
                })}
                className={twMerge('rounded-xl p-6 m-0', schema.colorScheme === 'dark' && 'bg-dark-theme')}
            >
                <Group gap={rem(12)} mb={rem(16)}>
                    <CaculateIcon styles={{ width: 32, height: 32, fill: 'currentcolor' }} />
                    <Text className="text-xl font-semibold">Bảng tính tiền</Text>
                </Group>
                {invoice && <TableInvoice serviceList={invoice.invoiceServices} total={invoice.total} />}
            </Box>
        </Box>
    );
}
