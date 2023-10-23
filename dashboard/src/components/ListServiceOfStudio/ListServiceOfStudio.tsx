import { IWorkingTime } from '@/features/studios';
import { convertWorkingTimeToDisplayFormat } from '@/lib/helper';
import { useEffect, useRef, useState } from 'react';

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
}
const isElementInBoxContainer = (element: HTMLElement, container: HTMLElement) => {
    const rectE = element.getBoundingClientRect();
    const reacrC = container.getBoundingClientRect();
    return rectE.left >= reacrC.left && rectE.right <= reacrC.right;
};

export default function ListServiceOfStudio({
    listCategory,
    listWorkingTime,
}: {
    listCategory?: ICategory[];
    listWorkingTime?: IWorkingTime[];
}) {
    const listRef = useRef<HTMLDivElement>(null);
    const [countInview, setCountInview] = useState((listCategory || listWorkingTime)?.length || 0);
    const [isResize, setIsResize] = useState(true);
    const workingTimeList = listWorkingTime ? convertWorkingTimeToDisplayFormat(listWorkingTime) : [];

    useEffect(() => {
        window.addEventListener('resize', () => setTimeout(() => setIsResize(true), 250));
        return () => {
            window.removeEventListener('resize', () => setTimeout(() => setIsResize(true), 250));
        };
    }, []);

    useEffect(() => {
        if (listRef.current && isResize) {
            let countElementInView = 0;
            const arrayChild = Array.from(listRef.current.children);
            arrayChild.forEach((child) => {
                if (isElementInBoxContainer(child as HTMLElement, listRef.current as HTMLElement)) {
                    countElementInView++;
                }
            });
            setCountInview(countElementInView);
            setIsResize(false);
        }
    }, [isResize]);

    return (
        <div className="w-full flex flex-col gap-y-3">
            <h1 className="text-lg font-semibold">
                {listCategory ? 'Các loại dịch vụ' : listWorkingTime && 'Khung giờ hoạt động'}
            </h1>
            <div className="overflow-x-hidden w-full category-list-wrapper">
                <div ref={listRef} className="w-[95%] flex flex-nowrap gap-x-2">
                    {listCategory &&
                        listCategory.slice(0, 6).map((category, index) => {
                            return (
                                <button
                                    key={category.id}
                                    className="p-[10px] bg-search-gray-dark rounded-lg"
                                    {...(index >= countInview && { style: { visibility: 'hidden' } })}
                                >
                                    <p className="whitespace-nowrap overflow-hidden font-medium font-sans leading-5">
                                        {category.name}
                                    </p>
                                </button>
                            );
                        })}
                    {workingTimeList &&
                        workingTimeList.map((workingTime, index) => {
                            return (
                                <button
                                    key={index}
                                    className="p-[10px] bg-search-gray-dark rounded-lg"
                                    {...(index >= countInview && { style: { visibility: 'hidden' } })}
                                >
                                    <p className="whitespace-nowrap overflow-hidden font-medium leading-5 font-sans">
                                        {workingTime}
                                    </p>
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
