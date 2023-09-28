import { useState, useEffect, useRef } from 'react';
import { Input, InputProps } from '@mantine/core';
import { useSearchLocationStore } from '@/store/componentStore';
import { useDebouncedState, useFocusWithin } from '@mantine/hooks';
import { useAutoCompleteLocation } from '@/features/misc/api/placeAPI';
import { DropwdownInput } from '../Dropdown';

interface AutocompleteAddressProps extends InputProps {
    isVisible?: boolean;
    navigateOnClickOption?: (location: string, placeId: string) => void;
}

const AutocompleteAddress = ({ isVisible, navigateOnClickOption, ...props }: AutocompleteAddressProps) => {
    const [value, setValue] = useDebouncedState('', 400);
    const { ref, focused } = useFocusWithin();
    const [place, setPlace] = useState<google.maps.places.AutocompletePrediction | null>(null);
    const { location, setLocation, setPlaceId, sessionToken } = useSearchLocationStore();
    const { data } = useAutoCompleteLocation({ input: location, sessionToken: sessionToken });
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (place === null) {
            setLocation(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, place]);

    useEffect(() => {
        return () => {
            setLocation('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative" ref={ref}>
            {isVisible && (
                <Input
                    {...props}
                    ref={inputRef}
                    placeholder="Nhập vị trí cần tìm"
                    defaultValue={value}
                    onChange={(e) => {
                        if (e.target.value !== ' ') setValue(e.target.value);
                        if (place !== null) setPlace(null);
                    }}
                ></Input>
            )}
            {data?.predictions && data.predictions.length > 0 && focused && isVisible && place === null && (
                <DropwdownInput
                    tabIndex={-1}
                    onFocus={(e) => {
                        e.stopPropagation();
                    }}
                    className="font-medium text-sm"
                >
                    {data.predictions.map((prediction) => {
                        return (
                            <div
                                key={prediction.place_id}
                                onClick={() => {
                                    setPlace(prediction);
                                    setPlaceId(prediction.place_id);
                                    if (inputRef.current) {
                                        inputRef.current.value = prediction.description;
                                        setValue(prediction.description);
                                    }
                                    if (navigateOnClickOption != undefined) {
                                        navigateOnClickOption(prediction.description, prediction.place_id);
                                    }
                                }}
                                className="flex w-full text-ellipsis whitespace-nowrap overflow-hidden bg-white text-black hover:bg-[#f8f9fa] py-[6px] px-[10px] cursor-pointer"
                            >
                                {prediction.description}
                            </div>
                        );
                    })}
                </DropwdownInput>
            )}
        </div>
    );
};

export default AutocompleteAddress;
