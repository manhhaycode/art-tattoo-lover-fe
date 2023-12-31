import { MapPinIcon, SearchIcon } from '@/assets/icons';
import { useState, useRef, useEffect } from 'react';
import Image from '@/components/common/Image';
import Input from '@/components/common/Input';
import { Dropdown, DropdownImage } from '@/components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useSearchLocationStore } from '@/store/componentStore';
import { useAutoCompleteLocation } from '@/features/map/api';
import { encodeStringtoURI } from '@/lib/helper';
import { useDebouncedState } from '@mantine/hooks';
import Button from '@/components/common/Button';
import { useGetListCategory } from '@/features/category';
import { ICategory } from '@/features/category';
import serviceDefault from '@/assets/img/services.jpg';

export default function SearchBarLocation() {
    const categoryRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [locationName, setLocationName] = useDebouncedState('', 400);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { data: listCategory } = useGetListCategory();
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
    const [categoryChoose, setCategoryChoose] = useState<ICategory>();
    const [isGeolocation, setIsGeolocation] = useState(false);
    const { sessionToken, setPlaceChoose, placeChoose } = useSearchLocationStore();
    const { data, isFetching } = useAutoCompleteLocation({ input: locationName, sessionToken: sessionToken });
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('click', () => {
            setIsAutocompleteVisible(false);
        });
        return () =>
            document.removeEventListener('click', () => {
                setIsAutocompleteVisible(false);
            });
    }, []);

    return (
        <div className="w-[90%] flex items-center bg-white shadow-[0_0_0_4px_#fff] mx-auto h-16 rounded-2xl relative">
            <div className="p-1 h-full w-full sm:w-3/5">
                <div
                    className="input-search-location p-1 rounded-2xl h-full flex items-center sm:relative"
                    onClick={(e) => {
                        if (e.currentTarget.contains(e.target as Node)) e.stopPropagation();
                    }}
                >
                    <div className="p-3">
                        <MapPinIcon styles={{ color: '#000' }} />
                    </div>
                    <Input
                        ref={inputRef}
                        defaultValue={locationName}
                        onFocus={() => {
                            setIsAutocompleteVisible(true);
                            if (isGeolocation) setIsGeolocation(false);
                        }}
                        onChange={(e) => {
                            if (e.target.value !== ' ') {
                                setLocationName(e.target.value);
                            }
                            if (placeChoose !== null) setPlaceChoose(null);
                        }}
                        className="mr-1 input-container text-base"
                        type="primary"
                        placeholder="Tìm kiếm theo địa điểm, quận, tên đường..."
                    />
                    <Dropdown
                        tabIndex={-1}
                        animate={isAutocompleteVisible}
                        className="bg-white !text-black h-fit absolute top-full left-0 w-full"
                    >
                        <ul className="font-medium flex flex-col gap-y-1">
                            {isFetching && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">Đang Feching</p>
                                </li>
                            )}
                            {!isFetching && data?.predictions.length === 0 && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">Không tìm thấy địa điểm</p>
                                </li>
                            )}
                            {/* {isGeolocation && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">
                                        Chúng tôi không thể xác định vị trí hiện tại của bạn. Vui lòng nhập địa chỉ hoặc
                                        cấp quyền truy cập vị trí (nếu có)
                                    </p>
                                </li>
                            )}
                            {locationName.length === 0 && !isGeolocation && (
                                <li>
                                    <button
                                        title="suggest-location-item"
                                        className="flex items-center w-full p-2 sm:p-4"
                                        onClick={() => {
                                            if (
                                                !geolocation.isGeolocationAvailable ||
                                                !geolocation.isGeolocationEnabled
                                            ) {
                                                setIsGeolocation(true);
                                            }
                                        }}
                                    >
                                        <TargetIcon />
                                        <p className="ml-2 sm:ml-4">Vị trí hiện tại</p>
                                    </button>
                                </li>
                            )} */}
                            {locationName.length > 0 &&
                                !isFetching &&
                                data?.predictions.map((prediction) => {
                                    return (
                                        <li key={prediction.place_id}>
                                            <button
                                                onClick={() => {
                                                    setPlaceChoose(prediction);
                                                    setIsAutocompleteVisible(false);
                                                    if (inputRef.current)
                                                        inputRef.current.value = prediction.description;
                                                }}
                                                title="suggest-location-item"
                                                className="flex items-center w-full p-2 sm:p-4"
                                            >
                                                <div className="block sm:hidden">
                                                    <MapPinIcon styles={{ width: 16, minWidth: 16, height: 16 }} />
                                                </div>
                                                <div className="hidden sm:block">
                                                    <MapPinIcon styles={{ width: 20, minWidth: 20, height: 20 }} />
                                                </div>
                                                <p className="ml-2 sm:ml-4 text-truncation">{prediction.description}</p>
                                            </button>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Dropdown>
                </div>
            </div>
            <div className="border-[1px] border-solid border-[#a9afbb] h-10 mx-2 hidden sm:block"></div>
            <div
                ref={categoryRef}
                tabIndex={-1}
                onBlur={(e) => {
                    if (!categoryRef.current?.contains(e.relatedTarget as Node)) {
                        e.stopPropagation();
                        setIsDropdownVisible(false);
                    }
                }}
                className="flex items-center relative w-fit h-full p-1 sm:w-2/5"
            >
                <div className="category-search-location p-1 rounded-2xl hidden items-center w-full sm:flex">
                    <button
                        onClick={() => {
                            if (!isDropdownVisible) setIsDropdownVisible(true);
                        }}
                        // onBlur={() => {
                        //     setIsDropdownVisible(false);
                        // }}
                        className={
                            'font-medium font-sans text-[#8e8e8e] w-full h-12 flex items-center rounded-3xl px-2 relative cursor-pointer'
                        }
                    >
                        {categoryChoose?.name ? (
                            <p className="text-black text-truncation">{categoryChoose.name}</p>
                        ) : (
                            'Dịch vụ bất kỳ'
                        )}
                    </button>
                </div>
                <div className="min-w-fit relative">
                    <Button
                        isAnimate={true}
                        whileTap={{ scale: 0.8 }}
                        onTap={() => {
                            if (data && data.predictions.length > 0) {
                                const navigateData = placeChoose || data.predictions[0];
                                navigate(
                                    '/search-location?location=' +
                                        encodeStringtoURI(navigateData.description!) +
                                        '&placeId=' +
                                        navigateData.place_id +
                                        '&category=' +
                                        (categoryChoose?.id ? categoryChoose.id : ''),
                                );
                            }
                        }}
                        className="!rounded-2xl ml-3 px-6"
                    >
                        <SearchIcon styles={{ stroke: '#fff', strokeWidth: '3', width: '20', height: '20' }} />
                        <p className="justify-self-center font-semibold text-base leading-none hidden lgm:block">
                            Tìm Kiếm
                        </p>
                    </Button>
                    <DropdownImage
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        animate={isDropdownVisible}
                        className="mt-4 py-4 absolute top-full -right-[18px] w-[500px]"
                    >
                        <h1 className="font-semibold text-sm ml-1 py-2 mb-5">Tìm kiếm các dịch vụ Tattoo</h1>
                        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                            <div className="flex flex-col">
                                <Image
                                    onClick={() => {
                                        setCategoryChoose(undefined);
                                        setIsDropdownVisible(false);
                                    }}
                                    className={'rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-dropdown '.concat(
                                        !categoryChoose ? '!border-button-primary' : '',
                                    )}
                                    src={serviceDefault}
                                />
                                <div className="flex items-center flex-grow">
                                    <p className="text-sm mt-2 mx-px">Dịch vụ bất kỳ</p>
                                </div>
                            </div>
                            {listCategory &&
                                listCategory.map((category) => {
                                    return (
                                        <div key={category.id} className="flex flex-col">
                                            <Image
                                                onClick={() => {
                                                    setCategoryChoose(category);
                                                    setIsDropdownVisible(false);
                                                }}
                                                className={'rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-dropdown '.concat(
                                                    category.id === categoryChoose?.id ? '!border-button-primary' : '',
                                                )}
                                                src={category.image}
                                            />
                                            <div className="flex items-center flex-grow">
                                                <p className="text-sm mt-2 mx-px">{category.name}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </DropdownImage>
                </div>
            </div>
        </div>
    );
}
