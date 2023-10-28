import { ERoleId } from '@/features/auth';
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
