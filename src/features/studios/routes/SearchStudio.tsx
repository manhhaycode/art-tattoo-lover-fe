import CategoryList from '@/components/CategoryList';
import { useDropdownStore } from '@/store/componentStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWindowScroll } from 'react-use';

export default function SearchStudio() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const { isVisible, setIsVisible } = useDropdownStore();
    const scroll = useWindowScroll();

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
        <>
            <div
                className="list-category h-20 flex flex-col items-center w-full sticky top-20 z-[1001] opacity-100 bg-gray-dark category-list-wrapper transition-all duration-200 ease-in-out"
                {...(!isVisible && { style: { top: '-80px', opacity: 0 } })}
            >
                <div className="xl:w-[1372px] mx-auto h-full">
                    <CategoryList isVisible={isVisible} />
                </div>
            </div>

            <p>Name: {searchParams.get('studioName')}</p>
            <p>Service: {searchParams.get('service')}</p>
        </>
    );
}
