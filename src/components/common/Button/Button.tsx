import { HTMLMotionProps, m } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

export default function Button({
    children,
    typeStyle = 'primary',
    isAnimate = true,
    ...props
}: {
    children: React.ReactNode;
    typeStyle?: 'primary' | 'secondary';
    isAnimate?: boolean;
} & HTMLMotionProps<'button'>) {
    const stytleType = {
        primary:
            'flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit font-sans font-semibold text-base leading-none ',
        secondary: 'rounded-full px-4 py-2 text-white text-sm font-medium bg-secondary hover:bg-secondary-light ',
    };
    props.transition = isAnimate
        ? props.transition
            ? props.transition
            : { type: 'spring', stiffness: 200, damping: 25 }
        : {};
    return (
        <m.button {...props} className={stytleType[typeStyle] + props.className}>
            {children}
        </m.button>
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
