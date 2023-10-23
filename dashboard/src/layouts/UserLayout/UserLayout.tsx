import NavBar from '../components/NavBar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex relative">
            <NavBar />
            {children}
        </div>
    );
}
