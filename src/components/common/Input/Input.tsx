import React, { forwardRef } from 'react';

const Input = forwardRef(function (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    return (
        <input
            {...props}
            ref={ref}
            className={
                'placeholder:font-sans placeholder:font-medium placeholder:text-placeholder-gray text-white pl-4 hover:bg-[rgb(80,82,83)] focus:bg-[rgb(80,82,83)] bg-search-gray-dark ' +
                props.className
            }
        />
    );
});

export default Input;
