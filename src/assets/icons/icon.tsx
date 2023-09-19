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
    <svg
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B0B3B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const LogoIcon = ({ styles }: { styles?: CSSProperties }) => (
    <svg
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="140.699"
        height="42.017"
        viewBox="0 0 586 175"
    >
        <image
            x="13"
            y="24"
            width="181"
            height="121"
            xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAdCAYAAAAzfpVwAAAEMklEQVRYhcWXfWiWZRTGf7OablFOLWhFaW0Z+ZF9kWnLvkhqpFLIUgpXf7Q+tLG/tgyzWVQUFZlaWSEFrRGaFCmIU8uPsKQ0gmrhNqbhRItRC5uorDhy3XC8ed7nfd/p7Prnee7z3M95rufc577OuQsOj6jA4WLgNzKjFrhc139T5g0IBjmnbwK7gTEZPjQEWAzM0w9VDBCnjAhkJwFPAoOBXcDQhBcWu/uLgGP/F9kmZzuSsMQjgRo3fgL45jTwOwFGdipwqTPeDPRE82qj8WSgVPeFwE2ni+xDbvwp8EM0pzSB7INAKzATeAHYBrwPXDKQZE0NOlxk7wA2RXO+B67VfYfydXAGf33aqIuAPzPMqQY6gc35krXIDnPjzuh5lSNqGAdcAbSk+KsD2rVhYwwHPgC+ApYCRfmS7XPjs6Lny93980AvsEd5/k6K3+GKsKVUcQZ/NflqtZE94MZeYy0XS3T/B7AwevfqHPyPcRI3QTkecANwOF+yP7pxta6ms087e13Cux+l5GVAlaTQ8KGzr0zYyDmRfcuNZwC3Aa9F80Y5TR6qPF4GXAC8qNSIsQ74TLYaRRbJ4iP5EkVqYNeNwO1Z5rap1N4LPAo0AK+45wulAgZb+nOV47aBu908W7GXToasaWlXP97/Th8P6nAj8J70ulG2lS5Xe/UT/SrVYWn3q3IdiJ5fBzyW8v71wHoRKlMJHu+Ijog2lanN5ynNUk5kURX6y41NmnZKbkZn6QVmqmNriOzPROMzgUrgJ+Bl4Jx8yPp+tl4OkLNx0dzuqIAkwYrKZdLPC4F9bs5WrZ7H7/qh5Vn8HkeIbIUjinLRwz78CXA0i7+7ndCvcXbL4ylqgD529vO1glZ6Z+VKdnZkr1YK3KWxbb7HlQ5NJGONmhuD5fk1uv/VtZfbgQekKD87L/YjzcCGNFU6Y0Hx8UbpS3X/E4Gz9axU3dVVwLfKZysCq7WktvPPiz54SE3OFvMte7d+osPNbZW+H1KvHPxYCv0CfJ0W2V7lTTmwJJpznxz45nuTcjro5TKnJNYTFLq5oyVta/XjHq/KHrAtSscTEB8YAypFJHa+XRtio7ON18b6Wx1ZSIVMaHTFY6RUJDRQU7RqiQhpEGO3Er9HuRdSw06/c5yUGcGDrv6vUmlGFW+altafRG5VMNpU9bzq2FmwANiRT2Q9inWaeD1qunvVmzaK8ISoOZmslUDHnqeAe7J9TGjXRtvrjYPS3hD+0WYojzqnIilEm449b7tnzY4o2jAW5emaH8Ok7QtnK1N0r/TzcolsjFuA55RfSTCdLUk4dAYUapXmatznlKNOHZkvx3dK0nKKbIzNIlwfnTIC5qcQRfk9T32FRfxZ9+wNYKxy912taotOKf2KrEeZThT3y9alA+WpgvUSVkQeBlacLNkAWyqTNIuMFY1TDxj1H1K66r8BteOiAAAAAElFTkSuQmCC"
        />
        <path
            id="TATTUS"
            d="M215.517,64.932a7.534,7.534,0,0,0,2.041,5.483,7.223,7.223,0,0,0,5.425,2.1h10.734V126.3a8.011,8.011,0,0,0,2.333,6.008,8.322,8.322,0,0,0,6.067,2.275,8.524,8.524,0,0,0,6.125-2.275,7.9,7.9,0,0,0,2.392-6.008V72.516h10.617a7.023,7.023,0,0,0,7.467-7.467,7.739,7.739,0,0,0-2.042-5.542,7.118,7.118,0,0,0-5.425-2.158H222.983a7.223,7.223,0,0,0-5.425,2.1A7.533,7.533,0,0,0,215.517,64.932Zm74.434,40.834,7.7-27.884,7.817,27.884H289.951Zm37.45,17.267-17.85-57.517a13.115,13.115,0,0,0-4.258-6.359,11.612,11.612,0,0,0-14.117,0,13.11,13.11,0,0,0-4.259,6.359l-18.2,58.45a8.184,8.184,0,0,0-.467,2.567A9.261,9.261,0,0,0,270,132.25q1.75,2.334,5.484,2.333a8,8,0,0,0,5.425-1.866,8.863,8.863,0,0,0,2.858-4.55l2.217-8.284h23.334l2.333,8.167a9.762,9.762,0,0,0,2.917,4.667,7.947,7.947,0,0,0,5.483,1.866,7.064,7.064,0,0,0,5.717-2.508,9.222,9.222,0,0,0,2.1-6.125A11.749,11.749,0,0,0,327.4,123.033Zm0.35-58.1a7.534,7.534,0,0,0,2.041,5.483,7.223,7.223,0,0,0,5.425,2.1h10.734V126.3a8.011,8.011,0,0,0,2.333,6.008,8.322,8.322,0,0,0,6.067,2.275,8.524,8.524,0,0,0,6.125-2.275,7.9,7.9,0,0,0,2.392-6.008V72.516h10.617a7.023,7.023,0,0,0,7.467-7.467,7.739,7.739,0,0,0-2.042-5.542,7.118,7.118,0,0,0-5.425-2.158H335.217a7.223,7.223,0,0,0-5.425,2.1A7.533,7.533,0,0,0,327.751,64.932Zm56.232,0a7.534,7.534,0,0,0,2.042,5.483,7.221,7.221,0,0,0,5.425,2.1h10.734V126.3a8.008,8.008,0,0,0,2.333,6.008,8.322,8.322,0,0,0,6.067,2.275,8.525,8.525,0,0,0,6.125-2.275A7.908,7.908,0,0,0,419.1,126.3V72.516h10.616a7.021,7.021,0,0,0,7.467-7.467,7.738,7.738,0,0,0-2.041-5.542,7.12,7.12,0,0,0-5.426-2.158H391.45a7.221,7.221,0,0,0-5.425,2.1A7.534,7.534,0,0,0,383.983,64.932Zm107.684-8.167A8.324,8.324,0,0,0,485.6,59.04a8.014,8.014,0,0,0-2.333,6.008V108.8q0,5.25-2.684,8.225a10.639,10.639,0,0,1-14.758,0q-2.625-2.976-2.625-8.225V65.049a7.907,7.907,0,0,0-2.392-6.008,8.525,8.525,0,0,0-6.125-2.275,8.324,8.324,0,0,0-6.067,2.275,8.014,8.014,0,0,0-2.333,6.008v44.1a28.982,28.982,0,0,0,1.925,10.791,22.806,22.806,0,0,0,5.483,8.226,24.244,24.244,0,0,0,8.517,5.191,34.5,34.5,0,0,0,22.05,0,24.235,24.235,0,0,0,8.517-5.191,22.808,22.808,0,0,0,5.484-8.226,28.982,28.982,0,0,0,1.925-10.791v-44.1a7.907,7.907,0,0,0-2.392-6.008A8.525,8.525,0,0,0,491.667,56.765ZM555.95,82.2a8.294,8.294,0,0,0,3.966-.933,7.8,7.8,0,0,0,2.8-2.45,8.081,8.081,0,0,0,1.342-3.442,8.559,8.559,0,0,0-.408-4.025,20.648,20.648,0,0,0-8.984-11.142q-6.533-4.025-15.983-4.025a29.688,29.688,0,0,0-10.675,1.808,23.865,23.865,0,0,0-7.992,4.9,20.688,20.688,0,0,0-4.959,7.175,22.034,22.034,0,0,0-1.691,8.517q0,8.4,4.491,13.592t13.242,8.342l12.017,4.317q3.734,1.282,5.075,3.558a9.173,9.173,0,0,1,1.342,4.725,7.179,7.179,0,0,1-2.742,5.775q-2.742,2.275-8.108,2.275a12.263,12.263,0,0,1-7-1.75,9.286,9.286,0,0,1-3.617-4.9q-2.1-6.417-7.934-6.416a7.92,7.92,0,0,0-6.941,3.675,8.349,8.349,0,0,0-1.225,3.5,8.947,8.947,0,0,0,.35,3.791,21.933,21.933,0,0,0,9.625,11.9q6.942,4.2,17.208,4.2a33.486,33.486,0,0,0,11.084-1.75,24.248,24.248,0,0,0,8.517-4.959,22.445,22.445,0,0,0,5.425-7.583,23.644,23.644,0,0,0,1.925-9.625,23.1,23.1,0,0,0-1.634-9.159,19.345,19.345,0,0,0-4.375-6.417,23.806,23.806,0,0,0-6.3-4.317,69.849,69.849,0,0,0-7.292-2.975l-10.033-3.5a11.28,11.28,0,0,1-3.5-1.692,8.821,8.821,0,0,1-1.983-2.042,6.333,6.333,0,0,1-.934-2.042,7.609,7.609,0,0,1-.233-1.692,6.6,6.6,0,0,1,2.333-5.192,9.6,9.6,0,0,1,6.534-2.042q6.417,0,9.45,6.65a9.854,9.854,0,0,0,3.033,3.85A7.644,7.644,0,0,0,555.95,82.2Z"
        />
    </svg>
);

export const ChevronUpIcon = ({ styles }: { styles?: CSSProperties }) => (
    <svg
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);

export const ChevronDownIcon = ({ styles }: { styles?: CSSProperties }) => (
    <svg
        style={styles}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);