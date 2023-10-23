import { DropdownIcon, LogoIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import SearchBar from './SearchBar';
import { useDropdownStore } from '@/store/componentStore';

// const SearchBar = lazy(() => import('./SearchBar'));
const Menu = lazy(() => import('./Menu'));

export default function Header() {
    const [clickOutside, setClickOutside] = useState(false);
    const { isVisible, setIsVisible } = useDropdownStore();
    return (
        <header
            className="sticky top-0 w-full animation-header bg-gray-dark z-[999] after:bg-gray-dark"
            onClick={(e) => {
                if (e.currentTarget.contains(e.target as Node)) e.stopPropagation();
                setClickOutside(true);
            }}
        >
            <div id="header" className="header-wrapper w-full bg-gray-dark h-20 relative z-[2]">
                <div className="header-container flex h-20 mx-auto 2xl:w-[1372px] w-[calc(100%-4rem)] justify-between items-center">
                    <div className="flex gap-x-[60px] items-center">
                        <Link to="/">
                            <LogoIcon styles={{ fill: '#fff' }} />
                        </Link>
                        <Link to="/discovery" className="font-medium text-lg cursor-pointer h-12 flex items-center ">
                            Khám Phá
                        </Link>
                    </div>
                    <SearchBar clickOutside={clickOutside} setClickOutside={setClickOutside} />

                    <div className="flex gap-x-[60px] items-center">
                        <Link to="/become-studio" className="font-medium text-lg h-12 flex items-center">
                            Trở Thành Studio
                        </Link>
                    </div>
                    <Suspense fallback={<div></div>}>
                        <Menu />
                    </Suspense>
                </div>
            </div>
            <div className="absolute top-20 left-1/2">
                {!isVisible && (
                    <button onClick={() => setIsVisible(true)}>
                        <DropdownIcon />
                    </button>
                )}
            </div>
        </header>
    );
}