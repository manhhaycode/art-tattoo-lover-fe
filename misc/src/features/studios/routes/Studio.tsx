import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetListStudioArtists, useGetStudio } from '../api/studioAPI';
import { Suspense, lazy, useState, useEffect } from 'react';
import ImageListStudio from '../components/ImageListStudio';
import { StudioIntroCard } from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import Loading from '@/components/Loading';

const Editor = lazy(() => import('@/components/Editor'));
const TestimonialTab = lazy(() => import('../components/Testimonial'));
const ServiceTab = lazy(() => import('../components/Service'));
const ArtistsTab = lazy(() => import('../components/Artists'));

export default function Studio() {
    const { studioId } = useParams();
    const { data, isLoading } = useGetStudio(studioId || '');
    const { data: listArtist, isLoading: isLoadArtist } = useGetListStudioArtists(studioId || '');
    const location = useLocation();
    const navigate = useNavigate();

    const [tab, setTab] = useState<{
        detail: boolean;
        testimonial: boolean;
        service: boolean;
        artist: boolean;
    }>({ detail: true, testimonial: false, service: false, artist: false });

    useEffect(() => {
        switch (location.hash) {
            case '#service':
                setTab({ detail: false, testimonial: false, service: true, artist: false });
                break;
            case '#artists':
                setTab({ detail: false, testimonial: false, service: false, artist: true });
                break;
            case '#testimonial':
                setTab({ detail: false, testimonial: true, service: false, artist: false });
                break;
            default:
                setTab({ detail: true, testimonial: false, service: false, artist: false });
                break;
        }
    }, [location.hash]);

    // if (isLoading) return <div>Loading...</div>;
    return (
        <div className="pb-16">
            <div className="my-6 mx-auto 2xl:w-[1372px] flex flex-col gap-y-6 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
                <ImageListStudio
                    listImage={data?.listMedia.filter((media) => media.type === 0).map((media) => media.url) || []}
                    isLoading={isLoading}
                />
                {isLoading && isLoadArtist && (
                    <div className="w-full h-[308px]">
                        <SkeletonLoader />
                    </div>
                )}
                {data && listArtist && (
                    <div className="flex flex-col gap-y-8 font-sans">
                        <StudioIntroCard
                            withServices={true}
                            callButton={true}
                            studio={{ ...data, listCategory: [], services: data.services }}
                        />
                        <div className="flex gap-x-4">
                            <button
                                className={`text-base font-semibold ${tab?.detail ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => navigate('')}
                            >
                                Giới thiệu
                            </button>
                            <div className="w-px h-5 bg-gray-400"></div>
                            <button
                                id="service"
                                className={`text-base font-semibold ${tab?.service ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => navigate(`#service`)}
                            >
                                Dịch vụ
                            </button>

                            <div className="w-px h-5 bg-gray-400"></div>

                            <button
                                className={`text-base font-semibold ${tab?.artist ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => navigate(`#artists`)}
                            >
                                Artists
                            </button>

                            <div className="w-px h-5 bg-gray-400"></div>

                            <button
                                className={`text-base font-semibold ${
                                    tab?.testimonial ? 'text-primary' : 'text-gray-400'
                                }`}
                                onClick={() => navigate(`#testimonial`)}
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
                                <ServiceTab studioId={data.id} />
                            </Suspense>
                        )}
                        {tab?.artist && (
                            <Suspense fallback={<Loading />}>
                                <ArtistsTab listArtist={listArtist} />
                            </Suspense>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
