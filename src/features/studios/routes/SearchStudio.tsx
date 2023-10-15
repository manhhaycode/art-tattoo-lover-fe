import { useSearchParams } from 'react-router-dom';
import CustomListCategory from '../components/CustomListCategory';
import { FilterForm, SortForm } from '../components/FilterForm';
import ListStudioIntro from '../components/ListStudioIntro';
import { useGetListStudio } from '../api/studioAPI';
import { useEffect } from 'react';
import { SkeletonLoader } from '@/components/SkeletonLoader';

export default function SearchStudio() {
    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get('searchKeyword');
    const category = searchParams.get('category');
    const rating = searchParams.get('rating');
    const sort = searchParams.get('sort') || 'rating';
    const { data, isFetching } = useGetListStudio({
        searchKeyword: searchKeyword || undefined,
        category: category || undefined,
        rating: rating?.split(',').map((item) => Number(item)) || undefined,
        sort: sort || undefined,
        pageSize: 10,
        page: 0,
    });

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    // if (isLoading) return <div>Loading...</div>;
    return (
        <div className="pb-16">
            <CustomListCategory isLoading={isFetching} />
            <div id="content" className="2xl:w-[1372px] mx-auto w-[calc(100%-4rem)] ">
                <SortForm />
                <div className="flex gap-x-8">
                    <div className="w-[30%] h-[calc(100vh-160px)] sticky flex flex-col top-24">
                        {isFetching && (
                            <div className="w-full h-7">
                                <SkeletonLoader />
                            </div>
                        )}
                        {!isFetching && data && (
                            <p className="text-xl font-medium">Tìm thấy: {data.data.length} kết quả</p>
                        )}
                        <div className="mt-5">
                            <FilterForm isLoading={isFetching} />
                        </div>
                    </div>
                    <div className="w-[70%] flex flex-col gap-y-6">
                        {data && <ListStudioIntro listStudio={data.data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
