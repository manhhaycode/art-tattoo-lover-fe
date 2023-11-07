import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TbFileUpload, TbPhoto, TbTrashX } from 'react-icons/tb';
import { ImageSlider } from '../common/Image';

export default function DropZoneImage({
    handleDrop,
    handleSave,
    src,
}: {
    handleDrop?: (files: FileWithPath[]) => void;
    handleSave?: (files: FileWithPath[]) => void;
    src: string;
}) {
    const [srcDefault, setSrcDefault] = useState(src);
    const [files, setFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        setSrcDefault(src);
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
                        <TbPhoto className="text-[#C4C4C4] w-1/2 h-1/2 mx-auto" />
                        <Text className="text-[#C4C4C4] font-semibold">Kéo thả ảnh vào đây</Text>
                    </Box>
                </Dropzone>
            ) : (
                <div className="relative">
                    <ImageSlider className="rounded-xl" src={srcDefault} />
                    <Group className="ga[-x-4">
                        {files.length > 0 && (
                            <ActionIcon
                                onClick={() => {
                                    handleSave && handleSave(files);
                                    setFiles([]);
                                }}
                                className="absolute top-2 right-2"
                                color="green"
                                radius="xl"
                            >
                                <TbFileUpload />
                            </ActionIcon>
                        )}
                        <ActionIcon
                            onClick={() => {
                                setFiles([]);
                                setSrcDefault('');
                            }}
                            className="absolute top-2 right-10"
                            color="red"
                            radius="xl"
                        >
                            <TbTrashX />
                        </ActionIcon>
                    </Group>
                </div>
            )}
        </>
    );
}
