import CategoryList from '@/components/CategoryList';
import { ICategory } from '@/features/studios';
import { useDropdownStore, useFilterFormStore } from '@/store/componentStore';
import { useCallback, useEffect } from 'react';
import { useWindowScroll } from 'react-use';

export default function CustomListCategory({ isLoading }: { isLoading?: boolean }) {
    const { isVisible, setIsVisible } = useDropdownStore();
    const { filterData, setFilterData } = useFilterFormStore();
    const scroll = useWindowScroll();

    const handleSelectCategory = useCallback(
        (category: ICategory) => {
            setFilterData({ ...filterData, category: category.id });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterData],
    );

    useEffect(() => {
        if (scroll.y >= 80) {
            setIsVisible(false);
        } else setIsVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scroll.y]);

    useEffect(() => {
        return () => setIsVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className="list-category h-20 flex flex-col items-center w-full sticky top-20 z-[998] opacity-100 bg-gray-dark category-list-wrapper transition-all duration-200 ease-in-out"
            {...(!isVisible && { style: { top: '-80px', opacity: 0 } })}
        >
            <div className="2xl:w-[1372px] mx-auto w-[calc(100%-4rem)]  h-full">
                <CategoryList
                    isLoading={isLoading}
                    isVisible={isVisible}
                    onClickCategory={handleSelectCategory}
                    onClickAll={() => {
                        setFilterData({ ...filterData, category: undefined });
                    }}
                />
            </div>
        </div>
    );
}
