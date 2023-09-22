import { create } from 'zustand';

interface SearchLocationState {
    location: string;
    setLocation: (location: string) => void;
    autocomplete: google.maps.places.AutocompleteResponse | null;
    setAutocomplete: (autocomplete: google.maps.places.AutocompleteResponse) => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
    location: '',
    setLocation: (location) => set({ location }),
    autocomplete: null,
    setAutocomplete: (autocomplete) => set({ autocomplete }),
}));
