import { useLocation } from 'react-router-dom';
import CustomListCategory from '../components/CustomListCategory';
import { FilterForm, SortForm } from '../components/FilterForm';
import ListStudioIntro from '../components/ListStudioIntro';

export default function SearchStudio() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    return (
        <>
            <CustomListCategory />
            <div id="content" className="xl:w-[1372px] mx-auto">
                <SortForm />
                <div className="flex gap-x-8">
                    <div className="w-[30%] h-[calc(100vh-160px)] sticky flex flex-col top-24">
                        <p className="text-xl font-medium">Tìm thấy: 45 kết quả</p>
                        <div className="mt-5">
                            <FilterForm />
                        </div>
                    </div>
                    <div className="w-[70%] flex flex-col gap-y-6">
                        <ListStudioIntro />
                    </div>
                </div>
            </div>

            <p>Name: {searchParams.get('studioName')}</p>
            <p>Service: {searchParams.get('service')}</p>
        </>
    );
}
