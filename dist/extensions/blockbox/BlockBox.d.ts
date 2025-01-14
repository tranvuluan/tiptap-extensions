import { Node } from '@tiptap/core';
export interface BlockBoxOptions {
    /**
     * HTML attributes to add to the blockquote element
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        blockBox: {
            /**
             * Set a blockquote node
             */
            setBlockBox: () => ReturnType;
            /**
             * Toggle a blockquote node
             */
            toggleBlockBox: () => ReturnType;
            /**
             * Unset a blockquote node
             */
            unsetBlockBox: () => ReturnType;
        };
    }
}
/**
 * This extension allows you to create blockquotes.
 * @see https://tiptap.dev/api/nodes/blockquote
 */
export declare const BlockBox: Node<BlockBoxOptions, any>;
//# sourceMappingURL=BlockBox.d.ts.map