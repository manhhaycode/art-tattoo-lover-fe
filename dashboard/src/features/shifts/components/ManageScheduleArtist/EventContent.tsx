import { EventContentArg } from '@fullcalendar/core';
import { ActionIcon, Box, Flex, Group, Text, rem } from '@mantine/core';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { EPermission } from '@/features/auth';
export default function EventContent({
    arg,
    handleAction,
    handleModalInfo,
    handleDelete,
    handleModalCreate,
    isEdit,
    handleModalRegister,
}: {
    arg: EventContentArg;
    handleAction: (arg: EventContentArg) => void;
    handleModalInfo: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    handleModalRegister: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    handleDelete: (state: boolean) => void;
    handleModalCreate: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    isEdit: boolean;
}) {
    const { accountType } = useAuthStore();
    const navigate = useNavigate();

    return (
        <>
            <Box
                onClick={(e) => {
                    e.stopPropagation();
                    handleAction(arg);
                    handleModalInfo[1].open();
                    handleDelete(false);
                    if (accountType?.role?.id === 5) handleModalRegister[1].open();
                }}
                className="flex flex-col justify-between p-2 h-full"
            >
                <Flex direction={'column'} gap={rem(16)}>
                    <Text className="font-semibold text-sm">Ca: {arg.timeText}</Text>
                    <Text className="font-semibold text-sm">Phòng: 104</Text>
                </Flex>
                {accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_ARTISTS_SCHEDULE) && (
                    <Group gap={rem(8)} wrap="wrap" justify="flex-end">
                        {isEdit && (
                            <>
                                {!arg.event.extendedProps.shiftArtists && (
                                    <ActionIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAction(arg);
                                            handleModalCreate[1].open();
                                        }}
                                        color={'blue.4'}
                                    >
                                        <BiAddToQueue size={20} />
                                    </ActionIcon>
                                )}
                                {arg.event.extendedProps.shiftArtists && (
                                    <>
                                        <ActionIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/studio/dashboard');
                                            }}
                                            color={'green.4'}
                                        >
                                            <AiOutlineEye size={20} />
                                        </ActionIcon>
                                        <ActionIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction(arg);
                                                handleModalInfo[1].open();
                                                handleDelete(true);
                                            }}
                                            color={'red.6'}
                                        >
                                            <AiOutlineDelete size={20} />
                                        </ActionIcon>
                                    </>
                                )}
                            </>
                        )}
                    </Group>
                )}
            </Box>
        </>
    );
}
