import {
    AspectRatio,
    Button,
    Combobox,
    ComboboxTarget,
    Group,
    Image,
    Input,
    Modal,
    Text,
    TextInput,
    rem,
    useCombobox,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { IAppointmentStudio, useUpdateAppointmentMutation } from '@/features/appointments';
import { UserIcon } from '@/assets/icons';
import { IUserStudio, useGetListArtistOfStudio } from '@/features/studio';
import toast from 'react-hot-toast';
import queryClient from '@/lib/react-query';

export default function ConfirmAppointment({
    handleModalState,
    appointmentInfo,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    appointmentInfo?: IAppointmentStudio;
}) {
    const [duration, setDuration] = useState('');
    const [value, setValue] = useState('');
    const [selectedArtist, setSelectedArtist] = useState<IUserStudio | undefined>(appointmentInfo?.artist);
    const combobox = useCombobox();

    const { data } = useGetListArtistOfStudio(appointmentInfo?.shift.studioId || '');
    const updateAppointmentMutation = useUpdateAppointmentMutation({
        onSuccess: () => {
            toast.success('Xác nhận lịch hẹn thành công');
            queryClient.invalidateQueries(['appointmentsStudio']);
            handleModalState[1].close();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const filterdOptions =
        data?.filter((artist) => artist.user.email.includes(value) || artist.user.fullName.includes(value)) || [];

    useEffect(() => {
        if (appointmentInfo?.artist) {
            setValue(appointmentInfo.artist.user.fullName);
            setSelectedArtist(appointmentInfo.artist);
        }
        setDuration('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleModalState[0]]);

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'lg'}
            title={<Text className="text-sm font-semibold">Xác nhận lịch hẹn</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            {appointmentInfo && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                        if (!duration)
                            return toast.error('Vui lòng nhập khoảng thời gian giữa các ca', { duration: 1000 });
                        if (duration.match(regex) && selectedArtist)
                            return updateAppointmentMutation.mutate({
                                artistId: selectedArtist.id,
                                status: 1,
                                id: appointmentInfo.id,
                            });
                        else return toast.error('Vui lòng nhập đúng định dạng hh:mm', { duration: 1000 });
                    }}
                >
                    <div className="flex flex-col gap-y-4 w-3/4">
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Thời gian dự kiến hoàn thành</label>
                            <Input
                                onChange={(e) => setDuration(e.currentTarget.value)}
                                value={duration}
                                placeholder="Nhập thời gian dự kiến hoàn thành (dạng hh:mm)"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold">Artist làm việc ca này</label>
                            {data && (
                                <Combobox
                                    onOptionSubmit={(optionValue) => {
                                        const artistSelected = data.find((artist) => artist.id === optionValue);
                                        setValue(artistSelected!.user.fullName);
                                        setSelectedArtist(artistSelected);
                                        combobox.closeDropdown();
                                    }}
                                    store={combobox}
                                >
                                    <ComboboxTarget>
                                        <TextInput
                                            defaultValue={selectedArtist?.user.fullName}
                                            placeholder="Nhập tên artist hoặc email"
                                            value={value}
                                            onChange={(event) => {
                                                setValue(event.currentTarget.value);
                                                setSelectedArtist(undefined);
                                                combobox.openDropdown();
                                                combobox.updateSelectedOptionIndex();
                                            }}
                                            onClick={() => combobox.openDropdown()}
                                            onFocus={() => combobox.openDropdown()}
                                            onBlur={() => {
                                                if (!selectedArtist) {
                                                    toast.error('Vui lòng chọn artist trong danh sách');
                                                }
                                            }}
                                        />
                                    </ComboboxTarget>
                                    <Combobox.Dropdown>
                                        <Combobox.Options className="flex flex-col gap-y-3 p-1">
                                            {filterdOptions.length === 0 ? (
                                                <Combobox.Empty>Nothing found</Combobox.Empty>
                                            ) : (
                                                filterdOptions.map((option) => {
                                                    return (
                                                        <Combobox.Option key={option.id} value={option.id}>
                                                            <Group wrap="nowrap">
                                                                <AspectRatio
                                                                    miw={rem(36)}
                                                                    mih={rem(36)}
                                                                    className="rounded-full overflow-hidden relative"
                                                                >
                                                                    {option.user.avatar ? (
                                                                        <Image
                                                                            src={option.user.avatar}
                                                                            className="object-cover w-full h-full"
                                                                        />
                                                                    ) : (
                                                                        <div>
                                                                            <UserIcon
                                                                                styles={{
                                                                                    height: '24px',
                                                                                    width: '24px',
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </AspectRatio>
                                                                <Group gap={rem(8)}>
                                                                    <Text className="text-sm font-semibold w-full">
                                                                        {option.user.fullName}
                                                                    </Text>
                                                                    <Text className="text-sm font-semibold w-full">
                                                                        {option.user.email}
                                                                    </Text>
                                                                </Group>
                                                            </Group>
                                                        </Combobox.Option>
                                                    );
                                                })
                                            )}
                                        </Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            )}
                        </div>
                    </div>
                    <Group justify="flex-end" mt={rem(16)}>
                        <Button disabled={!selectedArtist || !duration} type="submit">
                            Xác nhận
                        </Button>
                    </Group>
                </form>
            )}
        </Modal>
    );
}
