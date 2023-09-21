import { MenuIcon, LogoIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { UserStatus } from '@/assets/icons/icon';
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function Header() {
    const [clickOutside, setClickOutside] = useState(false);
    return (
        <header
            className="sticky top-0 w-full animation-header bg-gray-dark z-[10000] after:bg-gray-dark"
            onClick={(e) => {
                if (e.currentTarget.contains(e.target as Node)) e.stopPropagation();
                setClickOutside(true);
            }}
        >
            <div id="header" className="header-wrapper w-full bg-gray-dark h-20 relative z-[2]">
                <div className="header-container flex h-20 mx-auto 2xl:w-[1372px] justify-between items-center">
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
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            className="bg-button-primary hover:bg-hover-button-primary flex gap-x-4 items-center pl-3 pr-2 py-[1px] rounded-[30px]"
                        >
                            <MenuIcon />
                            <UserStatus />
                        </motion.button>
                    </div>
                </div>
            </div>
        </header>
    );
}
