import { lazy, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useGetStudio } from '../api/studioAPI';
// import { useEffect } from 'react';
import MediaListStudio from '../components/MediaListStudio';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { useAuthStore } from '@/store/authStore';
const PreviewStudio = lazy(() => import('@/features/studio/components/PreviewStudio'));

export default function PreviewStudioPage() {
    const { accountType } = useAuthStore();
    const { data, isLoading } = useGetStudio(accountType?.studioId || '');
    // const navigate = useNavigate();
    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data, slug]);
    return (
        <Suspense fallback={<div></div>}>
            <div className="pb-16 pt-20">
                <div className="my-6 mx-auto xl:w-[1372px] grid grid-flow-row gap-y-6">
                    <MediaListStudio listMedia={data?.listMedia || []} isLoading={isLoading} />
                    {isLoading && (
                        <div className="w-full h-[308px]">
                            <SkeletonLoader />
                        </div>
                    )}
                    {data && <PreviewStudio studio={{ ...data, listCategory: [] }} />}
                </div>
            </div>
        </Suspense>
    );
}
