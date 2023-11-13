import { useFilterFormStore } from '@/store/componentStore';
import { useSearchParams } from 'react-router-dom';
import { useGetListStudio } from '../../api';
import { useEffect } from 'react';
import { checkFilterEmpty, createSearchParams } from '@/lib/helper';

const useSearchStudioManageState = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKeyword = searchParams.get('searchKeyword');
    const category = searchParams.get('category');
    const rating = searchParams.get('rating');
    const sort = searchParams.get('sort');
    const page = Number(searchParams.get('page') || 0);
    const pageSize = Number(searchParams.get('pageSize') || 15);
    const { reset, setFilterData, filterData, isQuery, setIsQuery } = useFilterFormStore();
    const query = useGetListStudio(
        filterData && checkFilterEmpty(filterData)
            ? {
                  searchKeyword: searchKeyword || undefined,
                  categoryId: Number(category) || undefined,
                  rating: rating?.split(',').map((item) => Number(item)) || undefined,
                  sort: sort || undefined,
                  pageSize,
                  page,
              }
            : {},
    );

    useEffect(() => {
        const filter = filterData || {
            searchKeyword: searchKeyword || undefined,
            category: category || undefined,
            rating: rating?.split(',').map((item) => Number(item)) || undefined,
            sort: sort || undefined,
        };
        if (!filterData) {
            setFilterData(filter);
            return;
        }
        setSearchParams(createSearchParams(filter));
        setIsQuery(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuery]);

    useEffect(() => {
        return () => {
            reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // if (isLoading) return <div>Loading...</div>;
    return { ...query, params: { searchKeyword, category, rating, sort }, entries: searchParams.entries() };
};

export default useSearchStudioManageState;
