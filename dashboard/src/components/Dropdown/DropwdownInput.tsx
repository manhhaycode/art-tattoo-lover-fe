import React from 'react';

export default function DropwdownInput({
    children,
    ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={'absolute top-[calc(100%+4px)] left-0 w-full bg-white p-2 rounded-lg ' + props.className}
        >
            {children}
        </div>
    );
}
