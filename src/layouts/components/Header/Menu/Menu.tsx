import { useState } from 'react';
import { MenuIcon } from '@/assets/icons';
import { UserStatus } from '@/assets/icons/icon';
import { Dropdown } from '@/components/Dropdown';
import { useAuthStore } from '@/store/authStore';
import { useClickOutside } from '@mantine/hooks';
import { useModalStore } from '@/store/componentStore';
import { Logout } from '@/features/auth/components';
import Button from '@/components/common/Button';
import { AvartarIcon } from '@/features/users';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/common/Image';
export default function Menu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const { setIsModalVisible, setIsLoginModalVisible, setIsRegisterModalVisible } = useModalStore();
    const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false));
    const { isAuth, accountType, setIsLogout } = useAuthStore();
    const navigate = useNavigate();
    return (
        <div ref={menuRef} className="relative">
            <Button
                isAnimate={true}
                whileTap={{ scale: 0.8 }}
                transition={{}}
                onClick={() => {
                    setIsOpenMenu(true);
                }}
                // className="bg-button-primary hover:bg-hover-button-primary flex gap-x-4 items-center pl-3 pr-2 py-[1px] rounded-[30px]"
                className="pl-3 pr-2 py-1 gap-x-3 !rounded-[30px]"
            >
                <MenuIcon />
                {isAuth && accountType ? (
                    <div className="h-9 w-9">
                        {accountType.user.avatar ? (
                            <div className="w-full h-full relative">
                                <Image src={accountType.user.avatar} className="rounded-[50%]" />
                                <svg
                                    className="absolute top-[-2px] right-0 z-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="36"
                                    viewBox="0 0 34 36"
                                    fill="none"
                                >
                                    <circle cx="28" cy="6" r="5.5" fill="#3CFF38" stroke="white" />
                                </svg>
                            </div>
                        ) : (
                            <AvartarIcon fullName={accountType.user.fullName} />
                        )}
                    </div>
                ) : (
                    <UserStatus />
                )}
            </Button>
            <Dropdown animate={isOpenMenu} className="right-0 max-w-[240px] rounded-lg mt-4 origin-[100%_0%]">
                <div className="flex flex-col -mx-2 -mb-2  text-[15px]">
                    {!isAuth ? (
                        <>
                            <button
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setIsLoginModalVisible(true);
                                    setIsOpenMenu(false);
                                }}
                                className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]"
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setIsRegisterModalVisible(true);
                                    setIsOpenMenu(false);
                                }}
                                className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]"
                            >
                                Đăng ký
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setIsOpenMenu(false);
                                    navigate('/user/profile');
                                }}
                                className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]"
                            >
                                Thông Tin Cá Nhân
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpenMenu(false);
                                    navigate('/user/book-tracking');
                                }}
                                className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]"
                            >
                                Theo dõi lịch booking
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpenMenu(false);
                                    navigate('/user/history');
                                }}
                                className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]"
                            >
                                Xem lịch sử xăm tại studio
                            </button>
                            <div className="border-[1px] border-stroke-gray"></div>
                            <div className="p-4">
                                <Logout
                                    onSuccess={() => {
                                        // setIsModalVisible(false);
                                        setIsOpenMenu(false);
                                        setIsLogout(true);
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Dropdown>
        </div>
    );
}
