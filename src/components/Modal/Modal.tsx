import React from 'react';
import { HTMLMotionProps, Variants, motion } from 'framer-motion';
import { CloseIcon } from '@/assets/icons';

export default function Modal({
    onClose,
    ...props
}: { children?: React.ReactNode; onClose: () => void } & HTMLMotionProps<'div'>) {
    const variants: Variants = {
        visible: {
            opacity: 1,
            scale: 1,
            display: 'block',
            transition: {
                duration: 0.2,
                ease: 'easeInOut',
            },
        },
        hidden: {
            opacity: 0,
            scale: 0.2,
            transition: {
                duration: 0.2,
                ease: 'easeInOut',
            },
            transitionEnd: { display: 'none' },
        },
    };

    return (
        <motion.div
            className="modal-wrapper"
            initial="hidden"
            animate={props.animate ? 'visible' : 'hidden'}
            variants={{
                visible: { opacity: 1, display: 'flex' },
                hidden: {
                    opacity: 0,
                    transition: {
                        duration: 0.4,
                        ease: 'easeInOut',
                    },
                    transitionEnd: { display: 'none' },
                },
            }}
        >
            <div className="modal-mask"></div>
            <motion.div
                id="main-modal"
                variants={variants}
                className={`modal-container bg-gray-dark shadow-modal w-[520px] rounded-[20px] ` + props.className}
            >
                <button
                    onClick={onClose}
                    className="flex items-center justify-center bg-[rgba(255,255,255,0.04)] h-8 w-8 rounded-[50%] absolute top-4 right-4"
                >
                    <CloseIcon styles={{ width: '24px', height: '24px' }} />
                </button>
            </motion.div>
        </motion.div>
    );
}
