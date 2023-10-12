import { SearchIcon } from '@/assets/icons';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import { DropdownImage } from '@/components/Dropdown';
import { db } from '@/assets/data';
import Image from '@/components/common/Image';
import Button from '@/components/common/Button';
interface IService {
    id?: string;
    name?: string;
    image?: string;
}

export default function SearchBar({
    clickOutside,
    setClickOutside,
}: {
    clickOutside: boolean;
    setClickOutside: (statte: boolean) => void;
}) {
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const searchSmallRef = useRef<HTMLDivElement>(null);
    const searchBigRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const serviceRef = useRef<HTMLButtonElement>(null);
    const [serviceChoose, setServiceChoose] = useState<IService>({});
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [studioName, setStudioName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleClickSearchSmallBar = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (searchBigRef.current && searchSmallRef.current) {
                e.stopPropagation();
                if (!isSearchBarVisible) {
                    searchBigRef.current.classList.toggle('transform-scale-search-big');
                    searchSmallRef.current.classList.toggle('transform-scale-search-small');
                    document.getElementsByTagName('header')[0].classList.toggle('scale-header');
                    setIsSearchBarVisible(true);
                }
            }
        },
        [isSearchBarVisible],
    );

    const handleCloseSearchBigBar = useCallback(() => {
        if (searchBigRef.current && searchSmallRef.current) {
            if (isSearchBarVisible) {
                searchBigRef.current.classList.toggle('transform-scale-search-big');
                searchSmallRef.current.classList.toggle('transform-scale-search-small');
                inputRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
                serviceRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
                document.getElementsByTagName('header')[0].classList.toggle('scale-header');
                setIsSearchBarVisible(false);
                setIsDropdownVisible(false);
            }
        }
    }, [isSearchBarVisible]);

    const handleCloseSearchBigBarWhenClickOutside = useCallback(
        (e: globalThis.MouseEvent) => {
            if (!document.getElementsByTagName('header')[0].contains(e.target as Node)) {
                handleCloseSearchBigBar();
            }
        },
        [handleCloseSearchBigBar],
    );

    useEffect(() => {
        document.addEventListener('click', handleCloseSearchBigBarWhenClickOutside);
        document.addEventListener('scroll', handleCloseSearchBigBar);
        return () => {
            document.removeEventListener('click', handleCloseSearchBigBarWhenClickOutside);
            document.removeEventListener('scroll', handleCloseSearchBigBar);
        };
    }, [handleCloseSearchBigBar, handleCloseSearchBigBarWhenClickOutside]);

    useEffect(() => {
        if (isDropdownVisible) {
            inputRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
            serviceRef.current?.classList.add('!bg-[rgb(80,82,83)]');
        } else {
            serviceRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
        }
    }, [isDropdownVisible, isSearchBarVisible]);

    useEffect(() => {
        if (clickOutside) {
            setIsDropdownVisible(false);
            setClickOutside(false);
        }
    }, [clickOutside, setClickOutside]);

    useEffect(() => {
        handleCloseSearchBigBar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div
            onClick={(e) => {
                if (!serviceRef.current?.contains(e.target as Node)) {
                    setIsDropdownVisible(false);
                } else {
                    e.stopPropagation();
                }
            }}
        >
            <div
                ref={searchSmallRef}
                className="h-[50px] rounded-3xl bg-search-gray-dark flex h- px-6 gap-x-[20px] items-center cursor-pointer animation-search-small-bar relative"
            >
                <div className="flex gap-x-[10px] h-full items-center">
                    <div
                        className="font-medium text-placeholder-gray h-full flex items-center"
                        onClick={(e) => {
                            setIsDropdownVisible(false);
                            handleClickSearchSmallBar(e);
                            inputRef.current?.classList.add('!bg-[rgb(80,82,83)]');
                        }}
                    >
                        <p>Tìm kiếm Tattoo Studio</p>
                    </div>
                    <div className="border-[1px] border-solid border-[#B0B3B8] h-5"></div>
                    <div
                        className="font-medium text-placeholder-gray h-full flex items-center"
                        onClick={(e) => {
                            setIsDropdownVisible(true);
                            handleClickSearchSmallBar(e);
                        }}
                    >
                        <p>Dịch vụ bất kỳ</p>
                    </div>
                </div>
                <button>
                    <SearchIcon />
                </button>
            </div>
            <div
                ref={searchBigRef}
                className="absolute top-0 left-0 z-0 w-full origin-[50%_0%] animation-search-big-bar transform-scale-search-big px-20 pointer-events-none"
            >
                <div className="pb-3 pointer-events-none">
                    <div className="max-w-[850px] mx-auto pointer-events-none">
                        <div className="flex h-[80px] items-center justify-evenly">
                            <Link to="/" className="font-medium text-lg pointer-events-auto">
                                Artist Nổi Bật
                            </Link>
                            <Link to="/" className="font-medium text-lg pointer-events-auto">
                                News Feed
                            </Link>
                        </div>
                        <div className="h-[66px] rounded-[32px] bg-search-gray-dark flex px-2 items-center cursor-pointer relative justify-between pointer-events-auto">
                            <div className="flex items-center w-full">
                                <Input
                                    typeinput="header"
                                    onClick={() => {
                                        inputRef.current?.classList.add('!bg-[rgb(80,82,83)]');
                                    }}
                                    ref={inputRef}
                                    value={studioName || ''}
                                    onChange={(e) => {
                                        if (e.target.value !== ' ') setStudioName(e.target.value);
                                    }}
                                    className="pl-4 h-12 rounded-3xl w-3/5"
                                    placeholder="Tìm kiếm Tattoo Studio"
                                />
                                <div className="border-[1px] border-solid border-[#B0B3B8] h-8 mx-3"></div>
                                <button
                                    ref={serviceRef}
                                    onClick={() => {
                                        setIsDropdownVisible(true);
                                    }}
                                    className={
                                        'font-medium font-sans text-placeholder-gray hover:bg-[rgb(80,82,83)] w-2/5 h-12 flex items-center rounded-3xl pl-4 relative'
                                    }
                                >
                                    {serviceChoose.name ? (
                                        <p className="text-white">{serviceChoose.name}</p>
                                    ) : (
                                        'Dịch vụ bất kỳ'
                                    )}
                                    <DropdownImage
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        animate={isDropdownVisible}
                                        className="mt-3 py-4 absolute top-full -left-[10px]"
                                    >
                                        <h1 className="font-semibold text-sm ml-1 py-2 mb-5">
                                            Tìm kiếm các dịch vụ Tattoo
                                        </h1>
                                        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                            {db.servicesTattoo.map((service) => {
                                                return (
                                                    <div key={service.id} className="flex flex-col">
                                                        <Image
                                                            onClick={() => {
                                                                setServiceChoose(service);
                                                                setIsDropdownVisible(false);
                                                                serviceRef.current?.classList.add(
                                                                    '!bg-[rgb(58,59,60)]',
                                                                );
                                                                setTimeout(() => {
                                                                    serviceRef.current?.classList.remove(
                                                                        '!bg-[rgb(58,59,60)]',
                                                                    );
                                                                }, 350);
                                                            }}
                                                            style={
                                                                serviceChoose.id === service.id
                                                                    ? { borderColor: '#FF3B5C' }
                                                                    : {}
                                                            }
                                                            className="rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-dropdown"
                                                            src={service.img}
                                                        />
                                                        <div className="flex items-center flex-grow">
                                                            <p className="text-sm mt-2 mx-px">{service.name}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </DropdownImage>
                                </button>
                            </div>
                            <Button
                                isAnimate={true}
                                whileTap={{ scale: 0.8 }}
                                onTap={() => {
                                    handleCloseSearchBigBar();
                                    navigate(
                                        '/search-studio?studioName=' + studioName + '&service=' + serviceChoose.name,
                                    );
                                }}
                                onClick={() => console.log('abcv')}
                                className="!rounded-3xl ml-3"
                            >
                                <SearchIcon styles={{ stroke: '#fff', strokeWidth: '3', width: '20', height: '20' }} />
                                <p className="justify-self-center font-semibold text-base leading-none">Tìm Kiếm</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
