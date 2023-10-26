import { createTheme } from '@mantine/core';
const theme1 = createTheme({
    primaryColor: 'light-blue',
    defaultGradient: { to: 'light-blue' },
    primaryShade: 4,
    colors: {
        'light-blue': [
            '#e0fbff',
            '#cbf2ff',
            '#9ae2ff',
            '#64d2ff',
            '#3cc5fe',
            '#23bcfe',
            '#09b8ff',
            '#00a1e4',
            '#0090cd',
            '#007cb5',
        ],
        'deep-orange': [
            '#fff4e2',
            '#ffe9cc',
            '#ffd09c',
            '#fdb766',
            '#fca13a',
            '#fb931d',
            '#fc8c0c',
            '#e17900',
            '#c86a00',
            '#ae5a00',
        ],
    },
});

const theme2 = createTheme({
    primaryColor: 'deep-orange',
    defaultGradient: { to: 'deep-orange' },
    primaryShade: 4,
    colors: {
        'light-blue': [
            '#e0fbff',
            '#cbf2ff',
            '#9ae2ff',
            '#64d2ff',
            '#3cc5fe',
            '#23bcfe',
            '#09b8ff',
            '#00a1e4',
            '#0090cd',
            '#007cb5',
        ],
        'deep-orange': [
            '#fff4e2',
            '#ffe9cc',
            '#ffd09c',
            '#fdb766',
            '#fca13a',
            '#fb931d',
            '#fc8c0c',
            '#e17900',
            '#c86a00',
            '#ae5a00',
        ],
    },
});

export const themeList = [theme1, theme2];
