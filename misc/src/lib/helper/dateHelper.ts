import dayjs from 'dayjs';

export const QUERY_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export const formatStringDate = (date: string | Date) => {
    const dayOfweek = dayjs(date).day();

    if (dayOfweek === 0) {
        return 'Chủ nhật ' + dayjs(date).format('DD/MM');
    }

    return `Thứ ${dayOfweek + 1} ${dayjs(date).format('DD/MM')}`;
};

export const formatStringTime = (date: string | Date) => {
    return dayjs(date).format('HH:mm ') + formatStringDate(date);
};

export const generateFromTodayToEndOfWeek = () => {
    const today = dayjs();
    const endOfWeek = dayjs().endOf('week');

    const result = [];

    for (let i = 0; i < 5; i++) {
        const date = today.add(i, 'day');
        if (date.isBefore(endOfWeek)) {
            result.push(date);
        }
    }

    return result;
};
