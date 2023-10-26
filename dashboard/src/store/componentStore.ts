import { IStudio } from '@/features/studio/types';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { PlaceData } from '@googlemaps/google-maps-services-js';
import { themeList } from './../theme';

type Theme = (typeof themeList)[number];

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
    themeList: Theme[];
    setThemeList: (themeList: Theme[]) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    themeList: themeList,
    setThemeList: (themeList: Theme[]) => set({ themeList }),
    theme: themeList[Number(localStorage.getItem('theme')?.toString()) || 0] || themeList[0],
    setTheme: (theme: Theme) => set({ theme }),
}));

interface StudioState {
    basicInfoStudio: IStudio | null;
    setBasicInfoStudio: (basicInfoStudio: IStudio) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
    basicInfoStudio: null,
    setBasicInfoStudio: (basicInfoStudio: IStudio | null) => set({ basicInfoStudio }),
}));

interface SearchLocationState {
    placeChoose: Partial<google.maps.places.AutocompletePrediction> | null;
    setPlaceChoose: (placeId: Partial<google.maps.places.AutocompletePrediction> | null) => void;
    placeDetail: Partial<PlaceData> | null;
    setPlaceDetail: (placeDetail: Partial<PlaceData> | null) => void;
    sessionToken: google.maps.places.AutocompleteSessionToken;
    setSessionToken: () => void;
    reset: () => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
    placeChoose: null,
    setPlaceChoose: (placeChoose) => set({ placeChoose }),
    sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
    setSessionToken: () => set({ sessionToken: uuidv4() }),
    placeDetail: null,
    setPlaceDetail: (placeDetail) => set({ placeDetail }),
    reset: () =>
        set({
            placeChoose: null,
            sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
        }),
}));
