import { useModalStore } from '@/store/componentStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudioArtists } from '../../api';
import CusSelect from '@/components/common/Select';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { bookAppointment, getStudioShifts } from '../../api/bookingAPI';
import { QUERY_FORMAT, formatStringDate } from '@/lib/helper/dateHelper';
import { clsx } from '@mantine/core';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import queryClient from '@/lib/react-query';

const defaultArtist = {
    label: 'Studio chọn cho bạn',
    value: '',
};

const defaultDate = {
    label: 'Hôm nay',
    value: 'today',
};

const BookingModal = () => {
    const { bookingModal, setBookingModal } = useModalStore();
    const [artist, setArtist] = useState<string>(defaultArtist.value);
    const [date, setDate] = useState<string>(defaultDate.value);
    const [selectedShift, setSelectedShift] = useState<string | null>();
    const [notes, setNotes] = useState<string>('');
    const navigate = useNavigate();

    const { data: artists } = useQuery(['artists'], async () => {
        if (!bookingModal?.studioId) return [];
        const res = await getStudioArtists(bookingModal.studioId);

        return res;
    });

    const { data: shifts } = useQuery(['shifts', artist, date], async () => {
        if (!bookingModal?.studioId) return [];
        const res = await getStudioShifts({
            studioId: bookingModal.studioId,
            artistId: artist ?? undefined,
            start: date === 'today' ? dayjs().format(QUERY_FORMAT) : dayjs(date).startOf('day').format(QUERY_FORMAT),
            end:
                date === 'today'
                    ? dayjs().endOf('day').format(QUERY_FORMAT)
                    : dayjs(date).endOf('day').format(QUERY_FORMAT),
        });

        return res;
    });

    const dateOpts = () => {
        const days = [];
        for (let i = 1; i < 6; i++) {
            days.push(dayjs().add(i, 'day').toDate());
        }

        return days.map((d) => ({
            label: formatStringDate(d),
            value: dayjs(d).format('YYYY-MM-DD'),
        }));
    };

    const reset = () => {
        setArtist(defaultArtist.value);
        setDate(defaultDate.value);
        setSelectedShift(null);
    };

    const { mutate: bookMutate } = useMutation({
        mutationKey: ['booking', bookingModal.studioId, artist, selectedShift],
        mutationFn: async () => {
            if (!bookingModal?.studioId || !selectedShift) {
                toast.error('Vui lòng chọn khung giờ');
                return;
            }

            const res = await bookAppointment({
                shiftId: selectedShift,
                artistId: artist != '' ? artist : undefined,
                notes: notes ?? undefined,
            });

            return res;
        },
        onSuccess() {
            reset();
            setBookingModal(false, null);
            toast.success('Đặt lịch thành công');
            navigate('/user/book-tracking');
            queryClient.invalidateQueries(['appointments']);
        },
        onError() {
            toast.error('Đặt lịch thất bại');
        },
    });

    useEffect(() => {
        reset();
    }, [bookingModal.visible]);

    return (
        <div className="flex flex-col overflow-auto h-full w-full max-w-lg px-10 ">
            <div className="mt-10 w-full">
                <h1 className="text-2xl font-semibold text-center">Đặt lịch ngay</h1>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <div className="">
                    <h4 className="text-lg font-semibold mb-1">Lựa chọn artist</h4>

                    {artists && (
                        <CusSelect
                            className="w-full"
                            width={'100%'}
                            data={[
                                defaultArtist,
                                ...artists.map(
                                    (a) =>
                                        ({
                                            label: a.user.fullName,
                                            value: a.id,
                                        }) ?? [],
                                ),
                            ]}
                            value={artist}
                            onChange={(value) => {
                                if (value === null) return;
                                setArtist(value);
                            }}
                        />
                    )}
                </div>

                <div className="">
                    <h4 className="text-lg font-semibold mb-1">Chọn ngày</h4>

                    <CusSelect
                        className="w-full"
                        width={'100%'}
                        data={[defaultDate, ...dateOpts()]}
                        value={date}
                        onChange={(value) => {
                            if (value === null) return;
                            setDate(value);
                            setSelectedShift(null);
                        }}
                    />
                </div>

                <div className="">
                    <h4 className="text-lg font-semibold mb-1">Lựa chọn khung giờ</h4>

                    <div className="mt-3">
                        {shifts && shifts.length > 0 ? (
                            <div className="flex gap-3 flex-wrap">
                                {shifts.map((s) => (
                                    <button
                                        key={s.id}
                                        className={clsx(
                                            'rounded-md px-4 py-2 text-white font-semibold text-base',
                                            selectedShift === s.id ? 'bg-button-primary' : 'bg-search-gray-dark',
                                        )}
                                        onClick={() => setSelectedShift(s.id)}
                                    >
                                        {dayjs(s.start).format('HH:mm')}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="italic text-sm">Không có khung giờ nào trong ngày. Vui lòng chọn ngày khác</p>
                        )}
                    </div>
                </div>

                <div className="">
                    <h4 className="text-lg font-semibold mb-1">
                        Notes <span className="text-xs font-thin">(không bắt buộc)</span>
                    </h4>

                    <Input
                        typeinput="header"
                        className="h-11 rounded-lg w-full"
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <Button
                    className="mt-2"
                    onClick={() => {
                        if (!selectedShift) {
                            toast.error('Vui lòng chọn khung giờ');
                        } else {
                            bookMutate();
                        }
                    }}
                >
                    Đặt lịch
                </Button>
            </div>
        </div>
    );
};

export default BookingModal;
