import { useEffect, useRef, useState } from 'react';

export interface ICategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
}
const isElementInBoxContainer = (element: HTMLElement, container: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= (container.clientWidth || element.clientWidth);
};

export default function CategoryOfStudio({ listCategory }: { listCategory: ICategory[] }) {
    const [dimensions, setDimensions] = useState({ width: 0 });
    const listRef = useRef<HTMLDivElement>(null);
    const [countInview, setCountInview] = useState(0);
    const handleResize = () => {
        setTimeout(() => {
            if (listRef.current) {
                setDimensions({ width: listRef.current.clientWidth });
            }
        }, 250);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (listRef.current) {
            let countElementInView = 0;
            const arrayChild = Array.from(listRef.current.children);
            arrayChild.forEach((child) => {
                if (isElementInBoxContainer(child as HTMLElement, listRef.current as HTMLElement)) {
                    countElementInView++;
                }
            });
            setCountInview(countElementInView);
        }
    }, [dimensions.width]);

    return (
        <div className="w-full flex flex-col gap-y-3">
            <h1 className="text-lg font-semibold">Các loại dịch vụ</h1>
            <div className="overflow-x-auto w-full category-list-wrapper">
                <div className="w">
                    {listCategory.map((category) => {
                        return (
                            <button className="p-[10px] bg-search-gray-dark rounded-lg">
                                <p className="whitespace-nowrap overflow-hidden font-medium text-base leading-5">
                                    {category.name}
                                    {countInview}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
