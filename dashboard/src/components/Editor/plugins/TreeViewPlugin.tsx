import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

export default function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();
    return (
        <TreeView
            viewClassName="tree-view-output"
            editor={editor}
            treeTypeButtonClassName={''}
            timeTravelButtonClassName={''}
            timeTravelPanelButtonClassName={''}
            timeTravelPanelClassName={''}
            timeTravelPanelSliderClassName={''}
        />
    );
}
