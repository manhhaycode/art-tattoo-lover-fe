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
import { AspectRatio, Image as ImageM } from '@mantine/core';

const imageCache = new Set();

function useSuspenseImage(src: string) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve(null);
            };
        });
    }
}

export function LazyImage({
    altText,
    className,
    imageRef,
    src,
    // width,
    height,
} // maxWidth,
: {
    altText: string;
    className?: string | null;
    height: 'inherit' | number;
    imageRef: { current: null | HTMLImageElement };
    maxWidth: number;
    src: string;
    width: 'inherit' | number;
}): JSX.Element {
    useSuspenseImage(src);
    return (
        <AspectRatio
            ratio={16 / 9}
            style={{
                height,
                maxWidth: '80%',
                width: 1000,
            }}
        >
            <ImageM className={className || undefined} src={src} alt={altText} ref={imageRef} draggable="false" />
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
                    />
                </div>
            </>
        </Suspense>
    );
}
