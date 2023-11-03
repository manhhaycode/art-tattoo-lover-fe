import { useRef } from 'react';
import { Input, InputProps } from '@mantine/core';
import { useSearchLocationStore } from '@/store/componentStore';
import { useDebouncedState, useFocusWithin } from '@mantine/hooks';
import { useAutoCompleteLocation } from '@/features/map/api';
import { DropwdownInput } from '@/components/Dropdown';

interface AutocompleteAddressProps extends InputProps {
    isVisible?: boolean;
    navigateOnClickOption?: (location: string, placeId: string) => void;
}

const AutocompleteAddress = ({ isVisible, navigateOnClickOption, ...props }: AutocompleteAddressProps) => {
    const [value, setValue] = useDebouncedState('', 400);
    const { ref, focused } = useFocusWithin();
    const { sessionToken, placeChoose, setPlaceChoose } = useSearchLocationStore();
    const { data } = useAutoCompleteLocation({ input: value, sessionToken: sessionToken });
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative" ref={ref}>
            {isVisible && (
                <Input
                    {...props}
                    classNames={{
                        input: 'bg-white text-black',
                    }}
                    ref={inputRef}
                    placeholder="Nhập vị trí cần tìm"
                    defaultValue={value}
                    onChange={(e) => {
                        if (e.target.value !== ' ') setValue(e.target.value);
                        if (placeChoose !== null) setPlaceChoose(null);
                    }}
                ></Input>
            )}
            {data?.predictions && data.predictions.length > 0 && focused && isVisible && placeChoose === null && (
                <DropwdownInput tabIndex={-1} className="font-medium text-sm">
                    {data.predictions.map((prediction) => {
                        return (
                            <div
                                key={prediction.place_id}
                                onClick={() => {
                                    setPlaceChoose(prediction);
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
