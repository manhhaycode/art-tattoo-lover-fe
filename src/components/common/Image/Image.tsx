import React from 'react';

export default function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div className="w-full pt-[100%] relative">
            <div className="absolute top-0 left-0 bottom-0 right-0">
                <img {...props} className={'object-cover w-full h-full ' + props.className}></img>
            </div>
        </div>
    );
}

export function ImageSlider(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div className="w-full pt-[56.25%] relative">
            <div className="absolute top-0 left-0 bottom-0 right-0">
                <img {...props} className={'object-fill ' + props.className}></img>
            </div>
        </div>
    );
}
