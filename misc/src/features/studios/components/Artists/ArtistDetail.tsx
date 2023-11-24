import { ImageSlider } from '@/components/common/Image';
import { typeEnum } from '@/features/media';
import { StudioArtist } from '@/features/studios';
import { useArtistDetailStore } from '@/store/componentStore';
import { IconArrowLeft } from '@tabler/icons-react';

export default function ArtistDetail({ artist }: { artist: StudioArtist }) {
    const { setArtist } = useArtistDetailStore();
    const listImage = artist.user.listMedia.filter((media) => media.type === typeEnum.IMAGE);
    const listCert = artist.user.listMedia.filter((media) => media.type === typeEnum.CERT);
    return (
        <div className="w-full flex flex-col gap-y-10 items-center">
            <button className="mr-auto" onClick={() => setArtist(null)}>
                <IconArrowLeft />
            </button>

            {artist.user.avatar && (
                <div className="w-full max-w-[80%]">
                    <ImageSlider className="rounded-lg rounded-b-none" src={artist.user.avatar} />
                </div>
            )}
            <h1 className="text-lg font-semibold w-full">Các chứng chỉ của artist</h1>
            {listCert.length > 0 ? (
                listCert.map((media) => (
                    <div key={media.id} className="w-full max-w-[80%]">
                        <ImageSlider className="rounded-lg rounded-b-none" src={media.url} />
                    </div>
                ))
            ) : (
                <p className="text-sm font-semibold italic w-full">Artist chưa có chứng chỉ nào</p>
            )}
            <h1 className="text-lg font-semibold w-full">Các ảnh giới thiệu của artist</h1>
            {listImage.length > 0 ? (
                listImage.map((media) => (
                    <div key={media.id} className="w-full max-w-[80%]">
                        <ImageSlider key={media.id} className="rounded-lg rounded-b-none" src={media.url} />
                    </div>
                ))
            ) : (
                <p className="text-sm font-semibold italic w-full">Artist chưa có ảnh giới thiệu nào</p>
            )}
        </div>
    );
}
