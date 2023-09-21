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
            className={
                'modal max-w-[850px] bg-gray-dark absolute origin-[50%_5%] w-[436px] shadow-shadow-modal rounded-3xl text-white pr-1 ' +
                props.className
            }
        >
            <div className="p-4 pr-3  overscroll-contain overflow-x-hidden overflow-auto max-h-[calc(100vh-210px)]">
                <div className="mt-2 mb-4 px-5">{children}</div>
            </div>
        </motion.div>
    );
}
