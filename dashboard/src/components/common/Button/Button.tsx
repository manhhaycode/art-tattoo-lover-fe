import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    typeStyle = 'primary',
    ...props
}: {
    children: React.ReactNode;
    typeStyle?: 'primary' | 'secondary' | 'disabled';
    isAnimate?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    const stytleType = {
        primary:
            'flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit font-sans font-semibold text-base leading-none',
        secondary:
            'flex gap-x-2 p-[14px] items-center justify-center bg-secondary hover:bg-secondary-light rounded-lg min-w-fit font-sans font-semibold text-base leading-none shadow-shadow-dropdown',
        disabled: 'rounded-full px-4 py-2 text-white text-sm font-medium bg-gray-300 ',
    };

    return (
        <button {...props} className={twMerge(stytleType[typeStyle], props.className)}>
            {children}
        </button>
    );
}

export const ButtonSuspense = ({
    children,
    typeStyle = 'primary',
    ...props
}: {
    children: React.ReactNode;
    typeStyle?: 'primary' | 'secondary';
    isAnimate?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const stytleType = {
        primary: 'flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit ',
        secondary: 'rounded-full px-4 py-2 text-white text-sm font-medium bg-secondary hover:bg-secondary-light ',
    };

    return (
        <button {...props} className={stytleType[typeStyle] + props.className}>
            {children}
        </button>
    );
};
