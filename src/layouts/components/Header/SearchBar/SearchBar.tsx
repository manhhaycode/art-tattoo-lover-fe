import { SearchIcon } from '@/assets/icons';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '@/components/common/Input';
import Modal from '@/components/Modal';

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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studioName, setStudioName] = useState('');
    const location = useLocation();

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
                setIsModalVisible(false);
            }
        }
    }, [isSearchBarVisible]);

    const handleCloseSearchBigBarWhenClickOutside = useCallback(
        (e: globalThis.MouseEvent) => {
            console.log(e.currentTarget, e.target);
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
        if (isModalVisible) {
            inputRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
            serviceRef.current?.classList.add('!bg-[rgb(80,82,83)]');
        } else {
            serviceRef.current?.classList.remove('!bg-[rgb(80,82,83)]');
        }
    }, [isModalVisible, isSearchBarVisible]);

    useEffect(() => {
        if (clickOutside) {
            setIsModalVisible(false);
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
                if (e.target !== serviceRef.current) {
                    setIsModalVisible(false);
                } else if (e.currentTarget.contains(e.target as Node)) {
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
                            setIsModalVisible(false);
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
                            setIsModalVisible(true);
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
                                    type="text"
                                />
                                <div className="border-[1px] border-solid border-[#B0B3B8] h-8 mx-3"></div>
                                <button
                                    ref={serviceRef}
                                    onClick={() => {
                                        setIsModalVisible(true);
                                    }}
                                    className="font-medium font-sans text-placeholder-gray w-2/5 h-12 flex items-center hover:bg-[rgb(80,82,83)] rounded-3xl pl-4 relative"
                                >
                                    Dịch vụ bất kỳ
                                    <Modal
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        animate={isModalVisible}
                                        className="w-[416px] min-h-[500px] bg-gray-dark mt-6 absolute top-full left-0 border-[1px] border-solid border-[#B0B3B8] rounded-3xl"
                                    >
                                        <div>s</div>
                                    </Modal>
                                </button>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                                className="flex gap-x-2 p-[14px] items-center bg-button-primary rounded-3xl min-w-fit ml-3"
                            >
                                <SearchIcon styles={{ stroke: '#fff', strokeWidth: '3', width: '20', height: '20' }} />
                                <p className="justify-self-center font-semibold text-base leading-none">Tìm Kiếm</p>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
