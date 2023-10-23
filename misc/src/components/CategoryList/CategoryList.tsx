import { db } from '@/assets/data';
import Category, { ICategory } from './Category';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from '@/assets/icons';
// import { SkeletonLoader } from '../SkeletonLoader';

const CustomRightArrow = ({ onClick, style }: { onClick?: () => void; style?: React.CSSProperties }) => {
    return (
        <button
            style={style}
            onClick={(e) => {
                if (onClick) onClick();
                e.preventDefault();
            }}
            className="absolute right-3 p-[10px] rounded-[50%] bg-black top-[calc(50%-16px)]"
        >
            <ArrowRightIcon />
        </button>
    );
};

const CustomLeftArrow = ({ onClick, style }: { onClick?: () => void; style?: React.CSSProperties }) => {
    return (
        <button
            style={style}
            onClick={(e) => {
                if (onClick) onClick();
                e.preventDefault();
            }}
            className="absolute left-3 p-[10px] rounded-[50%] bg-black top-[calc(50%-16px)]"
        >
            <ArrowLeftIcon />
        </button>
    );
};

const isElementInBoxContainer = (element: HTMLElement, container: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= (container.clientWidth || element.clientWidth);
};

export default function CategoryList({
    initChooose = '',
    isVisible = true,
    onClickCategory,
    onClickAll,
    isLoading,
}: {
    initChooose?: string;
    isLoading?: boolean;
    isVisible?: boolean;
    onClickCategory?: (category: ICategory) => void;
    onClickAll?: () => void;
}) {
    const [isSelect, setIsSelect] = useState(initChooose);
    const listRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0 });
    const [numberItemInView, setNumberItemInView] = useState(0);
    const [position, setPosition] = useState(db.servicesTattoo.findIndex((item) => item.id === initChooose) + 1 || 0);
    const [isEnd, setIsEnd] = useState(false);
    const [isStart, setIsStart] = useState(false);

    const handleResize = () => {
        setTimeout(() => {
            if (listRef.current) {
                setDimensions({ width: listRef.current.clientWidth });
            }
        }, 250);
    };

    useEffect(() => {
        if (listRef.current) {
            listRef.current.children[position].scrollIntoView({
                block: 'nearest',
                inline: 'end',
            });
            setDimensions({ width: listRef.current!.clientWidth });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (listRef.current && dimensions.width !== 0) {
            let indexLastInView = 0;
            let countElementInView = 0;
            const arrayChild = Array.from(listRef.current.children);
            if (isElementInBoxContainer(arrayChild[0] as HTMLElement, listRef.current as HTMLElement)) {
                setIsStart(true);
            }
            arrayChild.forEach((child, index) => {
                if (isElementInBoxContainer(child as HTMLElement, listRef.current as HTMLElement)) {
                    countElementInView++;
                    indexLastInView = index;
                }
            });
            if (indexLastInView !== arrayChild.length - 1) setIsEnd(false);
            else setIsEnd(true);
            setPosition(indexLastInView);
            setNumberItemInView(countElementInView);
        }
    }, [dimensions.width]);

    return (
        <div className="relative w-full flex h-full">
            <div
                ref={listRef}
                className="grid grid-flow-col gap-x-8 items-center overflow-x-auto overscroll-contain w-full h-full"
            >
                <div className="h-full flex items-center ">
                    <button
                        onClick={() => {
                            setIsSelect('');
                            onClickAll && onClickAll();
                        }}
                        className="flex flex-col gap-y-3 items-center font-sans text-sm"
                    >
                        <HomeIcon
                            styles={
                                isSelect === ''
                                    ? { color: '#FF3B5C', height: '30px', width: '30px' }
                                    : { color: '#B0B3B8', height: '30px', width: '30px' }
                            }
                        />
                        <span
                            className="text-sm font-medium whitespace-nowrap"
                            style={isSelect === '' ? { color: '#FF3B5C' } : { color: 'white' }}
                        >
                            Tất Cả
                        </span>
                    </button>
                    <div className="border-[1px] border-solid border-[#B0B3B8] h-12 ml-8"></div>
                </div>

                {/* {isLoading && (
                    <>
                        {[...Array(10)].map(() => {
                            return (
                                <div className="w-[130px] h-[63px]">
                                    <SkeletonLoader />
                                </div>
                            );
                        })}
                    </>
                )} */}

                {db.servicesTattoo.map((category) => {
                    return (
                        <Category
                            onClick={() => {
                                setIsSelect(category.id);
                                onClickCategory && onClickCategory(category);
                            }}
                            key={category.id}
                            category={category}
                            {...(isSelect === category.id && {
                                styleSelect: {
                                    icon: { stroke: '#FF3B5C' },
                                    text: { color: '#FF3B5C' },
                                },
                            })}
                        />
                    );
                })}
            </div>

            {isVisible && (
                <>
                    <CustomRightArrow
                        onClick={() => {
                            const list = listRef.current;

                            let positionNext =
                                position === 0
                                    ? numberItemInView >= 6
                                        ? position + ((numberItemInView - 1) * 2 - 1)
                                        : position + (numberItemInView * 2 - 1)
                                    : position + (numberItemInView - 1);

                            if (list) {
                                if (positionNext >= list.children.length - 1) {
                                    positionNext = list.children.length - 1;
                                    setTimeout(() => {
                                        setIsEnd(true);
                                    }, 250);
                                }
                                list.children[positionNext].scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest',
                                    inline: 'end',
                                });
                                setPosition(positionNext);
                                setIsStart(false);
                            }
                        }}
                        {...((isEnd || isLoading) && { style: { display: 'none' } })}
                    />
                    <CustomLeftArrow
                        onClick={() => {
                            const list = listRef.current;
                            if (position === 0) return;
                            let positionNext = position - (numberItemInView - 1);
                            if (list) {
                                if (positionNext <= numberItemInView) positionNext = 0;
                                list.children[positionNext].scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest',
                                    inline: 'end',
                                });
                                setTimeout(() => {
                                    setPosition(positionNext);
                                    setIsEnd(false);
                                    setIsStart(false);
                                }, 250);
                            }
                        }}
                        {...((position === 0 || isStart || isLoading) && { style: { display: 'none' } })}
                    />
                </>
            )}
        </div>
    );
}
