import { AppointmentStatus } from '../../types/appointment';
import { Badge } from '@mantine/core';

const tagColor: {
    [key in keyof typeof AppointmentStatus]: string;
} = {
    0: 'blue',
    1: 'green',
    2: 'cyan',
    3: 'red',
    4: 'teal',
    5: 'yellow',
    6: 'red.6',
};

const AppointmentStatusTag = ({ status }: { status: keyof typeof AppointmentStatus }) => {
    return <Badge color={tagColor[status]}>{AppointmentStatus[status]}</Badge>;
};

export default AppointmentStatusTag;
