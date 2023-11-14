import Loading from '@/components/Loading';
import { useGetListTestimonial } from '@/features/testimonials';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import TestimonialCard from './TestimonialCard';

export default function TestimonialList({ studioId }: { studioId: string }) {
    const [page, setPage] = useState(0);
    const { data, isFetching } = useGetListTestimonial({
        page,
        pageSize: 16,
        studioId,
    });
    return (
        <>
            {isFetching && <Loading />}
            {data && (
                <>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                        {data.data.map((testimonial) => {
                            return <TestimonialCard key={testimonial.id} testimonial={testimonial} />;
                        })}
                    </div>
                    <div className="w-full flex justify-end">
                        <Pagination
                            className="ml-auto mt-5"
                            value={page + 1}
                            onChange={(value) => {
                                if (value === page + 1) return;

                                setPage(value - 1);
                            }}
                            size={'md'}
                            total={(data.total && Math.ceil(data.total / data.pageSize)) || 0}
                        />
                    </div>
                </>
            )}
        </>
    );
}
