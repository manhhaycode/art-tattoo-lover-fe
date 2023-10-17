import { SearchIcon } from '@/assets/icons';
import { useEffect, useRef, useState } from 'react';
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
    const serviceRef = useRef<HTMLButtonElement>(null);
    const [serviceChoose, setServiceChoose] = useState<IService>({});
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [studioName, setStudioName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleCloseSearchBigBar = () => {
        document.getElementsByTagName('header')[0].classList.remove('scale-header');
        setIsSearchBarVisible(false);
        setIsDropdownVisible(false);
    };

    const handleCloseSearchBigBarWhenClickOutside = (e: globalThis.MouseEvent) => {
        if (!document.getElementsByTagName('header')[0].contains(e.target as Node)) {
            document.getElementsByTagName('header')[0].classList.remove('scale-header');
            setIsSearchBarVisible(false);
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleCloseSearchBigBarWhenClickOutside);
        document.addEventListener('scroll', handleCloseSearchBigBar);
        return () => {
            document.removeEventListener('click', handleCloseSearchBigBarWhenClickOutside);
            document.removeEventListener('scroll', handleCloseSearchBigBar);
        };
    }, []);

    useEffect(() => {
        if (clickOutside) {
            setIsDropdownVisible(false);
            setClickOutside(false);
        }
    }, [clickOutside, setClickOutside]);

    useEffect(() => {
        handleCloseSearchBigBar();
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
                className={
                    'h-[50px] rounded-3xl bg-search-gray-dark flex h- px-6 gap-x-[20px] items-center cursor-pointer animation-search-small-bar relative ' +
                    (isSearchBarVisible ? 'transform-scale-search-small' : '')
                }
            >
                <div className="flex gap-x-[10px] h-full items-center">
                    <div
                        className="font-medium text-placeholder-gray h-full flex items-center"
                        onClick={(e) => {
                            // setIsDropdownVisible(false);
                            e.stopPropagation();
                            setIsSearchBarVisible(true);
                            document.getElementsByTagName('header')[0].classList.add('scale-header');
                        }}
                    >
                        <p>Tìm kiếm Tattoo Studio</p>
                    </div>
                    <div className="border-[1px] border-solid border-[#B0B3B8] h-5"></div>
                    <div
                        className="font-medium text-placeholder-gray h-full flex items-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownVisible(true);
                            setIsSearchBarVisible(true);
                            document.getElementsByTagName('header')[0].classList.add('scale-header');
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
                //
                className={
                    'absolute top-0 left-0 z-0 w-full origin-[50%_0%] animation-search-big-bar px-20 pointer-events-none ' +
                    (!isSearchBarVisible ? 'transform-scale-search-big' : '')
                }
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
                                    onFocus={(e) => {
                                        e.target.classList.add('!bg-[rgb(80,82,83)]');
                                    }}
                                    onBlur={(e) => {
                                        e.target.classList.remove('!bg-[rgb(80,82,83)]');
                                    }}
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
                                        'font-medium font-sans text-placeholder-gray hover:bg-[rgb(80,82,83)] w-2/5 h-12 flex items-center rounded-3xl pl-4 relative ' +
                                        (isDropdownVisible ? '!bg-[rgb(80,82,83)]' : '')
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
                                onClick={() => {
                                    handleCloseSearchBigBar();
                                    navigate(
                                        '/search-studio?searchKeyword=' +
                                            studioName +
                                            +(serviceChoose.name ? '&category=' + serviceChoose.name : ''),
                                    );
                                }}
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
