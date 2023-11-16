import { useParams } from 'react-router-dom';
import { useGetStudio } from '../api/studioAPI';
import { Suspense, lazy, useState } from 'react';
import ImageListStudio from '../components/ImageListStudio';
import { StudioIntroCard } from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import Loading from '@/components/Loading';
import { useGetListServiceStudio } from '@/features/services';

const Editor = lazy(() => import('@/components/Editor'));
const TestimonialTab = lazy(() => import('../components/Testimonial'));
const ServiceTab = lazy(() => import('../components/Service'));

export default function Studio() {
    const { studioId } = useParams();
    const { data, isLoading } = useGetStudio(studioId || '');

    const { data: services } = useGetListServiceStudio({
        studioId: studioId || '',
        page: 0,
        pageSize: 1000,
    });

    const [tab, setTab] = useState<{
        detail: boolean;
        testimonial: boolean;
        service: boolean;
    }>({ detail: true, testimonial: false, service: false });

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
                {data && services?.data && (
                    <div className="flex flex-col gap-y-8 font-sans">
                        <StudioIntroCard
                            callButton={true}
                            studio={{ ...data, listCategory: [], listService: services.data }}
                        />
                        <div className="flex gap-x-4">
                            <button
                                className={`text-base font-semibold ${tab?.detail ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => setTab({ detail: true, testimonial: false, service: false })}
                            >
                                Giới thiệu
                            </button>
                            <div className="w-px h-5 bg-gray-400"></div>
                            <button
                                className={`text-base font-semibold ${tab?.service ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => setTab({ detail: false, testimonial: false, service: true })}
                            >
                                Dịch vụ
                            </button>
                            <div className="w-px h-5 bg-gray-400"></div>

                            <button
                                className={`text-base font-semibold ${
                                    tab?.testimonial ? 'text-primary' : 'text-gray-400'
                                }`}
                                onClick={() => setTab({ detail: false, testimonial: true, service: false })}
                            >
                                Đánh giá
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
                        {tab?.service && (
                            <Suspense fallback={<Loading />}>
                                <ServiceTab serviceList={services.data} studioId={data.id} />
                            </Suspense>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
