import { Badge } from '@mantine/core';
import { statusAppointmentMap } from '../../types';

const tagColor: {
    [key in keyof typeof statusAppointmentMap]: string;
} = {
    0: 'blue',
    1: 'green',
    2: 'cyan',
    3: 'red',
    4: 'teal',
    5: 'yellow',
};

const AppointmentStatusTag = ({ status }: { status: keyof typeof statusAppointmentMap }) => {
    return <Badge color={tagColor[status]}>{statusAppointmentMap[status]}</Badge>;
};

export default AppointmentStatusTag;
