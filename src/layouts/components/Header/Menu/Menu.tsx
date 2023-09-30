import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon } from '@/assets/icons';
import { UserStatus } from '@/assets/icons/icon';
import { Dropdown } from '@/components/Dropdown';
import { useAuthStore } from '@/store/auth';
import { useClickOutside } from '@mantine/hooks';
import { useModalStore } from '@/store/componentStore';

export default function Menu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const { setIsModalVisible, setIsLoginModalVisible, setIsRegisterModalVisible } = useModalStore();
    const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false));
    const { isAuth } = useAuthStore();
    return (
        <div ref={menuRef} className="relative">
            <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                    setIsOpenMenu(true);
                }}
                className="bg-button-primary hover:bg-hover-button-primary flex gap-x-4 items-center pl-3 pr-2 py-[1px] rounded-[30px]"
            >
                <MenuIcon />
                <UserStatus />
            </motion.button>
            <Dropdown animate={isOpenMenu} className="right-0 !max-w-[240px] rounded-lg mt-4">
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
                            <button className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]">
                                Thông Tin Cá Nhân
                            </button>
                            <button className="p-3 text-start font-medium hover:bg-[rgba(58,59,60,0.3)]">
                                Xem lịch tattoo
                            </button>
                            <div className="border-[1px] border-stroke-gray"></div>
                            <div className="p-4">
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onTap={() => {}}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="flex gap-x-2 p-[14px] items-center justify-center bg-button-primary rounded-lg min-w-fit w-full "
                                >
                                    <p className="justify-self-center font-semibold text-base leading-none">
                                        Đăng xuất
                                    </p>
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>
            </Dropdown>
        </div>
    );
}
