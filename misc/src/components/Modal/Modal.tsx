import React from 'react';
import { HTMLMotionProps, Variants, m } from 'framer-motion';
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
        <m.div
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
            <m.div
                id="main-modal"
                variants={variants}
                onAnimationStart={() => {
                    if (props.animate) {
                        document.body.classList.add('overflow-hidden');
                    } else {
                        document.body.classList.remove('overflow-hidden');
                    }
                }}
                className={
                    `modal modal-container bg-gray-dark shadow-modal min-w-[520px] rounded-[20px] !overflow-auto relative ` +
                    props.className
                }
            >
                <button
                    onClick={onClose}
                    className="flex items-center justify-center bg-[rgba(255,255,255,0.04)] h-8 w-8 rounded-[50%] absolute top-4 right-4"
                >
                    <CloseIcon styles={{ width: '24px', height: '24px' }} />
                </button>
            </m.div>
        </m.div>
    );
}
