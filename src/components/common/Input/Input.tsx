import React, { forwardRef } from 'react';

export const stylePasswordInput = {
    innerInput:
        'h-full w-[calc(100%-40px)] !bg-[rgb(58,59,60)] !px-4 placeholder:!font-sans placeholder:!font-medium placeholder:!text-placeholder-gray placeholder:!text-base !text-base !text-white font-[sans-serif] hover:bg-[rgb(80,82,83)] focus:!bg-[rgb(80,82,83)] disabled:!opacity-100 hover:!bg-[rgb(80,82,83)] ',
    input: 'h-full rounded-lg !bg-[rgb(58,59,60)] disabled:!opacity-100 data-[disabled]:!opacity-100 !text-white',
    wrapper: 'h-11',
    rightSection: '!w-10',
};

const Input = forwardRef(function (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        typeinput?: 'primary' | 'header';
    },
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const style = {
        primary: 'bg-white text-black text-base font-normal h-full w-full ',
        header: 'placeholder:font-sans placeholder:font-medium placeholder:text-placeholder-gray text-white pl-4 hover:bg-[rgb(80,82,83)] focus:bg-[rgb(80,82,83)] bg-search-gray-dark disabled:bg-search-gray-dark disabled:opacity-100 ',
    };
    return <input {...props} ref={ref} className={style[props.typeinput || 'primary'] + props.className} />;
});

export default Input;
