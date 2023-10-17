import { IFilter, IWorkingTime } from '@/features/studios';

/* eslint-disable no-useless-escape */
export const encodeStringtoURI = (str: string) => {
    const replaceStr = str.replace(/[,\s]/g, '-');
    return encodeURIComponent(replaceStr);
};

export const convertSlugURL = (str: string) => {
    str = str.toLowerCase();
    return (str = str
        .normalize('NFD')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/[\u0300-\u036f\u1EA0-\u1EF9\u1E00-\u1EFF]/g, '')
        .replace(/[ \[\]()\-\/,.]/g, '-')
        .replace(/-+/g, '-')
        .replace(/-+$/, ''));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSearchParams = (searchParams: any) => {
    const searchQuery = [];

    for (const key in searchParams) {
        if (searchParams[key]) {
            let value = searchParams[key];

            if (Array.isArray(value)) {
                value = value.join(',');
            }

            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);

            searchQuery.push(`${encodedKey}=${encodedValue}`);
        }
    }
    return searchQuery.join('&');
};

export const convertTimeToDisplayFormat = (timeString: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hours, minutes, second] = timeString.split(':').map(Number);
    second;
    if (!isNaN(hours)) {
        let displayTime = `${hours}h`;

        if (!isNaN(minutes)) {
            if (minutes < 10) {
                if (minutes === 0) return displayTime;
                displayTime += `0${minutes}`;
            } else {
                displayTime += `${minutes}`;
            }
        }

        return displayTime;
    }

    return 'Invalid time format';
};

export const convertWorkingTimeToDisplayFormat = (listWorkingTime: IWorkingTime[]) => {
    let listWorkingTimeDisplay = [];
    const listDayOfWeeks = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const workingTimeList = listWorkingTime.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    listWorkingTimeDisplay = workingTimeList.map((workingTime) => {
        const dayOfWeek = listDayOfWeeks[workingTime.dayOfWeek];
        const startTime = convertTimeToDisplayFormat(workingTime.openAt);
        const endTime = convertTimeToDisplayFormat(workingTime.closeAt);
        return `${dayOfWeek} ${startTime} - ${endTime}`;
    });
    return listWorkingTimeDisplay;
};

export const checkFilterEmpty = (filter: IFilter) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sort, ...rest } = filter;
    const restFilter = Object.values(rest);
    return restFilter.some((value) => value !== undefined);
};
