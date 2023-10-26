import { EPermissionPermission } from '@/features/auth';
import { IUser } from '@/features/users';
import { create } from 'zustand';

interface IAuth {
    role?: {
        id: number;
        name: string;
    };
    permissions?: EPermissionPermission[];
    studioId?: string;
    user?: Partial<IUser>;
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
    reset: () => set({ accountType: null, isAuth: false }),
}));
