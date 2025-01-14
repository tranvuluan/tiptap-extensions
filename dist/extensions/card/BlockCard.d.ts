import { Node } from "@tiptap/core";
export declare const inputRegex: RegExp;
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        BlockCard: {
            /**
             * Set a blockquote node
             */
            setBlockCard: () => ReturnType;
            /**
             * Toggle a blockquote node
             */
            unsetBlockCard: () => ReturnType;
            toggleBlockCard: () => ReturnType;
        };
    }
}
export declare const BlockCard: Node<any, any>;
//# sourceMappingURL=BlockCard.d.ts.map