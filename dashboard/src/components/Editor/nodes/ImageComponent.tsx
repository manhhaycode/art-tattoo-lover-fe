import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
    $getNodeByKey,
    $getSelection,
    $isNodeSelection,
    // $setSelection,
    COMMAND_PRIORITY_LOW,
    GridSelection,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    LexicalEditor,
    NodeKey,
    NodeSelection,
    RangeSelection,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { $isImageNode } from './ImageNode';
import { AspectRatio } from '@mantine/core';
import DropZoneImage from '@/components/DropZone';
import { useUploadMediaMutation } from '@/features/media';
import toast from 'react-hot-toast';
import { FileWithPath } from '@mantine/dropzone';

// const imageCache = new Set();

// function useSuspenseImage(src: string) {
//     if (!imageCache.has(src)) {
//         throw new Promise((resolve) => {
//             const img = new Image();
//             img.src = src;
//             img.onload = () => {
//                 imageCache.add(src);
//                 resolve(null);
//             };
//         });
//     }
// }

export function LazyImage({
    // altText,
    // className,
    // imageRef,
    src,
    // width,
    height, // maxWidth,
    handleSave,
}: {
    altText: string;
    className?: string | null;
    height: 'inherit' | number;
    imageRef: { current: null | HTMLImageElement };
    maxWidth: number;
    src: string;
    width: 'inherit' | number;
    handleSave?: (files: FileWithPath[]) => void;
}): JSX.Element {
    // useSuspenseImage(src);
    return (
        <AspectRatio
            ratio={16 / 9}
            style={{
                height,
                maxWidth: '80%',
                width: 1000,
            }}
        >
            <DropZoneImage
                maxSize={3072}
                errorString="Kích thước ảnh quá 3Mb hoặc không đúng định dạng ảnh"
                handleSave={(files) => {
                    handleSave && handleSave(files);
                }}
                src={src}
                classNames={{ image: 'rounded-none	' }}
            ></DropZoneImage>
        </AspectRatio>
    );
}

export default function ImageComponent({
    src,
    altText,
    nodeKey,
    width,
    height,
    maxWidth, // resizable,
    // caption,
} // showCaption,
// captionsEnabled,
: {
    altText: string;
    caption: LexicalEditor;
    height: 'inherit' | number;
    maxWidth: number;
    nodeKey: NodeKey;
    resizable: boolean;
    showCaption: boolean;
    src: string;
    width: 'inherit' | number;
    captionsEnabled: boolean;
}) {
    const imageRef = useRef(null);
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [editor] = useLexicalComposerContext();
    const [, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);
    const activeEditorRef = useRef<LexicalEditor | null>(null);
    const uploadMediaMutation = useUploadMediaMutation({
        onSuccess: (data) => {
            editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if ($isImageNode(node)) {
                    node.setSrc(data.url);
                }
            });
            toast.success('Tải ảnh lên server thành công');
        },
        onError: (erorr) => {
            console.log(erorr);
            toast.error('Tải ảnh lên server thất bại');
        },
    });

    const handleUpload = useCallback(
        (files: FileWithPath[]) => {
            editor.getEditorState().read(() => {
                const node = $getNodeByKey(nodeKey);
                if ($isImageNode(node)) {
                    uploadMediaMutation.mutate({
                        file: files[0],
                        type: 0,
                    });
                }
            });
        },
        [nodeKey, editor, uploadMediaMutation],
    );

    const onDelete = useCallback(
        (payload: KeyboardEvent) => {
            if (isSelected && $isNodeSelection($getSelection())) {
                const event = payload;
                event.preventDefault();
                const node = $getNodeByKey(nodeKey);
                if ($isImageNode(node)) {
                    node.remove();
                }
                setSelected(false);
            }
            return false;
        },
        [isSelected, nodeKey, setSelected],
    );

    useEffect(() => {
        let isMounted = true;
        const unregister = mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                if (isMounted) {
                    setSelection(editorState.read(() => $getSelection()));
                }
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_, activeEditor) => {
                    activeEditorRef.current = activeEditor;
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
            editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
        );
        return () => {
            isMounted = false;
            unregister();
        };
    }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

    return (
        <Suspense fallback={null}>
            <>
                <div draggable={false} style={{ display: 'flex', justifyContent: 'center' }} className="image">
                    <LazyImage
                        src={src}
                        altText={altText}
                        imageRef={imageRef}
                        width={width}
                        height={height}
                        maxWidth={maxWidth}
                        handleSave={handleUpload}
                    />
                </div>
            </>
        </Suspense>
    );
}
