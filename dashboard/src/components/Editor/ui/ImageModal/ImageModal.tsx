import { Box, Button, Group, Input, Modal, Text, rem } from '@mantine/core';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ImageModal({
    handleModalState,
    handleInsertImage,
}: {
    handleModalState: readonly [
        boolean,
        {
            readonly open: () => void;
            readonly close: () => void;
            readonly toggle: () => void;
        },
    ];
    handleInsertImage: (url: string) => void;
}) {
    const [value, setValue] = useState('');
    return (
        <Modal
            opened={handleModalState[0]}
            onClose={handleModalState[1].close}
            size={'lg'}
            title={<Text className="text-sm font-semibold">Thêm ảnh mới</Text>}
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <Box className="flex flex-col gap-y-4 w-3/4">
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-semibold">Url hình ảnh</label>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        placeholder="Nhập url hình ảnh đã upload lên hệ thống"
                    />
                </div>
            </Box>
            <Group justify="flex-end" mt={rem(24)}>
                <Button
                    disabled={value.length === 0}
                    onClick={() => {
                        const parttern =
                            /^https:\/\/storage\.googleapis\.com\/arttattoolover-adf51\.appspot\.com\/media\/.*/;
                        if (value.length === 0 || !parttern.test(value)) {
                            toast.error('Url không hợp lệ');
                            return;
                        }
                        handleInsertImage(value);
                        handleModalState[1].close();
                    }}
                >
                    Thêm ảnh từ url
                </Button>
                <Button
                    onClick={() => {
                        handleInsertImage('');
                        handleModalState[1].close();
                    }}
                >
                    Tải ảnh mới từ máy
                </Button>
            </Group>
        </Modal>
    );
}
