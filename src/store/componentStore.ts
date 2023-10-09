import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { PlaceData } from '@googlemaps/google-maps-services-js';
interface SearchLocationState {
    placeChoose: Partial<google.maps.places.AutocompletePrediction> | null;
    setPlaceChoose: (placeId: Partial<google.maps.places.AutocompletePrediction> | null) => void;
    sessionToken: google.maps.places.AutocompleteSessionToken;
    setSessionToken: () => void;
    reset: () => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
    placeChoose: null,
    setPlaceChoose: (placeChoose) => set({ placeChoose }),
    sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
    setSessionToken: () => set({ sessionToken: uuidv4() }),
    reset: () =>
        set({
            placeChoose: null,
            sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
        }),
}));

interface GoogleMapState {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
    placeDetail: Partial<PlaceData> | null;
    setPlaceDetail: (placeDetail: Partial<PlaceData> | null) => void;
}

export const useGoogleMapStore = create<GoogleMapState>((set) => ({
    map: null,
    setMap: (map) => set({ map }),
    placeDetail: null,
    setPlaceDetail: (placeDetail) => set({ placeDetail }),
}));

interface ModalState {
    isLoginModalVisible: boolean;
    setIsLoginModalVisible: (isLoginModalVisible: boolean) => void;
    isRegisterModalVisible: boolean;
    setIsRegisterModalVisible: (isRegisterModalVisible: boolean) => void;
    isModalVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
    reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isLoginModalVisible: false,
    setIsLoginModalVisible: (isLoginModalVisible) => set({ isLoginModalVisible }),
    isRegisterModalVisible: false,
    setIsRegisterModalVisible: (isRegisterModalVisible) => set({ isRegisterModalVisible }),
    isModalVisible: false,
    setIsModalVisible: (isModalVisible) => set({ isModalVisible }),
    reset: () => {
        set({
            isLoginModalVisible: false,
            isRegisterModalVisible: false,
            isModalVisible: false,
        });
    },
}));
