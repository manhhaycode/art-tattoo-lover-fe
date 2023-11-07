import { useParams } from 'react-router-dom';
import { useGetStudio } from '../api/studioAPI';
import { Suspense, useEffect } from 'react';
import { convertSlugURL } from '@/lib/helper';
import ImageListStudio from '../components/ImageListStudio';
import { StudioIntroCard } from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import Editor from '@/components/Editor';
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

    // if (isLoading) return <div>Loading...</div>;

    return (
        <div className="pb-16">
            <div className="my-6 mx-auto xl:w-[1372px] grid grid-flow-row gap-y-6">
                <ImageListStudio
                    listImage={[data?.listMedia.find((media) => media.type === 'IMAGE')?.url || '']}
                    isLoading={isLoading}
                />
                {isLoading && (
                    <div className="w-full h-[308px]">
                        <SkeletonLoader />
                    </div>
                )}
                {data && (
                    <div className="flex flex-col gap-y-8">
                        <StudioIntroCard callButton={true} studio={{ ...data, listCategory: [] }} />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Editor editable={false} text={data.detail || ''} />
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
}
