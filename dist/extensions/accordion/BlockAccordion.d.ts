import { Node } from "@tiptap/core";
import './style.css';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        BlockAccordion: {
            /**
             * Set a blockquote node
             */
            setBlockAccordion: () => ReturnType;
            /**
             * Toggle a blockquote node
             */
            unsetBlockAccordion: () => ReturnType;
        };
    }
}
export declare const BlockAccordion: Node<any, any>;
//# sourceMappingURL=BlockAccordion.d.ts.map