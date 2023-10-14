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
