import { SearchIcon } from '@/assets/icons';
import Menu from './Menu';
import Input from '@/components/common/Input';
import { useNavigate } from 'react-router-dom';
import { useFilterFormStore } from '@/store/componentStore';
import { useState, useEffect } from 'react';

export default function HeaderMobile() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const { filterData, setFilterData } = useFilterFormStore();

    useEffect(() => {
        setKeyword(filterData?.searchKeyword || '');
    }, [filterData?.searchKeyword]);

    return (
        <header className="sticky top-0 w-full animation-header bg-gray-dark z-[999] after:bg-gray-dark">
            <div id="header" className="relative z-[2] gap-x-4 flex p-4 items-center">
                <div className="w-[calc(100%-60px)] h-[50px] rounded-3xl bg-search-gray-dark flex px-6 pr-3 items-center gap-x-6 cursor-pointer">
                    <Input
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                        }}
                        placeholder="Tìm studio theo từ khóa"
                        className="bg-transparent text-white text-base text-semibold font-sans sm:text-sm"
                    />
                    <button
                        onClick={() => {
                            setFilterData({
                                searchKeyword: keyword,
                            });

                            navigate('/search-studio?searchKeyword=' + keyword);
                        }}
                        className="p-3"
                    >
                        <SearchIcon styles={{ stroke: '#FF3B5C' }} />
                    </button>
                </div>
                <Menu />
            </div>
        </header>
    );
}
