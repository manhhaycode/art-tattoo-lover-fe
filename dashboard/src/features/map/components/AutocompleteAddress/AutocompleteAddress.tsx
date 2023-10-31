import { useEffect, useRef } from 'react';
import { Input, InputProps, Text, Button, useMantineColorScheme } from '@mantine/core';
import { useSearchLocationStore } from '@/store/componentStore';
import { useDebouncedState, useFocusWithin } from '@mantine/hooks';
import { useAutoCompleteLocation } from '@/features/map/api';
import { DropwdownInput } from '@/components/Dropdown';
import { toast } from 'react-toastify';

const AutocompleteAddress = ({
    defaultValue,
    reset,
    setIsReset,
    ...props
}: { defaultValue?: string; reset?: boolean; setIsReset?: (state: boolean) => void } & InputProps) => {
    const [value, setValue] = useDebouncedState(defaultValue || '', 400);
    const { ref, focused } = useFocusWithin();
    const { sessionToken, placeChoose, setPlaceChoose } = useSearchLocationStore();
    const shcema = useMantineColorScheme();
    const { data } = useAutoCompleteLocation({
        input: value !== defaultValue ? value : '',
        sessionToken: sessionToken,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (reset) {
            setValue(defaultValue || '');
            setPlaceChoose(null);
            setIsReset && setIsReset(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset, defaultValue]);

    return (
        <div
            className="relative"
            ref={ref}
            tabIndex={-1}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    if (placeChoose === null && value !== defaultValue) {
                        toast.error('Vui lòng chọn địa chỉ trong danh sách gợi ý');
                    }
                }
            }}
        >
            <Input
                {...props}
                ref={inputRef}
                placeholder="Nhập vị trí cần tìm"
                defaultValue={value}
                onChange={(e) => {
                    if (e.target.value !== ' ') setValue(e.target.value);
                    if (placeChoose !== null) {
                        setPlaceChoose(null);
                    }
                }}
            />
            {data?.predictions && data.predictions.length > 0 && focused && placeChoose === null && (
                <DropwdownInput className="font-medium text-sm">
                    {data.predictions.map((prediction) => {
                        return (
                            <Button
                                variant="subtle"
                                {...(shcema.colorScheme !== 'dark' && { classNames: { inner: '!text-black' } })}
                                key={prediction.place_id}
                                onClick={() => {
                                    setPlaceChoose(prediction);
                                    if (inputRef.current) {
                                        inputRef.current.value = prediction.description;
                                        setValue(prediction.description);
                                    }
                                }}
                                className="flex w-full text-ellipsis whitespace-nowrap overflow-hidden py-[6px] px-[10px] cursor-pointer"
                            >
                                <Text className="font-semibold, text-sm">{prediction.description}</Text>
                            </Button>
                        );
                    })}
                </DropwdownInput>
            )}
        </div>
    );
};

export default AutocompleteAddress;
