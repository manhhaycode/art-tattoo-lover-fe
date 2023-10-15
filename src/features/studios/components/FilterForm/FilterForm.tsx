import { useForm, SubmitHandler } from 'react-hook-form';
import { IFilter } from '@/features/studios';
import Input from '@/components/common/Input';
import { Checkbox, Loader, Rating } from '@mantine/core';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useFilterFormStore } from '@/store/componentStore';

export default function FilterForm({ isLoading }: { isLoading?: boolean }) {
    const [value, setValue] = useState<string[]>([]);
    const { handleSubmit, register } = useForm<IFilter>();
    const { filterData, setFilterData } = useFilterFormStore();

    const onSubmit: SubmitHandler<IFilter> = async (data) => {
        setFilterData({ ...filterData, ...data, rating: value.map((item) => Number(item)) });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-3">
                <label className="text-placeholder-gray font-medium text-lg">Tìm kiếm theo tên studio</label>
                <Input
                    {...register('searchKeyword')}
                    typeinput="header"
                    className="h-11 rounded-lg"
                    placeholder="Nhập tên studio"
                ></Input>
            </div>
            <div className="flex flex-col gap-y-3">
                <label className="text-placeholder-gray font-medium text-lg">Tìm kiếm theo đánh giá</label>
                <Checkbox.Group
                    value={value}
                    onChange={(values) => {
                        setValue(values);
                    }}
                >
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-3 items-center text-sm font-medium font-sans">
                            <Checkbox
                                size={'lg'}
                                classNames={{ label: 'hidden' }}
                                color="red"
                                label="5 sao"
                                value="5"
                            />
                            <Rating size="md" defaultValue={5} readOnly />
                            5.0/5.0
                        </div>
                        <div className="flex gap-x-3 items-center text-sm font-medium font-sans">
                            <Checkbox
                                size={'lg'}
                                classNames={{ label: 'hidden' }}
                                color="red"
                                label="4 sao"
                                value="4"
                            />
                            <Rating size="md" defaultValue={4} readOnly />
                            4.0/4.0
                        </div>
                        <div className="flex gap-x-3 items-center text-sm font-medium font-sans">
                            <Checkbox
                                size={'lg'}
                                classNames={{ label: 'hidden' }}
                                color="red"
                                label="3 sao"
                                value="3"
                            />
                            <Rating size="md" defaultValue={3} readOnly />
                            3.0/3.0
                        </div>
                        <div className="flex gap-x-3 items-center text-sm font-medium font-sans">
                            <Checkbox
                                size={'lg'}
                                classNames={{ label: 'hidden' }}
                                color="red"
                                label="2 sao"
                                value="2"
                            />
                            <Rating size="md" defaultValue={2} readOnly />
                            2.0/2.0
                        </div>
                        <div className="flex gap-x-3 items-center text-sm font-medium font-sans">
                            <Checkbox
                                size={'lg'}
                                classNames={{ label: 'hidden' }}
                                color="red"
                                label="1 sao"
                                value="1"
                            />
                            <Rating size="md" defaultValue={1} readOnly />
                            1.0/1.0
                        </div>
                    </div>
                </Checkbox.Group>
            </div>
            <Button
                disabled={isLoading}
                type="submit"
                typeStyle="primary"
                isAnimate={false}
                className="bg-white text-black"
            >
                {isLoading ? <Loader size={20} color="#000" /> : <p className="leading-5">Áp dụng bộ lọc</p>}
            </Button>
        </form>
    );
}
