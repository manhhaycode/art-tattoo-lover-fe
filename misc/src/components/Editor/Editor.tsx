import ExampleTheme from './themes/ExampleTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin';
import { ImageNode } from './nodes/ImageNode';
import ImagesPlugin from './plugins/ImagePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

function Placeholder() {
    return <div className="editor-placeholder">Nhập mô tả chi tiết về studio</div>;
}

const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    namespace: 'MyEditor',
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        TableCellNode,
        TableNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        ImageNode,
    ],
};

export default function Editor({
    text,
    saveEditor,
    editable,
}: {
    text: string;
    saveEditor?: (text: string) => Promise<void>;
    editable: boolean;
}) {
    return (
        <LexicalComposer initialConfig={{ ...editorConfig, editable }}>
            <div className="editor-container">
                <ToolbarPlugin editable={editable} text={text} saveEditor={saveEditor} />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <ImagesPlugin />
                    <LexicalAutoLinkPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}
