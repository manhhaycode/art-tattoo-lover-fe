import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(function (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        typeinput?: 'primary' | 'header';
        label?: React.LabelHTMLAttributes<HTMLLabelElement>;
        error?: React.LabelHTMLAttributes<HTMLLabelElement>;
    },
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const style = {
        primary: 'bg-white text-black text-base font-normal h-full w-full ',
        header: 'placeholder:font-sans placeholder:font-medium placeholder:text-placeholder-gray text-white pl-4 hover:bg-[rgb(80,82,83)] focus:bg-[rgb(80,82,83)] bg-search-gray-dark disabled:bg-search-gray-dark disabled:opacity-100 ',
    };
    const { label, error, ...propsInput } = props;
    return (
        <>
            {label?.children && (
                <label
                    {...label}
                    className={twMerge('text-white font-semibold text-base block mb-3 ', label.className)}
                ></label>
            )}
            <input
                {...propsInput}
                ref={ref}
                className={twMerge(style[props.typeinput || 'primary'], props.className)}
            />
            {error?.children && (
                <label
                    {...error}
                    className={twMerge('text-red-500  font-semibold text-sm block mt-3 ', error.className)}
                ></label>
            )}
        </>
    );
});

export default Input;
