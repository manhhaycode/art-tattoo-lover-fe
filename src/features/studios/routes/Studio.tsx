import { useParams } from 'react-router-dom';
import { useGetStudio } from '../api/studioAPI';
import { useEffect } from 'react';
import { convertSlugURL } from '@/lib/helper';
import ImageListStudio from '../components/ImageListStudio';
import ImageStudio from '@/assets/img/imageStudio.jpg';
import ImageLogo from '@/assets/img/imgLogoStudio.png';
import { StudioIntroCard } from '../components/ListStudioIntro';
export default function Studio() {
    const { slug, studioId } = useParams();
    const { data, isLoading } = useGetStudio(studioId || '');

    useEffect(() => {
        if (data) {
            console.log(data);
            if (slug !== convertSlugURL(data.name)) {
                console.log('redirect');
            }
        }
    }, [data, slug]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="pb-16">
            {data && (
                <div className="my-6 mx-auto xl:w-[1372px] grid grid-flow-row gap-y-6">
                    <ImageListStudio listImage={[ImageLogo, ImageStudio, ImageStudio, ImageStudio, ImageStudio]} />
                    <StudioIntroCard callButton={true} studio={data} />
                </div>
            )}
        </div>
    );
}
