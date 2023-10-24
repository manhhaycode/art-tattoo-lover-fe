import { DEFAULT_THEME, MantineProviderProps } from '@mantine/core';
import { create } from 'zustand';
interface ModalState {
    isLoginModalVisible: boolean;
    setIsLoginModalVisible: (isLoginModalVisible: boolean) => void;
    isRegisterModalVisible: boolean;
    setIsRegisterModalVisible: (isRegisterModalVisible: boolean) => void;
    isResetPasswordModalVisible: boolean;
    setIsResetPasswordModalVisible: (isResetPasswordModalVisible: boolean) => void;
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
    reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isLoginModalVisible: false,
    setIsLoginModalVisible: (isLoginModalVisible) => set({ isLoginModalVisible }),
    isRegisterModalVisible: false,
    setIsRegisterModalVisible: (isRegisterModalVisible) => set({ isRegisterModalVisible }),
    isResetPasswordModalVisible: false,
    setIsResetPasswordModalVisible: (isResetPasswordModalVisible) => set({ isResetPasswordModalVisible }),
    isModalVisible: false,
    setIsModalVisible: (isModalVisible) => set({ isModalVisible }),
    reset: () => {
        set({
            isLoginModalVisible: false,
            isRegisterModalVisible: false,
            isModalVisible: false,
            isResetPasswordModalVisible: false,
        });
    },
}));

interface DropdownState {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
    isVisible: true,
    setIsVisible: (isVisible: boolean) => set({ isVisible }),
}));
interface ThemeState {
    theme: MantineProviderProps | undefined;
    setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: DEFAULT_THEME,
    setTheme: (theme: MantineProviderProps | undefined) => set({ theme }),
}));
