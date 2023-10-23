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
    const { reset, setFilterData, filterData, isQuery, setIsQuery } = useFilterFormStore();
    const query = useGetListStudio(
        filterData && checkFilterEmpty(filterData)
            ? {
                  searchKeyword: searchKeyword || undefined,
                  category: category || undefined,
                  rating: rating?.split(',').map((item) => Number(item)) || undefined,
                  sort: sort || undefined,
                  pageSize: 10,
                  page: 0,
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
    return { ...query, params: { searchKeyword, category, rating, sort } };
};

export default useSearchStudioManageState;
