import { StudioArtist } from '@/features/studios';
import { ImageSlider } from '@/components/common/Image';
import { IconUser } from '@tabler/icons-react';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';
import { useArtistDetailStore, useModalStore } from '@/store/componentStore';
import toast from 'react-hot-toast';
import { CalendarIcon, PhoneCallIcon } from '@/assets/icons';

export default function ArtistCard({ artist }: { artist: StudioArtist }) {
    const { isAuth } = useAuthStore();
    const { setArtist } = useArtistDetailStore();
    const { setBookingModal } = useModalStore();
    return (
        <div className="border solid border-stroke-gray bg-gray-dark rounded-xl">
            <div className="flex flex-col items-center">
                <div
                    onClick={() => setArtist(artist)}
                    className="w-full flex items-center justify-center cursor-pointer"
                >
                    {artist.user.avatar ? (
                        <ImageSlider className="rounded-lg rounded-b-none" src={artist.user.avatar} />
                    ) : (
                        <div className="p-4">
                            <IconUser size={80} />
                        </div>
                    )}
                </div>
                <div className="flex flex-row w-full gap-y-3 p-4 gap-x-4">
                    <Button
                        onClick={() => {
                            if (!isAuth) {
                                toast.error('Vui lòng đăng nhập trước để đặt lịch');
                            } else {
                                setBookingModal({
                                    studioId: artist.studioId,
                                    appointmentReschedule: null,
                                    service: null,
                                    visible: true,
                                    artist,
                                });
                            }
                        }}
                        className="py-[10px] flex-1"
                    >
                        <CalendarIcon />
                        <p className="text-sm sm:text-base">Đặt lịch xăm</p>
                    </Button>
                    <Button className="py-[10px] bg-white text-black flex-1">
                        <PhoneCallIcon />
                        <p className="sm:text-base block">Tư vấn</p>
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 w-full p-4 pt-0">
                    <p onClick={() => setArtist(artist)} className="text-sm font-semibold cursor-pointer">
                        Tên artist: {artist.user.fullName}
                    </p>
                    <p className="text-sm font-semibold">Số điện thoại: {artist.user.phone}</p>
                    <p className="text-sm font-semibold">Email: {artist.user.email}</p>
                </div>
            </div>
        </div>
    );
}
