import { HTMLMotionProps, motion, Variants } from 'framer-motion';

export default function Modal({ children, ...props }: { children: React.ReactNode } & HTMLMotionProps<'div'>) {
    const variants: Variants = props.variants || {
        open: {
            scale: 1,
            opacity: 1,
            display: 'block',
            transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
                delay: 0.1,
                staggerChildren: 0.05,
            },
        },
        closed: {
            scale: 0,
            opacity: 0,
            transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
            },
            transitionEnd: { display: 'none' },
        },
    };
    return (
        <motion.div
            {...props}
            initial="closed"
            animate={props.animate ? 'open' : 'closed'}
            variants={variants}
            className={'max-w-[850px] bg-gray-dark absolute origin-[50%_5%] ' + props.className}
        >
            {children}
        </motion.div>
    );
}
