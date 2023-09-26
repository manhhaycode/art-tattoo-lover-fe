import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
interface SearchLocationState {
    location: string;
    setLocation: (location: string) => void;
    placeId: string;
    setPlaceId: (placeId: string) => void;
    autocomplete: google.maps.places.AutocompleteResponse;
    sessionToken: google.maps.places.AutocompleteSessionToken;
    setSessionToken: () => void;
    setAutocomplete: (autocomplete: google.maps.places.AutocompleteResponse) => void;
    reset: () => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
    location: '',
    setLocation: (location) => set({ location }),
    placeId: '',
    setPlaceId: (placeId) => set({ placeId }),
    sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
    setSessionToken: () => set({ sessionToken: uuidv4() }),
    autocomplete: { predictions: [] },
    setAutocomplete: (autocomplete: google.maps.places.AutocompleteResponse) => set({ autocomplete }),
    reset: () =>
        set({
            location: '',
            placeId: '',
            sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
            autocomplete: { predictions: [] },
        }),
}));
