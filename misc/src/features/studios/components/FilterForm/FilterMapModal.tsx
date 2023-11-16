import Input from '@/components/common/Input';
import { Checkbox, Rating } from '@mantine/core';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/store/componentStore';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function FilterMapModal({ isLoading }: { isLoading?: boolean }) {
    const [params] = useSearchParams();
    const [value, setValue] = useState<string[]>(params.get('rating')?.split(',') || []);
    const [searchKeyword, setSearchKeyword] = useState(params.get('searchKeyword') || '');
    const { reset } = useModalStore();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col overflow-auto h-full justify-center px-6 [calc(100vw-36px)] sm:w-auto">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.nativeEvent.preventDefault();
                    const ratingList = value.map((item) => Number(item));
                    params.set('searchKeyword', searchKeyword);
                    if (ratingList.length > 0) params.set('rating', ratingList.join(','));
                    else params.delete('rating');
                    reset();
                    navigate('/search-location' + '?' + params);
                }}
                className="flex flex-col gap-y-5"
            >
                <div className="flex flex-col gap-y-3">
                    <label className="text-placeholder-gray font-medium text-base">Lọc theo từ khóa</label>
                    <Input
                        value={searchKeyword}
                        onChange={(e) => {
                            if (e.target.value !== ' ') {
                                setSearchKeyword(e.target.value);
                            }
                        }}
                        typeinput="header"
                        className="h-11 rounded-lg"
                        placeholder="Nhập từ khóa"
                    ></Input>
                </div>
                <div className="flex flex-col gap-y-3">
                    <label className="text-placeholder-gray font-medium text-base">Lọc theo đánh giá</label>
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
                    className="bg-white text-black p-2"
                >
                    <p className="text-sm leading-5">Áp dụng bộ lọc</p>
                </Button>
            </form>
        </div>
    );
}
