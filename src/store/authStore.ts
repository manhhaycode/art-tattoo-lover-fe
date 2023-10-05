import { create } from 'zustand';

interface IAuth {
    role: {
        id: string;
        name: string;
    };
    permissions: {
        id: string;
        name: string;
    }[];
}

// const session = sessionStorage.getItem('tattus-session');

interface AuthState {
    accountType: IAuth | null;
    setAccountType: (accountType: IAuth | null) => void;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accountType: null,
    setAccountType: (accountType) => set({ accountType }),
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth }),
    reset: () => set({ accountType: null, isAuth: false }),
}));
