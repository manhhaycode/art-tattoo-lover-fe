import { StudioArtist } from '@/features/studios';
import ArtistCard from './ArtistCard';
import ArtistDetail from './ArtistDetail';
import { useArtistDetailStore } from '@/store/componentStore';
import { useUnmount } from 'react-use';

export default function ListArtistStudio({ listArtist }: { listArtist: StudioArtist[] }) {
    const { artist, setArtist } = useArtistDetailStore();

    useUnmount(() => setArtist(null));

    return artist ? (
        <ArtistDetail artist={artist} />
    ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
            {listArtist.map((artist) => {
                return <ArtistCard key={artist.id} artist={artist} />;
            })}
        </div>
    );
}
