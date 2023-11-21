import { EPermission } from '@/features/auth';
import { IUser } from '@/features/users';
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface IAuth {
    role?: {
        id: number;
        name: string;
    };
    permissions?: EPermission[];
    studioId?: string;
    user?: Partial<IUser>;
    status?: number;
}

interface AuthState {
    accountType: IAuth | null;
    setAccountType: (accountType: IAuth | null) => void;
    isLogout: boolean;
    setIsLogout: (isLogout: boolean) => void;
    isAuth: boolean;
    isChange: boolean;
    setIsChange: (isChange: boolean) => void;
    setIsAuth: (isAuth: boolean) => void;
    reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accountType: null,
    setAccountType: (accountType) => set({ accountType }),
    isLogout: false,
    setIsLogout: (isLogout) => set({ isLogout }),
    isAuth: false,
    isChange: false,
    setIsChange: (isChange: boolean) => set({ isChange }),
    setIsAuth: (isAuth) => set({ isAuth }),
    reset: () => {
        set({ accountType: null, isAuth: false, isLogout: false });
        Cookies.remove('tattus-at');
        Cookies.remove('tattus-rft');
        sessionStorage.removeItem('tattus-session');
        sessionStorage.removeItem('tattus-role');
    },
}));
