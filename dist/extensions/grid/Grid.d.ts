import { Node } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        Grid: {
            addGrid: () => ReturnType;
            addGridRow: () => ReturnType;
            toggleGrid: () => ReturnType;
            addGridColumn: () => ReturnType;
        };
    }
}
export declare const Grid: Node<any, any>;
export declare const GridRow: Node<any, any>;
export declare const GridColumn: Node<any, any>;
export declare const GridRowView: (props: any) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Grid.d.ts.map