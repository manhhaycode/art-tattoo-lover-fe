import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useMantineColorScheme } from '@mantine/core';
export default function DropwdownInput({
    children,
    ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    const schema = useMantineColorScheme();

    return (
        <div
            {...props}
            className={twMerge(
                'absolute top-[calc(100%+4px)] left-0 w-full bg-white p-2 rounded-lg ',
                props.className,
                schema.colorScheme === 'dark' && 'bg-gray-dark',
            )}
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            }}
        >
            {children}
        </div>
    );
}
