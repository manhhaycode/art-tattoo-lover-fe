import { IStudio, useUpdateStudioMutation } from '@/features/studio';
import PreviewStudioCard from './PreviewStudioCard';
import { Suspense, lazy, useCallback } from 'react';
import toast from 'react-hot-toast';

const Editor = lazy(() => import('@/components/Editor'));

export default function PreviewStudio({ studio }: { studio: Partial<IStudio> }) {
    const updateStudioMutation = useUpdateStudioMutation({
        onSuccess: () => {
            toast.success('Lưu thành công!');
        },
        onError: () => {
            toast.error('Lưu thất bại!');
        },
    });
    const saveEditor = useCallback(async (text: string) => {
        updateStudioMutation.mutate({ id: studio.id, detail: text });
        console.log(text);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="flex flex-col gap-y-8">
            <PreviewStudioCard studio={studio} callButton={true} />
            <Suspense fallback={<div>Loading...</div>}>
                <Editor text={studio.detail || ''} saveEditor={saveEditor} />
            </Suspense>
        </div>
    );
}
