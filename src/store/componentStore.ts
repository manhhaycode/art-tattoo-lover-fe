import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
interface SearchLocationState {
    location: string;
    setLocation: (location: string) => void;
    autocomplete: google.maps.places.AutocompleteResponse | null;
    sessionToken: google.maps.places.AutocompleteSessionToken;
    setSessionToken: (sessionToken: google.maps.places.AutocompleteSessionToken) => void;
    setAutocomplete: (autocomplete: google.maps.places.AutocompleteResponse) => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
    location: '',
    setLocation: (location) => set({ location }),
    sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
    setSessionToken: (sessionToken) => set({ sessionToken }),
    autocomplete: null,
    setAutocomplete: (autocomplete) => set({ autocomplete }),
}));
