import { useParams } from 'react-router-dom';
import { useGetStudio } from '../api/studioAPI';
import { Suspense, lazy, useEffect, useState } from 'react';
import { convertSlugURL } from '@/lib/helper';
import ImageListStudio from '../components/ImageListStudio';
import { StudioIntroCard } from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import Loading from '@/components/Loading';

const Editor = lazy(() => import('@/components/Editor'));
const TestimonialTab = lazy(() => import('../components/Testimonial'));

export default function Studio() {
    const { slug, studioId } = useParams();
    const { data, isLoading } = useGetStudio(studioId || '');
    const [tab, setTab] = useState<{
        detail: boolean;
        testimonial: boolean;
    }>({ detail: true, testimonial: false });

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
            <div className="my-6 mx-auto 2xl:w-[1372px] flex flex-col gap-y-6 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
                <ImageListStudio
                    listImage={data?.listMedia.filter((media) => media.type === 0).map((media) => media.url) || []}
                    isLoading={isLoading}
                />
                {isLoading && (
                    <div className="w-full h-[308px]">
                        <SkeletonLoader />
                    </div>
                )}
                {data && (
                    <div className="flex flex-col gap-y-8 font-sans">
                        <StudioIntroCard callButton={true} studio={{ ...data, listCategory: [] }} />
                        <div className="flex gap-x-5">
                            <button
                                className={`text-base font-semibold ${tab?.detail ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => setTab({ detail: true, testimonial: false })}
                            >
                                Giới thiệu về studio
                            </button>
                            <div className="w-px h-5 bg-gray-400"></div>
                            <button
                                className={`text-base font-semibold ${
                                    tab?.testimonial ? 'text-primary' : 'text-gray-400'
                                }`}
                                onClick={() => setTab({ detail: false, testimonial: true })}
                            >
                                Xem đánh giá studio
                            </button>
                        </div>
                        {tab?.detail && (
                            <Suspense fallback={<Loading />}>
                                <Editor editable={false} text={data.detail || ''} />
                            </Suspense>
                        )}
                        {tab?.testimonial && (
                            <Suspense fallback={<Loading />}>
                                <TestimonialTab studioId={data.id} />
                            </Suspense>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
