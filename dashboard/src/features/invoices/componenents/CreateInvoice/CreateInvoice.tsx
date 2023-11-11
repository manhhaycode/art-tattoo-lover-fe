import {
    AspectRatio,
    Box,
    Button,
    Checkbox,
    Group,
    Image,
    SimpleGrid,
    Text,
    UnstyledButton,
    rem,
    useMantineColorScheme,
} from '@mantine/core';
import { TbLink, TbUserCircle } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import { paymentInvoiceMap } from '@/features/invoices';
import { useInvoiceStore } from '@/store/componentStore';
import { MdPayment } from 'react-icons/md';
import CardImg from '@/assets/img/debit-card.png';
import TransferImg from '@/assets/img/money-transfer.png';
import PayImg from '@/assets/img/pay.png';
import { CaculateIcon } from '@/assets/icons';
import TableInvoice from './TableInvoice';
import SearchUserModal from './SearchUserModal';
import { useDisclosure } from '@mantine/hooks';
import ComboboxAppointment from './ComboboxAppointment';

export default function CreateInvoice() {
    const schema = useMantineColorScheme();
    const { appointment, payMethod, setPayMethod } = useInvoiceStore();
    // const [invoiceArtist, setInvoiceArtist] = useState(appointment?.artist);

    const searchUserState = useDisclosure();

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
                    <Button onClick={searchUserState[1].open} leftSection={<TbLink size={16} />}>
                        Liên kết
                    </Button>
                </Group>
                {appointment?.user ? (
                    <Box className="grid grid-cols-2 gap-x-14 gap-y-6 mt-6">
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Tên khách hàng</Text>
                            <Text className="font-semibold text-sm">{appointment.user.fullName}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Địa chí khách hàng</Text>
                            <Text className="font-semibold text-sm">{appointment.user.address}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Số điện thoại khách hàng</Text>
                            <Text className="font-semibold text-sm">{appointment.user.phone}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Địa chỉ email khách hàng</Text>
                            <Text className="font-semibold text-sm">{appointment.user.email}</Text>
                        </Box>
                        <Box className="flex flex-col gap-y-3">
                            <Text className="font-semibold text-sm">Lịch hẹn của khách hàng</Text>
                            <ComboboxAppointment />
                        </Box>
                    </Box>
                ) : (
                    <Text className="text-base font-medium italic text-red-500 mt-6">
                        Nhấn liên kết để chọn khách hàng, nếu không chọn mặc định là khách ngoài
                    </Text>
                )}
                <SearchUserModal handleModalState={searchUserState} />
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
                    {Object.entries(paymentInvoiceMap).map(([key, value]) => {
                        return (
                            <UnstyledButton
                                key={key}
                                onClick={() => setPayMethod(Number(key))}
                                className={twMerge(
                                    'flex items-center justify-between border border-solid border-transparent rounded px-3 py-4 w-full',
                                    payMethod === Number(key)
                                        ? 'border-[var(--mantine-primary-color-filled)] bg-[var(--mantine-primary-color-light)]'
                                        : '',
                                )}
                            >
                                <Group gap={rem(16)}>
                                    <AspectRatio ratio={1} className="w-12">
                                        <Image
                                            src={Number(key) === 0 ? PayImg : Number(key) === 1 ? TransferImg : CardImg}
                                            alt="banking"
                                        />
                                    </AspectRatio>
                                    <Text className="text-base font-semibold">{value}</Text>
                                </Group>
                                <Checkbox
                                    checked={payMethod === Number(key)}
                                    onChange={(e) => {
                                        if (e.target.checked) setPayMethod(Number(key));
                                    }}
                                    classNames={{ input: 'cursor-pointer' }}
                                    size="md"
                                />
                            </UnstyledButton>
                        );
                    })}
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
                <TableInvoice />
            </Box>
        </Box>
    );
}
