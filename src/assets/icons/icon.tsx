import { CSSProperties } from 'react';

export const MenuIcon = ({ styles }: { styles?: CSSProperties }) => (
    <svg style={styles} xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
        <line x1="6.55671e-08" y1="1.25" x2="14" y2="1.25" stroke="#F5F5F5" strokeWidth="1.5" />
        <line x1="6.55671e-08" y1="5.25" x2="14" y2="5.25" stroke="#F5F5F5" strokeWidth="1.5" />
        <line x1="6.55671e-08" y1="9.25" x2="14" y2="9.25" stroke="#F5F5F5" strokeWidth="1.5" />
    </svg>
);

export const UserStatus = ({ styles }: { styles?: CSSProperties }) => (
    <svg style={styles} xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36" fill="none">
        <circle cx="17" cy="19" r="15" fill="#0A1117" />
        <circle cx="28" cy="6" r="5.5" fill="#3CFF38" stroke="white" />
        <mask
            id="mask0_261_78"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="4"
            y="6"
            width="26"
            height="26"
        >
            <circle cx="17" cy="19" r="12.1875" fill="#0A1117" />
        </mask>
        <g mask="url(#mask0_261_78)">
            <circle cx="17" cy="17.125" r="6.5625" fill="white" />
            <circle cx="17" cy="33.0625" r="11.25" fill="white" />
        </g>
    </svg>
);

export const SearchIcon = ({ styles }: { styles?: CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path
            d="M11.5 19C15.9183 19 19.5 15.4183 19.5 11C19.5 6.58172 15.9183 3 11.5 3C7.08172 3 3.5 6.58172 3.5 11C3.5 15.4183 7.08172 19 11.5 19Z"
            stroke={styles?.stroke || '#B0B3B8'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M21.85 21L17.5 16.65"
            stroke={styles?.stroke || '#B0B3B8'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
