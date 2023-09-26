import { db } from '@/assets/data';
import { MapPinIcon, SearchIcon, TargetIcon } from '@/assets/icons';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from '../common/Image';
import Input from '../common/Input';
import { Dropdown, DropdownImage } from '../Dropdown';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSearchLocationStore } from '@/store/componentStore';
import { useAutoCompleteLocation } from '@/features/misc/api/placeAPI';
import { useGeoLocation } from '@/lib/hooks';
import { encodeStringtoURI } from '@/lib/helper';
interface IService {
    id?: number;
    name?: string;
    image?: string;
}

export default function SearchBarLoction() {
    const serviceRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [locationName, setLocationName] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
    const [serviceChoose, setServiceChoose] = useState<IService>({});
    const [isGeolocation, setIsGeolocation] = useState(false);
    const { setLocation, setAutocomplete, location, autocomplete, sessionToken, setPlaceId, placeId } =
        useSearchLocationStore();
    const { data, isFetching } = useAutoCompleteLocation({ input: location, sessionToken: sessionToken });
    const geolocation = useGeoLocation();
    const navigate = useNavigate();

    const handleClickOutsite = useCallback(() => {
        if (isAutocompleteVisible) setIsAutocompleteVisible(false);
    }, [isAutocompleteVisible]);

    useEffect(() => {
        if (data && data.predictions && data.predictions.length > 0) {
            setAutocomplete(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLocation(locationName);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationName]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsite);
        return () => document.removeEventListener('click', handleClickOutsite);
    }, [handleClickOutsite]);

    return (
        <div className="w-[90%] flex items-center bg-white shadow-[0_0_0_4px_#fff] mx-auto h-16 rounded-2xl">
            <div className="p-1 h-full w-3/5 ">
                <div
                    className="input-search-location p-1 rounded-2xl h-full flex items-center relative"
                    onClick={(e) => {
                        if (e.currentTarget.contains(e.target as Node)) e.stopPropagation();
                    }}
                >
                    <div className="p-3">
                        <MapPinIcon styles={{ color: '#000' }} />
                    </div>
                    <Input
                        ref={inputRef}
                        value={locationName || ''}
                        onFocus={() => {
                            setIsAutocompleteVisible(true);
                            if (isGeolocation) setIsGeolocation(false);
                        }}
                        onChange={(e) => {
                            if (e.target.value !== ' ') {
                                setLocationName(e.target.value);
                            }
                        }}
                        className="mr-1 input-container"
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
                            {location.length > 0 && !isFetching && autocomplete.predictions.length === 0 && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">Không tìm thấy địa điểm</p>
                                </li>
                            )}
                            {isGeolocation && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">
                                        Chúng tôi không thể xác định vị trí hiện tại của bạn. Vui lòng nhập địa chỉ hoặc
                                        cấp quyền truy cập vị trí (nếu có)
                                    </p>
                                </li>
                            )}
                            {location.length === 0 && !isGeolocation && (
                                <li>
                                    <button
                                        title="suggest-location-item"
                                        className="flex items-center p-4 w-full"
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
                                        <p className="ml-4">Vị trí hiện tại</p>
                                    </button>
                                </li>
                            )}
                            {location.length > 0 &&
                                !isFetching &&
                                autocomplete.predictions.map((prediction) => {
                                    return (
                                        <li key={prediction.place_id}>
                                            <button
                                                onClick={() => {
                                                    setPlaceId(prediction.place_id);
                                                    setLocationName(prediction.description);
                                                    setIsAutocompleteVisible(false);
                                                }}
                                                title="suggest-location-item"
                                                className="flex items-center p-4 w-full"
                                            >
                                                <MapPinIcon />
                                                <p className="ml-4">{prediction.description}</p>
                                            </button>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Dropdown>
                </div>
            </div>
            <div className="border-[1px] border-solid border-[#a9afbb] h-10 mx-2"></div>
            <div className="flex items-center relative w-2/5 h-full p-1">
                <div className="service-search-location p-1 rounded-2xl flex items-center w-full">
                    <button
                        ref={serviceRef}
                        onClick={() => {
                            if (!isDropdownVisible) setIsDropdownVisible(true);
                        }}
                        onBlur={() => {
                            setIsDropdownVisible(false);
                        }}
                        className={
                            'font-medium font-sans text-[#8e8e8e] w-full h-12 flex items-center rounded-3xl pl-4 relative cursor-pointer'
                        }
                    >
                        {serviceChoose.name ? <p className="text-black">{serviceChoose.name}</p> : 'Dịch vụ bất kỳ'}
                        <DropdownImage
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            animate={isDropdownVisible}
                            className="mt-4 py-4 absolute top-full -left-[18px] w-[500px]"
                        >
                            <h1 className="font-semibold text-sm ml-1 py-2 mb-5">Tìm kiếm các dịch vụ Tattoo</h1>
                            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                                {db.servicesTattoo.map((service) => {
                                    return (
                                        <div key={service.id} className="flex flex-col">
                                            <Image
                                                onClick={() => {
                                                    setServiceChoose(service);
                                                    setIsDropdownVisible(false);
                                                }}
                                                className={'rounded-xl border-2 border-solid border-transparent hover:shadow-shadow-dropdown '.concat(
                                                    service.id === serviceChoose.id ? '!border-button-primary' : '',
                                                )}
                                                src={service.img}
                                            />
                                            <div className="flex items-center flex-grow">
                                                <p className="text-sm mt-2 mx-px">{service.name}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </DropdownImage>
                    </button>
                </div>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onTap={() => {
                        navigate(
                            '/search-location?location=' +
                                encodeStringtoURI(location) +
                                '&service=' +
                                (serviceChoose.name || '') +
                                '&placeId=' +
                                placeId,
                        );
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex gap-x-2 py-[14px] px-6 items-center bg-button-primary rounded-2xl min-w-fit ml-3 cursor-pointer"
                >
                    <SearchIcon styles={{ stroke: '#fff', strokeWidth: '3', width: '20', height: '20' }} />
                    <p className="justify-self-center font-semibold text-base leading-none">Tìm Kiếm</p>
                </motion.button>
            </div>
        </div>
    );
}
