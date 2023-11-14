import { SubmitHandler, useForm } from 'react-hook-form';
import { ITestimonialCreateReq, useCreateTestimonialMutation } from '@/features/testimonials';
import { Rating, Textarea } from '@mantine/core';
import Button from '@/components/common/Button';
import { useModalStore } from '@/store/componentStore';
import { toast } from 'react-hot-toast';
import Image from '@/components/common/Image';
import { IconUser } from '@tabler/icons-react';

export default function TestimonialForm() {
    const { reset, tesimonialModal } = useModalStore();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<ITestimonialCreateReq>({ mode: 'onBlur' });
    const createTestimonialMutation = useCreateTestimonialMutation({
        onSuccess: () => {
            reset();
            toast.success('Gửi đánh giá thành công');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Gửi đánh giá thất bại, hãy thử lại sau');
        },
    });

    const onSubmit: SubmitHandler<ITestimonialCreateReq> = (data) => {
        if (!tesimonialModal.studio) {
            toast.error('Có lỗi bất thường xảy ra');
            return;
        }
        createTestimonialMutation.mutate({ ...data, studioId: tesimonialModal.studio.id, title: 'Đánh giá studio' });
    };
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="px-4 mt-20">
                <h1 className="text-2xl font-semibold mb-8 text-center">Đánh giá studio</h1>
                <input hidden {...register('rating', { required: 'Đánh giá không được để trống' })} />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col xs:px-2 lgmax:px-14 gap-y-5">
                    {tesimonialModal?.studio && (
                        <div className="flex gap-x-5">
                            <div className="w-10">
                                {tesimonialModal.studio.logo ? (
                                    <Image className="rounded-full" src={tesimonialModal.studio.logo} />
                                ) : (
                                    <IconUser size={'100%'} />
                                )}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <p className="text-sm font-semibold">Studio: {tesimonialModal.studio.name}</p>
                                <div className="flex gap-3">
                                    <Rating
                                        defaultValue={tesimonialModal.studio.rating}
                                        size="md"
                                        fractions={3}
                                        readOnly
                                    />
                                    <p className="text-sm font-semibold">{`(${tesimonialModal.studio.rating.toFixed(
                                        2,
                                    )}/5.00)`}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <label className="text-sm font-semibold">Đánh giá của bạn</label>

                    <Rating
                        size="lg"
                        fractions={5}
                        value={watch('rating')}
                        onChange={(e) => {
                            setValue('rating', e, { shouldValidate: true });
                        }}
                    />
                    {errors.rating && <p className="text-sm font-semibold text-red-500">{errors.rating.message}</p>}
                    <label className="text-sm font-semibold">Nội dung đánh giá</label>
                    <Textarea
                        placeholder="Nhập đánh giá của bạn về studio"
                        {...register('content', { required: 'Nội dung không được để trống' })}
                    />
                    {errors.content && <p className="text-sm font-semibold text-red-500">{errors.content.message}</p>}

                    <Button type="submit" {...(!isValid && { className: 'bg-disable text-placeholder-gray mt-3' })}>
                        Gửi đánh giá studio
                    </Button>
                </form>
            </div>
        </div>
    );
}
