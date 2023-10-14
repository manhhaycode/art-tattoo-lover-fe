import CategoryList from '@/components/CategoryList';
import { ICategory } from '@/features/studios';
import { useDropdownStore, useFilterFormStore } from '@/store/componentStore';
import { useCallback, useEffect } from 'react';
import { useWindowScroll } from 'react-use';

export default function CustomListCategory() {
    const { isVisible, setIsVisible } = useDropdownStore();
    const { filterData, setFilterData, setIsQuery } = useFilterFormStore();
    const scroll = useWindowScroll();

    const handleSelectCategory = useCallback(
        (category: ICategory) => {
            setFilterData({ ...filterData, category: category.id });
            setIsQuery(true);
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
            className="list-category h-20 flex flex-col items-center w-full sticky top-20 z-[1001] opacity-100 bg-gray-dark category-list-wrapper transition-all duration-200 ease-in-out"
            {...(!isVisible && { style: { top: '-80px', opacity: 0 } })}
        >
            <div className="xl:w-[1372px] mx-auto h-full">
                <CategoryList isVisible={isVisible} onClickCategory={handleSelectCategory} />
            </div>
        </div>
    );
}
