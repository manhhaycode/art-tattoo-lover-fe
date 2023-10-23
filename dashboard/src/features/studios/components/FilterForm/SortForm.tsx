import { useFilterFormStore } from '@/store/componentStore';
import { Select } from '@mantine/core';

export default function SortForm({ isLoading }: { isLoading?: boolean }) {
    const { filterData, setFilterData, setIsQuery } = useFilterFormStore();
    return (
        <div className="h-[80px] flex items-center justify-end font-medium ">
            <div className="w-fit flex items-center gap-x-4">
                <p>Sắp xếp theo:</p>
                <Select
                    disabled={isLoading}
                    classNames={{
                        input: 'h-full !bg-[rgb(58,59,60)] !border-none !px-0 !pl-5 w-40 !text-base !text-white font-sans !font-medium hover:bg-[rgb(80,82,83)] focus:!bg-[rgb(80,82,83)] disabled:!opacity-100 hover:!bg-[rgb(80,82,83)] focus:!border-none',
                        wrapper: 'h-11 border-none focus:!border-none',
                        rightSection: 'hidden',
                    }}
                    size="sm"
                    value={filterData?.sort || 'rating'}
                    onChange={(value) => {
                        if (value) {
                            setFilterData({ ...filterData, sort: value });
                            setIsQuery(true);
                        }
                    }}
                    placeholder="Pick one"
                    defaultValue="rating"
                    data={[
                        { value: 'rating', label: 'Đánh giá' },
                        { value: 'numOfCustomer', label: 'Số khách hàng' },
                    ]}
                />
            </div>
        </div>
    );
}
