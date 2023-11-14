import { MapPinIcon, SearchIcon } from '@/assets/icons';
import { useState, useRef, useEffect } from 'react';
import Input from '@/components/common/Input';
import { Dropdown } from '@/components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useSearchLocationStore } from '@/store/componentStore';
import { useAutoCompleteLocation } from '@/features/map/api';
import { encodeStringtoURI } from '@/lib/helper';
import { useDebouncedState } from '@mantine/hooks';
import Button from '@/components/common/Button';

export default function SearchBarLocationMobile() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [locationName, setLocationName] = useDebouncedState('', 400);
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
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
                            {!isFetching && data?.predictions.length === 0 && (
                                <li className="flex items-center justify-center">
                                    <p className="w-1/2">Không tìm thấy địa điểm</p>
                                </li>
                            )}

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
                                                className="flex items-center p-4 w-full"
                                            >
                                                <MapPinIcon />
                                                <p className="ml-4 text-truncation">{prediction.description}</p>
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
                                        navigateData.place_id,
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
                </div>
            </div>
        </div>
    );
}
