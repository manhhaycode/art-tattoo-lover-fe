import { SearchIcon } from '@/assets/icons';
import { Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const searchSmallRef = useRef<HTMLDivElement>(null);
    const searchBigRef = useRef<HTMLDivElement>(null);
    const handleClickSearchSmallBar = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            console.log(searchBigRef, searchSmallRef, isSearchBarVisible);
            if (searchBigRef.current && searchSmallRef.current) {
                if (!isSearchBarVisible) {
                    e.stopPropagation();
                    searchBigRef.current.classList.toggle('transform-scale-search-big');
                    searchSmallRef.current.classList.toggle('transform-scale-search-small');
                    document.getElementById('header')?.classList.toggle('h-40');
                    setIsSearchBarVisible(true);
                }
            }
        },
        [isSearchBarVisible],
    );

    const handleClickSearchBigBar = useCallback(() => {
        console.log('on click outside');
        console.log(searchBigRef, searchSmallRef, isSearchBarVisible);
        if (searchBigRef.current && searchSmallRef.current) {
            if (isSearchBarVisible) {
                console.log('click outside');
                searchBigRef.current.classList.toggle('transform-scale-search-big');
                searchSmallRef.current.classList.toggle('transform-scale-search-small');
                document.getElementById('header')?.classList.toggle('h-40');
                setIsSearchBarVisible(false);
            }
        }
    }, [isSearchBarVisible]);

    useEffect(() => {
        document.addEventListener('click', handleClickSearchBigBar);
        return () => document.removeEventListener('click', handleClickSearchBigBar);
    }, [handleClickSearchBigBar]);

    return (
        <Fragment>
            <div
                onClick={handleClickSearchSmallBar}
                ref={searchSmallRef}
                className="h-[50px] rounded-3xl bg-search-gray-dark flex h- px-6 gap-x-[20px] items-center cursor-pointer animation-search-small-bar"
            >
                <div className="flex gap-x-[10px]">
                    <div className="font-medium text-placeholder-gray">Tìm kiếm Tattoo Studio</div>
                    <div className="border-[1px] border-solid border-[#B0B3B8]"></div>
                    <div className="font-medium text-placeholder-gray">Dịch vụ bất kỳ</div>
                </div>
                <button>
                    <SearchIcon />
                </button>
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={searchBigRef}
                className="absolute top-0 left-0 w-full origin-[50%_0%] animation-search-big-bar transform-scale-search-big px-20"
            >
                <div className="pb-3">
                    <div className="max-w-[850px] mx-auto">
                        <div className="flex h-[80px] items-center justify-evenly">
                            <Link to="/" className="font-medium text-lg">
                                Artist Nổi Bật
                            </Link>
                            <Link to="/" className="font-medium text-lg">
                                News Feed
                            </Link>
                        </div>
                        <div className="h-[66px] rounded-[32px] bg-search-gray-dark flex px-6 gap-x-[20px] items-center cursor-pointer relative justify-between">
                            <div className="flex gap-x-56">
                                <div className="font-medium text-placeholder-gray">Tìm kiếm Tattoo Studio</div>
                                <div className="border-[1px] border-solid border-[#B0B3B8] absolute left-1/2 bottom-1/2 h-8 translate-y-[50%]"></div>
                                <div className="font-medium text-placeholder-gray">Dịch vụ bất kỳ</div>
                            </div>
                            <button className="flex gap-x-3 py-2 pl-4 pr-[20px] items-center bg-button-primary rounded-3xl w-[164px]">
                                <SearchIcon styles={{ stroke: '#fff' }} />
                                <p className="justify-self-center font-medium text-lg">Tìm Kiếm</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
