import logo from '@/assets/img/logo.png';
import { MenuIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { UserStatus } from '@/assets/icons/icon';
export default function Header() {
    return (
        <div
            id="header"
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="header-wrapper w-full bg-gray-dark h-20 relative animation-header"
        >
            <div className="header-container flex h-20 mx-auto 2xl:w-[1372px] justify-between items-center relative z-10">
                <div className="flex gap-x-[60px] items-center">
                    <Link to="/">
                        <img width="194" src={logo}></img>
                    </Link>
                    <Link to="/discover" className="font-medium text-lg">
                        Khám Phá
                    </Link>
                </div>
                <SearchBar />
                <div className="flex gap-x-[60px] items-center">
                    <Link to="/become-studio" className="font-medium text-lg">
                        Trở Thành Studio
                    </Link>
                    <button className="bg-button-primary hover:bg-hover-button-primary flex gap-x-4 items-center pl-3 pr-2 py-[1px] rounded-[30px]">
                        <MenuIcon />
                        <UserStatus />
                    </button>
                </div>
            </div>
            <div className="bg-header-stroke bg-repeat-x h-[7px] absolute -bottom-[6px] w-full"></div>
        </div>
    );
}
