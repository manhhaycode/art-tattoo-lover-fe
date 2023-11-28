import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocate from '@fullcalendar/core/locales/vi';
import EventContent from './EventContent';
import { useEffect, useRef, useState, useCallback } from 'react';
import { updateShift, useGetShiftList, useGetShiftListArtist } from '@/features/shifts';
import { useAuthStore } from '@/store/authStore';
import { Button, Group, Text, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure, useToggle } from '@mantine/hooks';
import GenerateShift from './GenerateShift';
import toast from 'react-hot-toast';
import ManageShiftInfo from './ManageShiftInfo';
import RegisterShift from './RegisterShift';
import CreateShift from './CreateShift';
import { EventImpl } from '@fullcalendar/core/internal';
import queryClient from '@/lib/react-query';
import { EPermission } from '@/features/auth';
import { useUnmount } from 'react-use';
import { getDateShiftList } from '@/lib/helper';

export default function ScheduleWorking() {
    const calendarRef = useRef<FullCalendar>(null);
    const generateShiftState = useDisclosure();
    const [isEdit, toggle] = useToggle();
    const theme = useMantineTheme();
    const { accountType } = useAuthStore();
    const [date, setDate] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const shift = useGetShiftList({ start: date.start, end: date.end, studioId: accountType?.studioId || '' });
    const shiftArtist = useGetShiftListArtist(
        accountType?.role?.id === 5
            ? {
                  start: date.start,
                  end: date.end,
              }
            : {
                  start: '',
                  end: '',
              },
    );
    const manageShiftState = useDisclosure();
    const [isDelete, setIsDelete] = useState(false);
    const registerShiftState = useDisclosure();
    const createShiftState = useDisclosure();
    const [shiftInfo, setShiftInfo] = useState<EventImpl>();

    const refreshData = useCallback(async (idToast?: string, success: boolean = true) => {
        await queryClient.invalidateQueries(['shifts']);
        if (idToast)
            success
                ? toast.success('Cập nhật thành công', {
                      id: idToast,
                  })
                : toast.error('Có lỗi xảy ra trong quá trình cập nhật', {
                      id: idToast,
                  });
    }, []);

    useEffect(() => {
        if (accountType?.role?.id !== 5) {
            if (shift.data && calendarRef.current) {
                calendarRef.current.getApi().removeAllEvents();
                calendarRef.current.getApi().removeAllEventSources();
                calendarRef.current.getApi().addEventSource(shift.data);
            }
        } else {
            if (shiftArtist.data && calendarRef.current && shift.data) {
                shiftArtist.data.forEach((event) => {
                    const index = shift.data.findIndex((e) => e.id === event.id);
                    if (index !== -1) {
                        event.backgroundColor = '#FF3B5C';
                        shift.data[index] = event;
                    } else {
                        shift.data.push(event);
                    }
                });
                calendarRef.current.getApi().removeAllEvents();
                calendarRef.current.getApi().removeAllEventSources();
                calendarRef.current.getApi().addEventSource(shift.data);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shift.data, shiftArtist.data]);

    useUnmount(() => {
        queryClient.invalidateQueries(['shifts']);
        queryClient.invalidateQueries(['shiftsArtist']);
        queryClient.invalidateQueries(['shift']);
    });

    return (
        <>
            <Group justify="space-between">
                <Text className="text-2xl font-semibold" c={theme.colors[theme.primaryColor][6]}>
                    Quản lý lịch làm việc studio
                </Text>
                {accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_ARTISTS_SCHEDULE) && (
                    <Group gap={rem(12)}>
                        {isEdit ? (
                            <Button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const promiseList: unknown[] = [];
                                    if (shift.data) {
                                        for (const event of calendarRef.current!.getApi().getEvents()) {
                                            const eventU = event as EventImpl;
                                            if (!eventU._def.publicId) {
                                                toast.error('Vui lòng nhập đầy đủ thông tin cho các ca làm việc');
                                                return;
                                            } else {
                                                //check if shift is change (start, end)
                                                const shiftData = shift.data.find((shiftE) => shiftE.id === eventU.id);
                                                if (!shiftData) {
                                                    promiseList.push(
                                                        new Promise((resolve, reject) =>
                                                            updateShift({
                                                                shiftId: eventU._def.publicId,
                                                                time: {
                                                                    start: eventU.startStr,
                                                                    end: eventU.endStr,
                                                                },
                                                            })
                                                                .then(resolve)
                                                                .catch(reject),
                                                        ),
                                                    );
                                                }
                                                if (
                                                    shiftData &&
                                                    (shiftData.start + 'Z' !== eventU.startStr ||
                                                        shiftData.end + 'Z' !== eventU.endStr)
                                                ) {
                                                    promiseList.push(
                                                        new Promise((resolve, reject) =>
                                                            updateShift({
                                                                shiftId: eventU._def.publicId,
                                                                time: {
                                                                    start: eventU.startStr,
                                                                    end: eventU.endStr,
                                                                },
                                                            })
                                                                .then(resolve)
                                                                .catch(reject),
                                                        ),
                                                    );
                                                }
                                            }
                                        }
                                    }
                                    const id = toast.loading('Đang cập nhật...');
                                    await Promise.all(promiseList)
                                        .then(() => {
                                            refreshData(id, true);
                                            toggle();
                                        })
                                        .catch(() => refreshData(id, false));
                                }}
                            >
                                Lưu lịch đăng ký
                            </Button>
                        ) : (
                            <Button onClick={() => toggle()}>Sửa lịch đăng ký</Button>
                        )}
                        <Button onClick={generateShiftState[1].toggle}>Tạo lịch theo thời gian hoạt động</Button>
                    </Group>
                )}
            </Group>
            <FullCalendar
                ref={calendarRef}
                timeZone="UTC"
                locale={viLocate}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                droppable={true}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={isEdit}
                selectable={isEdit}
                selectMirror={isEdit}
                dayMaxEvents={true}
                allDaySlot={false}
                stickyHeaderDates={true}
                slotLabelInterval={{ minute: 30 }}
                slotLabelFormat={{ hour: 'numeric', minute: '2-digit', meridiem: false }}
                eventMinHeight={120}
                contentHeight="auto"
                slotMinTime="06:00:00"
                slotMaxTime={{ hour: 23, minute: 30 }}
                select={(arg) => {
                    arg.view.calendar.addEvent(arg);
                    arg.view.calendar.unselect();
                }}
                eventContent={(arg) => (
                    <EventContent
                        isEdit={isEdit}
                        handleAction={(argAction) => {
                            setShiftInfo(argAction.event);
                        }}
                        handleModalInfo={manageShiftState}
                        handleModalRegister={registerShiftState}
                        handleDelete={(e) => setIsDelete(e)}
                        handleModalCreate={createShiftState}
                        arg={arg}
                    />
                )}
                eventAdd={(info) => {
                    const newDate = new Date(info.event.start!);
                    const now = new Date();
                    now.setHours(now.getHours() + 7);
                    const start = newDate.getTime();
                    if (start < now.getTime()) {
                        info.revert();
                    }
                }}
                eventChange={(info) => {
                    const newDate = new Date(info.event.start!);
                    const now = new Date();
                    now.setHours(now.getHours() + 7);
                    const start = newDate.getTime();
                    if (start < now.getTime()) {
                        info.revert();
                    }
                }}
                datesSet={(arg) => {
                    const start = getDateShiftList().start;
                    if (arg.endStr !== date.end && arg.end > start)
                        setDate({ start: start.toISOString(), end: arg.endStr });
                }}
            />
            {accountType?.permissions?.includes(EPermission.MANAGE_STUDIO_ARTISTS_SCHEDULE) && (
                <>
                    <GenerateShift handleModal={generateShiftState} />
                    <ManageShiftInfo handleModal={manageShiftState} shiftInfo={shiftInfo} isDelete={isDelete} />

                    <CreateShift
                        handleModal={createShiftState}
                        shiftCreate={shiftInfo && { start: shiftInfo.startStr, end: shiftInfo.endStr }}
                        shiftInfo={shiftInfo}
                    />
                </>
            )}
            {accountType?.role?.id === 5 && <RegisterShift handleModal={registerShiftState} shiftInfo={shiftInfo} />}
        </>
    );
}
