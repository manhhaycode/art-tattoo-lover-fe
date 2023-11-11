import { UserIcon } from '@/assets/icons';
import { IUser, useSearchUser } from '@/features/users';
import { useInvoiceStore } from '@/store/componentStore';
import {
    AspectRatio,
    Image,
    Box,
    Group,
    Modal,
    Text,
    rem,
    Combobox,
    ComboboxTarget,
    TextInput,
    useCombobox,
    Button,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function SearchUserModal({
    handleModalState,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
}) {
    const [value, setValue] = useDebouncedState('', 300, { leading: true });
    const { setAppointment } = useInvoiceStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const combobox = useCombobox();
    const [selectUser, setSelectUser] = useState<IUser>();
    const { data: userList } = useSearchUser({ page: 0, pageSize: 5, searchKeyword: value });

    return (
        <Modal
            size={'lg'}
            title={<Text className="text-sm font-semibold">Liên kết thông tin khách hàng</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
        >
            <Box className="flex flex-col gap-y-3">
                <Text className="text-sm font-semibold">Tìm kiếm khách hàng</Text>
                <Combobox
                    onOptionSubmit={(option) => {
                        const user = userList?.data.find((user) => user.id === option);
                        setSelectUser(user);
                        setValue(user?.fullName || '');
                        if (inputRef.current) inputRef.current.value = user?.fullName || '';
                        combobox.closeDropdown();
                    }}
                    store={combobox}
                >
                    <ComboboxTarget>
                        <TextInput
                            ref={inputRef}
                            placeholder={'Nhập tên, số điện thoại, email khách hàng'}
                            defaultValue={value}
                            onChange={(event) => {
                                setSelectUser(undefined);
                                setValue(event.currentTarget.value);
                                combobox.openDropdown();
                                combobox.updateSelectedOptionIndex();
                            }}
                            onClick={() => combobox.openDropdown()}
                            onFocus={() => combobox.openDropdown()}
                            onBlur={() => {
                                if (!selectUser && userList && userList.data.length > 0)
                                    toast.error('Hãy chọn khách hàng trong danh sách');
                            }}
                        />
                    </ComboboxTarget>
                    <Combobox.Dropdown>
                        <Combobox.Options className="flex flex-col p-1 gap-y-3" mah={200} style={{ overflowY: 'auto' }}>
                            {!userList || userList.data.length === 0 ? (
                                <Combobox.Empty>Nothing found</Combobox.Empty>
                            ) : (
                                userList.data.map((option) => {
                                    return (
                                        <Combobox.Option
                                            key={option.id}
                                            value={option.id}
                                            onClick={() => {
                                                setSelectUser(option);
                                                combobox.closeDropdown();
                                            }}
                                        >
                                            <Group wrap="nowrap">
                                                <AspectRatio
                                                    miw={rem(36)}
                                                    mih={rem(36)}
                                                    className="rounded-full overflow-hidden relative"
                                                >
                                                    {option.avatar ? (
                                                        <Image
                                                            src={option.avatar}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div>
                                                            <UserIcon
                                                                styles={{
                                                                    height: '24px',
                                                                    width: '24px',
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </AspectRatio>
                                                <Group gap={rem(8)}>
                                                    <Text className="text-sm font-semibold w-full">
                                                        {option.fullName}
                                                    </Text>
                                                    <Text className="text-sm font-semibold w-full">{option.phone}</Text>
                                                </Group>
                                            </Group>
                                        </Combobox.Option>
                                    );
                                })
                            )}
                        </Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
            </Box>
            <Group justify="flex-end" gap={rem(12)} className="mt-6">
                <Button
                    onClick={() => {
                        if (selectUser) {
                            setValue('');
                            setSelectUser(undefined);
                            setAppointment({ user: selectUser });
                            handleModalState[1].close();
                        }
                    }}
                    disabled={!selectUser}
                >
                    Lấy thông tin
                </Button>
            </Group>
        </Modal>
    );
}
