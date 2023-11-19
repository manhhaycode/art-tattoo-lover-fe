import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div className="w-full pt-[100%] relative max-w-full">
            <div className="absolute top-0 left-0 bottom-0 right-0 h-full max-w-full w-full">
                <img {...props} className={twMerge('object-cover w-full h-full ', props.className)}></img>
            </div>
        </div>
    );
}

export function ImageSlider(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div className="w-full pt-[56.25%] relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 h-full">
                <img {...props} className={twMerge('object-cover w-full h-full ', props.className)}></img>
            </div>
        </div>
    );
}
