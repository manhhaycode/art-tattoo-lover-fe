import { useEffect, useRef, useState } from 'react';

const isElementInBoxContainer = (element: HTMLElement, container: HTMLElement) => {
    const rectE = element.getBoundingClientRect();
    const reacrC = container.getBoundingClientRect();
    return rectE.left >= reacrC.left && rectE.right <= reacrC.right;
};

export default function ListItemOfStudio({ listItem, name }: { listItem: string[]; name: string }) {
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [countInview, setCountInview] = useState(listItem.length || 0);
    const [isResize, setIsResize] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', () => setTimeout(() => setIsResize(true), 250));
        return () => {
            window.removeEventListener('resize', () => setTimeout(() => setIsResize(true), 250));
        };
    }, []);

    useEffect(() => {
        if (listRef.current && containerRef.current && isResize) {
            let countElementInView = 0;
            const arrayChild = Array.from(listRef.current.children);
            arrayChild.forEach((child) => {
                if (isElementInBoxContainer(child as HTMLElement, containerRef.current as HTMLElement)) {
                    countElementInView++;
                }
            });
            setCountInview(countElementInView);
            setIsResize(false);
        }
    }, [isResize]);

    return (
        <div ref={containerRef} className="w-full flex flex-col gap-y-3">
            <h1 className="text-base sm:text-lg font-semibold">{name}</h1>
            <div className="overflow-x-hidden w-full category-list-wrapper flex">
                <div ref={listRef} className="max-w-full flex flex-nowrap gap-x-2">
                    {listItem.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className="p-[10px] bg-search-gray-dark rounded-lg"
                                {...(index >= countInview && { style: { visibility: 'hidden' } })}
                            >
                                <p className="whitespace-nowrap overflow-hidden font-medium leading-5 font-sans">
                                    {item}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
