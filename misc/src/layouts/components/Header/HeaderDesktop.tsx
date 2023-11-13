import { DropdownIcon, LogoIcon } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import SearchBar from './SearchBar';
import { useDropdownStore } from '@/store/componentStore';

// const SearchBar = lazy(() => import('./SearchBar'));
const Menu = lazy(() => import('./Menu'));

export default function HeaderDesktop() {
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
                {/* gap-x-10 */}
                <div className="header-container flex h-20 mx-auto w-[calc(100%-2rem)] 2xl:w-[1372px] sm:w-[calc(100%-4rem)] lg:justify-between items-center">
                    <div className="flex flex-1 md:flex-none lg:flex-1">
                        <div className="flex lg:gap-x-[60px] items-center">
                            <Link to="/">
                                <div className="hidden lg:block">
                                    <LogoIcon styles={{ fill: '#fff' }} />
                                </div>
                                <div className="mr-3 hidden xs:block lg:hidden">
                                    <img
                                        src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAdCAYAAAAzfpVwAAAEMklEQVRYhcWXfWiWZRTGf7OablFOLWhFaW0Z+ZF9kWnLvkhqpFLIUgpXf7Q+tLG/tgyzWVQUFZlaWSEFrRGaFCmIU8uPsKQ0gmrhNqbhRItRC5uorDhy3XC8ed7nfd/p7Prnee7z3M95rufc577OuQsOj6jA4WLgNzKjFrhc139T5g0IBjmnbwK7gTEZPjQEWAzM0w9VDBCnjAhkJwFPAoOBXcDQhBcWu/uLgGP/F9kmZzuSsMQjgRo3fgL45jTwOwFGdipwqTPeDPRE82qj8WSgVPeFwE2ni+xDbvwp8EM0pzSB7INAKzATeAHYBrwPXDKQZE0NOlxk7wA2RXO+B67VfYfydXAGf33aqIuAPzPMqQY6gc35krXIDnPjzuh5lSNqGAdcAbSk+KsD2rVhYwwHPgC+ApYCRfmS7XPjs6Lny93980AvsEd5/k6K3+GKsKVUcQZ/NflqtZE94MZeYy0XS3T/B7AwevfqHPyPcRI3QTkecANwOF+yP7pxta6ms087e13Cux+l5GVAlaTQ8KGzr0zYyDmRfcuNZwC3Aa9F80Y5TR6qPF4GXAC8qNSIsQ74TLYaRRbJ4iP5EkVqYNeNwO1Z5rap1N4LPAo0AK+45wulAgZb+nOV47aBu908W7GXToasaWlXP97/Th8P6nAj8J70ulG2lS5Xe/UT/SrVYWn3q3IdiJ5fBzyW8v71wHoRKlMJHu+Ijog2lanN5ynNUk5kURX6y41NmnZKbkZn6QVmqmNriOzPROMzgUrgJ+Bl4Jx8yPp+tl4OkLNx0dzuqIAkwYrKZdLPC4F9bs5WrZ7H7/qh5Vn8HkeIbIUjinLRwz78CXA0i7+7ndCvcXbL4ylqgD529vO1glZ6Z+VKdnZkr1YK3KWxbb7HlQ5NJGONmhuD5fk1uv/VtZfbgQekKD87L/YjzcCGNFU6Y0Hx8UbpS3X/E4Gz9axU3dVVwLfKZysCq7WktvPPiz54SE3OFvMte7d+osPNbZW+H1KvHPxYCv0CfJ0W2V7lTTmwJJpznxz45nuTcjro5TKnJNYTFLq5oyVta/XjHq/KHrAtSscTEB8YAypFJHa+XRtio7ON18b6Wx1ZSIVMaHTFY6RUJDRQU7RqiQhpEGO3Er9HuRdSw06/c5yUGcGDrv6vUmlGFW+altafRG5VMNpU9bzq2FmwANiRT2Q9inWaeD1qunvVmzaK8ISoOZmslUDHnqeAe7J9TGjXRtvrjYPS3hD+0WYojzqnIilEm449b7tnzY4o2jAW5emaH8Ok7QtnK1N0r/TzcolsjFuA55RfSTCdLUk4dAYUapXmatznlKNOHZkvx3dK0nKKbIzNIlwfnTIC5qcQRfk9T32FRfxZ9+wNYKxy912taotOKf2KrEeZThT3y9alA+WpgvUSVkQeBlacLNkAWyqTNIuMFY1TDxj1H1K66r8BteOiAAAAAElFTkSuQmCC"
                                        className="min-w-[44px] min-h-[30px]"
                                    ></img>
                                </div>
                            </Link>
                            <Link
                                to="/discovery"
                                className="font-medium text-lg cursor-pointer h-12 items-center hidden lg:flex"
                            >
                                Khám Phá
                            </Link>
                        </div>
                        <div className="justify-self-center mx-auto">
                            <SearchBar clickOutside={clickOutside} setClickOutside={setClickOutside} />
                        </div>
                    </div>

                    <div className="flex gap-x-[60px] items-center justify-end flex-none md:flex-1 lg:flex-none">
                        <Link to="/become-studio" className="font-medium text-lg h-12 items-center hidden lg:flex">
                            Trở Thành Studio
                        </Link>
                        <div className="font-medium text-lg h-12 items-center  lgm:mx-auto hidden md:flex lg:hidden whitespace-nowrap">
                            Danh mục
                        </div>
                        <Suspense fallback={<div></div>}>
                            <Menu />
                        </Suspense>
                    </div>
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
