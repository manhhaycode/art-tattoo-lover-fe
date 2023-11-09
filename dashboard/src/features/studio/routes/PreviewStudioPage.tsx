import { lazy, Suspense, useEffect, useState } from 'react';
import { useGetStudio } from '../api/studioAPI';
import MediaListStudio from '../components/MediaListStudio';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { EPermission } from '@/features/auth';
const PreviewStudio = lazy(() => import('@/features/studio/components/PreviewStudio'));

export default function PreviewStudioPage() {
    const { accountType } = useAuthStore();
    const { data, isLoading } = useGetStudio(accountType?.studioId || '');

    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (accountType?.permissions) {
            const permissions = accountType.permissions;
            if (
                permissions.includes(EPermission.MANAGE_OWNED_STUDIO) ||
                permissions.includes(EPermission.VIEW_STUDIO_SERVICES)
            )
                setDisplay(true);
            else {
                setDisplay(false);
                navigate('/studio/dashboard');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType?.permissions]);
    return (
        display && (
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
        )
    );
}
