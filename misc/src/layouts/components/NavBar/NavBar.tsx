import { CalendarIcon, HistoryIcon, UserIcon } from '@/assets/icons';
import Button from '@/components/common/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="min-w-[350px] bg-gray-dark border-r-2 border-search-gray-dark h-[calc(100vh-80px)] top-20 sticky flex-col gap-y-4 p-4 hidden lgmax:flex">
            <Button
                onClick={() => {
                    navigate('/user/profile');
                }}
                isAnimate={false}
                className="flex gap-x-3 justify-start"
                {...(!location.pathname.includes('profile') && { style: { background: 'transparent' } })}
            >
                <UserIcon />
                <p className="font-medium text-base">Thông tin cá nhân</p>
            </Button>
            <Button
                onClick={() => {
                    navigate('/user/book-tracking');
                }}
                className="flex gap-x-3 justify-start"
                {...(!location.pathname.includes('book-tracking') && { style: { background: 'transparent' } })}
            >
                <CalendarIcon styles={{ width: '24px', height: '24px' }} />
                <p className="font-medium text-base">Theo dõi lịch hẹn</p>
            </Button>
            <Button
                onClick={() => {
                    navigate('/user/history');
                }}
                className="flex gap-x-3 justify-start"
                {...(!location.pathname.includes('history') && { style: { background: 'transparent' } })}
            >
                <HistoryIcon />
                <p className="font-medium text-base justify-start">Lịch sử xăm tại studio</p>
            </Button>
        </div>
    );
}
