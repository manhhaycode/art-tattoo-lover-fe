import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IconFileUpload, IconPhoto, IconTrashX } from '@tabler/icons-react';
import { ImageSlider } from '../common/Image';
import { twMerge } from 'tailwind-merge';

export default function DropZoneImage({
    handleDrop,
    handleSave,
    handleRemove,
    classNames,
    src,
}: {
    handleDrop?: (files: FileWithPath[]) => void;
    handleSave?: (files: FileWithPath[]) => void;
    handleRemove?: (files: FileWithPath[]) => void;
    classNames?: {
        dropZone?: string;
        image?: string;
    };
    src: string;
}) {
    const [srcDefault, setSrcDefault] = useState(src);
    const [files, setFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        setSrcDefault(src);
        setFiles([]);
    }, [src]);

    return (
        <>
            {srcDefault.length === 0 ? (
                <Dropzone
                    variant="filled"
                    multiple={false}
                    onDrop={(files) => {
                        handleDrop && handleDrop(files);
                        setSrcDefault(URL.createObjectURL(files[0]));
                        setFiles(files);
                        toast.success('Tải ảnh thành công, nhấn thay đổi thông tin để cập nhật');
                    }}
                    onReject={() => {
                        toast.error('Kích thước ảnh quá 100Kb hoặc không đúng định dạng ảnh');
                    }}
                    maxSize={100 * 1024}
                    accept={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                    classNames={{
                        root: 'w-full h-full',
                        inner: 'w-full h-full',
                    }}
                >
                    <Box className="flex flex-col justify-center items-center w-full h-full gap-y-4">
                        <IconPhoto className="text-[#C4C4C4] w-1/2 h-1/2 mx-auto" />
                        <Text className="text-[#C4C4C4] font-semibold">Kéo thả ảnh vào đây</Text>
                    </Box>
                </Dropzone>
            ) : (
                <div className="relative">
                    <ImageSlider
                        className={twMerge('rounded-xl', classNames?.image?.toString() || '')}
                        src={srcDefault}
                    />
                    <Group className="gap-x-4 absolute top-2 right-2">
                        {files.length > 0 && (
                            <ActionIcon
                                onClick={() => {
                                    handleSave && handleSave(files);
                                }}
                                color="green"
                                radius="xl"
                            >
                                <IconFileUpload />
                            </ActionIcon>
                        )}
                        <ActionIcon
                            variant="filled"
                            onClick={() => {
                                setFiles([]);
                                setSrcDefault('');
                                handleRemove && handleRemove(files);
                            }}
                            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            radius="xl"
                        >
                            <IconTrashX />
                        </ActionIcon>
                    </Group>
                </div>
            )}
        </>
    );
}