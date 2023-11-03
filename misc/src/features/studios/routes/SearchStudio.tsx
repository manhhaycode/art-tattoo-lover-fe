import CustomListCategory from '../components/CustomListCategory';
import { FilterForm, SortForm } from '../components/FilterForm';
import ListStudioIntro from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import useSearchStudioMangeState from '../hooks/useSearchStudioManageState';
import { Pagination } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function SearchStudio() {
    const { data, isFetching, params, entries } = useSearchStudioMangeState();
    const navigate = useNavigate();
    return (
        <div className="pb-16">
            <CustomListCategory initChoose={params.category || ''} />
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
                        {data && (
                            <>
                                <ListStudioIntro listStudio={data.data} />
                                <Pagination
                                    className="ml-auto"
                                    value={data.page + 1}
                                    onChange={(value) => {
                                        window.scrollTo(0, 0);
                                        const searchParams = new URLSearchParams();
                                        for (const [key, value] of entries) {
                                            searchParams.append(key, value);
                                        }
                                        searchParams.set('page', String(value - 1));
                                        navigate(`/search-studio?${searchParams.toString()}`);
                                    }}
                                    size={'md'}
                                    total={(data.total && Math.ceil(data?.total / data.pageSize)) || 0}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
