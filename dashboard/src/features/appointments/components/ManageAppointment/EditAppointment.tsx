import { AspectRatio, Button, Group, Image, Input, Modal, Select, Text, rem } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IAppointmentStudio, statusAppointmentMap, useUpdateAppointmentMutation } from '@/features/appointments';
import { UserIcon } from '@/assets/icons';
import { IUserStudio, useGetListArtistOfStudio } from '@/features/studio';
import toast from 'react-hot-toast';
import queryClient from '@/lib/react-query';
import ComboboxInfo from '@/components/common/Combobox';
import { useGetShiftList } from '@/features/shifts';
import { convertStartEndTimeToDisplayFormat, getDateShiftList } from '@/lib/helper';
export default function EditAppointment({
    handleModalState,
    isEdit,
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
    isEdit: boolean;
}) {
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState<{ start: Date; end: Date }>();
    const [selectedArtist, setSelectedArtist] = useState<IUserStudio | undefined>();
    const [selectedStatus, setSelectedStatus] = useState(appointmentInfo?.status);
    const [selectedShift, setSelectedShift] = useState(appointmentInfo?.shift);

    const { data } = useGetListArtistOfStudio(appointmentInfo?.shift.studioId || '');
    const shiftList = useGetShiftList({
        start: date?.start.toISOString() || '',
        end: date?.end.toISOString() || '',
        studioId: appointmentInfo?.shift.studioId || '',
    });
    const updateAppointmentMutation = useUpdateAppointmentMutation({
        onSuccess: () => {
            toast.success(isEdit ? 'Cập nhật lịch hẹn thành công' : 'Xác nhận lịch hẹn thành công');
            queryClient.invalidateQueries(['appointmentsStudio']);
            handleModalState[1].close();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (appointmentInfo) {
            setSelectedStatus(appointmentInfo.status);
            setSelectedShift(appointmentInfo.shift);
            setSelectedArtist(appointmentInfo.artist);
            setDuration('');
            setDate(getDateShiftList());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleModalState[0]]);

    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'lg'}
            title={
                <Text className="text-sm font-semibold">
                    {isEdit ? 'Thay đổi thông tin lịch hẹn' : 'Xác nhận lịch hẹn'}
                </Text>
            }
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
                                status: selectedStatus!,
                                shiftId: selectedShift?.id,
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
                                <ComboboxInfo
                                    defaultValue={appointmentInfo.artist?.user.fullName}
                                    options={data}
                                    optionElement={(option) => (
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
                                    )}
                                    onBlurInput={() => {
                                        if (!selectedArtist) {
                                            toast.error('Vui lòng chọn artist trong danh sách');
                                        }
                                    }}
                                    onChangeInput={() => setSelectedArtist(undefined)}
                                    onSubmitOption={(option, setValue) => {
                                        setValue(option.user.fullName);
                                        setSelectedArtist(option);
                                    }}
                                    fieldFind={'id'}
                                    handleFilter={(e, input) => {
                                        return e.filter(
                                            (artist) =>
                                                artist.user.email.includes(input) ||
                                                artist.user.fullName.includes(input),
                                        );
                                    }}
                                />
                            )}
                        </div>
                        {isEdit && (
                            <>
                                <div className="flex flex-col gap-y-2">
                                    <label className="text-sm font-semibold">Ca làm việc</label>
                                    {shiftList.data && (
                                        <ComboboxInfo
                                            gap={1}
                                            defaultValue={`Ca ${convertStartEndTimeToDisplayFormat(
                                                new Date(appointmentInfo.shift.start + 'Z'),
                                                new Date(appointmentInfo.shift.end + 'Z'),
                                            )}`}
                                            options={shiftList.data}
                                            optionElement={(option) => (
                                                <Text className="text-sm font-semibold">
                                                    Ca{' '}
                                                    {convertStartEndTimeToDisplayFormat(
                                                        new Date(option.start + 'Z'),
                                                        new Date(option.end + 'Z'),
                                                    )}
                                                </Text>
                                            )}
                                            onBlurInput={() => {
                                                if (!selectedShift) {
                                                    toast.error('Vui lòng chọn ca trong danh sách');
                                                }
                                            }}
                                            onChangeInput={() => setSelectedShift(undefined)}
                                            onSubmitOption={(option, setValue) => {
                                                setValue(
                                                    `Ca ${convertStartEndTimeToDisplayFormat(
                                                        new Date(option.start + 'Z'),
                                                        new Date(option.end + 'Z'),
                                                    )}`,
                                                );
                                                setSelectedShift(option);
                                            }}
                                            handleFilter={(e, input) => {
                                                return e.filter((shift) =>
                                                    `Ca ${convertStartEndTimeToDisplayFormat(
                                                        new Date(shift.start + 'Z'),
                                                        new Date(shift.end + 'Z'),
                                                    )}`.includes(input),
                                                );
                                            }}
                                            fieldFind={'id'}
                                        ></ComboboxInfo>
                                    )}
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <label className="text-sm font-semibold">Trạng thái lịch hẹn</label>
                                    <Select
                                        value={selectedStatus?.toString()}
                                        onChange={(e) => setSelectedStatus(Number(e!))}
                                        className="text-sm font-semibold"
                                        classNames={{ input: '!px-4 ', dropdown: 'text-sm font-semibold' }}
                                        allowDeselect={false}
                                        withCheckIcon={false}
                                        rightSectionProps={{ className: 'hidden' }}
                                        data={Object.entries(statusAppointmentMap).map(([key, value]) => ({
                                            value: key,
                                            label: value,
                                        }))}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <Group justify="flex-end" mt={rem(16)}>
                        <Button disabled={!selectedArtist || !duration || !selectedShift} type="submit">
                            Xác nhận
                        </Button>
                    </Group>
                </form>
            )}
        </Modal>
    );
}

// (
//     <Combobox
//         onOptionSubmit={(optionValue) => {
//             const artistSelected = data.find((artist) => artist.id === optionValue);
//             setValueArtist(artistSelected!.user.fullName);
//             setSelectedArtist(artistSelected);
//             combobox.closeDropdown();
//         }}
//         store={combobox}
//     >
//         <ComboboxTarget>
//             <TextInput
//                 defaultValue={selectedArtist?.user.fullName}
//                 placeholder="Nhập tên artist hoặc email"
//                 value={valueArtist}
//                 onChange={(event) => {
//                     setValueArtist(event.currentTarget.value);
//                     setSelectedArtist(undefined);
//                     combobox.openDropdown();
//                     combobox.updateSelectedOptionIndex();
//                 }}
//                 onClick={() => combobox.openDropdown()}
//                 onFocus={() => combobox.openDropdown()}
//                 onBlur={() => {
//                     if (!selectedArtist) {
//                         toast.error('Vui lòng chọn artist trong danh sách');
//                     }
//                 }}
//             />
//         </ComboboxTarget>
//         <Combobox.Dropdown>
//             <Combobox.Options className="flex flex-col gap-y-3 p-1">
//                 {filterdOptions.length === 0 ? (
//                     <Combobox.Empty>Nothing found</Combobox.Empty>
//                 ) : (
//                     filterdOptions.map((option) => {
//                         return (
//                             <Combobox.Option key={option.id} value={option.id}>
// <Group wrap="nowrap">
//     <AspectRatio
//         miw={rem(36)}
//         mih={rem(36)}
//         className="rounded-full overflow-hidden relative"
//     >
//         {option.user.avatar ? (
//             <Image
//                 src={option.user.avatar}
//                 className="object-cover w-full h-full"
//             />
//         ) : (
//             <div>
//                 <UserIcon
//                     styles={{
//                         height: '24px',
//                         width: '24px',
//                     }}
//                 />
//             </div>
//         )}
//     </AspectRatio>
//     <Group gap={rem(8)}>
//         <Text className="text-sm font-semibold w-full">
//             {option.user.fullName}
//         </Text>
//         <Text className="text-sm font-semibold w-full">
//             {option.user.email}
//         </Text>
//     </Group>
// </Group>
//                             </Combobox.Option>
//                         );
//                     })
//                 )}
//             </Combobox.Options>
//         </Combobox.Dropdown>
//     </Combobox>
// )
