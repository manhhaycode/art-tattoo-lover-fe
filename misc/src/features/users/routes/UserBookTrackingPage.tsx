import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../api/appointmentAPI';
import { useEffect, useMemo, useState } from 'react';
import { IStudio, getStudio } from '@/features/studios';
import AppointmentCard from '../components/Booking/AppointmentCard';
import { Pagination } from '@mantine/core';
import { QUERY_FORMAT } from '@/lib/helper/dateHelper';
import dayjs from 'dayjs';
import { AppointmentStatus, AppointmentStatusString } from '../types/appointment';
import CusSelect from '@/components/common/Select';
import Loading from '@/components/Loading';
import { useUnmount } from 'react-use';
import queryClient from '@/lib/react-query';

const PAGE_SIZE = 10;

export default function UserBookTrackingPage() {
    const [studioData, setStudioData] = useState<{
        [key: string]: IStudio;
    }>({});
    const [studioLoading, setStudioLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState<string | null>();

    const {
        data: appointments,
        isLoading: appointmentLoading,
        refetch,
    } = useQuery(
        ['appointments', page, status],
        async () => {
            const res = await getAppointments({
                page,
                pageSize: PAGE_SIZE,
                startDate:
                    status !== AppointmentStatusString.CANCELED
                        ? dayjs().startOf('day').format(QUERY_FORMAT)
                        : undefined,
                statusList: status ? status : undefined,
            });

            return res;
        },
        { keepPreviousData: true },
    );

    // get studio data
    useEffect(() => {
        if (!appointments) return;
        setStudioLoading(true);
        const getData = async () => {
            const studioMap: {
                [key: string]: IStudio;
            } = {};
            const studioIds = [...new Set(appointments.appointments.map((appointment) => appointment.shift.studioId))];

            for (const i in studioIds) {
                const id = studioIds[i];
                const res = await getStudio(id);
                if (res) {
                    studioMap[id] = res as IStudio;
                }
            }

            setStudioData(studioMap);
            setStudioLoading(false);
        };

        getData();
    }, [appointments]);

    useUnmount(() => {
        queryClient.removeQueries(['appointments']);
        queryClient.removeQueries(['studios']);
    });

    const isLoading = useMemo(() => {
        return appointmentLoading || studioLoading;
    }, [appointmentLoading, studioLoading]);

    return (
        <div className="px-6 py-4 w-full">
            <h1 className="font-semibold text-2xl">{status ? 'Lịch hẹn của bạn' : 'Lịch hẹn sắp tới'}</h1>

            <div className="w-full flex justify-end">
                <CusSelect
                    data={Object.keys(AppointmentStatus).map((key) => ({
                        value: key,
                        label: AppointmentStatus[key as keyof typeof AppointmentStatus],
                    }))}
                    placeholder="Trạng thái"
                    value={status}
                    onChange={(value) => {
                        setStatus(value);
                    }}
                />
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {appointments && Object.keys(studioData).length > 0 && appointments.appointments.length > 0 && (
                        <>
                            <p className="text-sm mt-2">Lịch hẹn: {appointments?.total || 0}</p>
                            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                                {appointments.appointments.map((appointment) => {
                                    if (!studioData[appointment.shift.studioId]) return null;
                                    return (
                                        <AppointmentCard
                                            key={appointment.id}
                                            appointment={appointment}
                                            studio={studioData[appointment.shift.studioId]}
                                            refetch={refetch}
                                        />
                                    );
                                })}
                            </div>
                            <div className="w-full flex justify-end">
                                <Pagination
                                    className="ml-auto mt-5"
                                    value={page + 1}
                                    onChange={(value) => {
                                        if (value === page + 1) return;

                                        setPage(value - 1);
                                    }}
                                    size={'md'}
                                    total={
                                        (appointments.total &&
                                            Math.ceil(appointments?.total / appointments.pageSize)) ||
                                        0
                                    }
                                />
                            </div>
                        </>
                    )}
                    {appointments?.appointments.length === 0 && (
                        <p className="text-sm italic mt-2">
                            Bạn chưa có lịch hẹn nào{' '}
                            {AppointmentStatus[status as keyof typeof AppointmentStatus].toLowerCase()}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
