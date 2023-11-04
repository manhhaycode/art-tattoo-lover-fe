import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../api/appointmentAPI';
import { useEffect, useMemo, useState } from 'react';
import { IStudio, getStudio } from '@/features/studios';
import AppointmentCard from '../components/Booking/AppointmentCard';
import { Loader } from '@mantine/core';

export default function UserBookTrackingPage() {
    const [studioData, setStudioData] = useState<{
        [key: string]: IStudio;
    }>({});
    const [studioLoading, setStudioLoading] = useState(false);

    const {
        data: appointments,
        isLoading: appointmentLoading,
        refetch,
    } = useQuery(['appointments'], async () => {
        const res = await getAppointments({
            page: 0,
            pageSize: 10,
        });

        return res;
    });

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

    const isLoading = useMemo(() => {
        return appointmentLoading || studioLoading;
    }, [appointmentLoading, studioLoading]);

    if (isLoading)
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader />
            </div>
        );

    return (
        <div className="px-6 py-4">
            <h1 className="font-semibold text-2xl">Theo dõi lịch hẹn</h1>

            {appointments && appointments.appointments.length > 0 && studioData && (
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
            )}
        </div>
    );
}
