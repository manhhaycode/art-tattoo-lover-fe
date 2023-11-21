import { useAuthStore } from '@/store/authStore';
import NavBar from '../components/NavBar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { accountType } = useAuthStore();
    return accountType ? (
        <div className="flex relative">
            <NavBar />
            {children}
        </div>
    ) : (
        <div className="min-h-[calc(100vh-508px)]"></div>
    );
}
