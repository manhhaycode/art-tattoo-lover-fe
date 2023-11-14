import Image from '@/components/common/Image';
import { ITestimonial } from '@/features/testimonials';
import { Rating } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export default function TestimonialCard({ testimonial }: { testimonial: ITestimonial }) {
    return (
        <div className="border solid border-stroke-gray bg-gray-dark p-4 rounded-xl">
            <div className="flex flex-col gap-4 sm:flex-row items-center">
                <div className="w-16">
                    {testimonial.userDto.avatar ? (
                        <Image className="rounded-full" src={testimonial.userDto.avatar} />
                    ) : (
                        <IconUser size={'100%'} />
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <p className="text-sm font-semibold">Khách hàng: {testimonial.userDto.fullName}</p>
                    <div className="flex gap-x-3">
                        <p className="text-sm font-semibold hidden lgm:block">Đánh giá:</p>
                        <Rating defaultValue={testimonial.rating} size="md" fractions={3} readOnly />
                        <p className="!text-sm font-semibold">{`(${testimonial.rating.toFixed(2)}/5.00)`}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm font-medium">{testimonial.content}</p>
            </div>
        </div>
    );
}
