import CustomListCategory from '../components/CustomListCategory';
import { FilterForm, SortForm } from '../components/FilterForm';
import ListStudioIntro from '../components/ListStudioIntro';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import useSearchStudioMangeState from '../hooks/useSearchStudioManageState';

export default function SearchStudio() {
    const { data, isFetching, params } = useSearchStudioMangeState();
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
                        {data && <ListStudioIntro listStudio={data.data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
