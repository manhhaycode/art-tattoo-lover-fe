import CategoryList from '@/components/CategoryList';
import { useLocation } from 'react-router-dom';

export default function SearchStudio() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    return (
        <>
            <div className="list-category h-20 flex items-center w-full sticky top-20 z-[1001] bg-gray-dark category-list-wrapper">
                <CategoryList />
            </div>
            <p>Name: {searchParams.get('studioName')}</p>
            <p>Service: {searchParams.get('service')}</p>
        </>
    );
}
