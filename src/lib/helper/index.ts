export const encodeStringtoURI = (str: string) => {
    const replaceStr = str.replace(/[,\s]/g, '-');
    return encodeURIComponent(replaceStr);
};
