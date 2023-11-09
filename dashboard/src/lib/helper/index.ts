import { ERoleId } from '@/features/auth';
import { IWorkingTime } from '@/features/studio';
import Cookies from 'js-cookie';

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

export const getRoleNameById = (id: number): string | undefined => {
    for (const role in ERoleId) {
        if (Number(ERoleId[role]) === id) {
            return role;
        }
    }
    return undefined; // Return undefined if no matching role is found
};

export const resetAuthStore = () => {
    Cookies.remove('tattus-rft');
    Cookies.remove('tattus-at');
    sessionStorage.removeItem('tattus-session');
    sessionStorage.removeItem('tattus-role');
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

export const convertDateToString = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    // const day = date.getDay();
    // const seconds = date.getUTCSeconds();

    const formattedDate = `${hours}:${minutes}`;

    return formattedDate;
};

export const convertStartEndTimeToDisplayFormat = (startTime: Date, endTime: Date) => {
    const listDayOfWeeks = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const Shours = startTime.getUTCHours().toString().padStart(2, '0');
    const Sminutes = startTime.getUTCMinutes().toString().padStart(2, '0');
    const Ehours = endTime.getUTCHours().toString().padStart(2, '0');
    const Eminutes = endTime.getUTCMinutes().toString().padStart(2, '0');
    const dayOfWeek = listDayOfWeeks[startTime.getUTCDay()];
    const formattedDate = `${dayOfWeek} ${Shours}:${Sminutes} - ${Ehours}:${Eminutes}`;
    return formattedDate;
};

export const getDateAppointment = () => {
    const start = new Date();
    const end = new Date();
    // Set the time to midnight (00:00:00)
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);
    end.setUTCDate(start.getDate() + 7);
    return { start, end };
};

export const getDateShiftList = () => {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const start = new Date();
    const end = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    const utcStart = new Date(start.getTime() - timeZoneOffset);
    const utcEnd = new Date(end.getTime() - timeZoneOffset);
    return { start: utcStart, end: utcEnd };
};

export const numbertoPrice = (num: number): string => {
    const numStr: string = num.toString();

    const formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';

    return formattedStr;
};
