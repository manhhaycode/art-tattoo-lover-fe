import React, { forwardRef } from 'react';

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
