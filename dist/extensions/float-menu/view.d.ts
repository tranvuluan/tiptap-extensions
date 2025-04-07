import { Instance, Props } from "tippy.js";
import { EditorView } from "@tiptap/pm/view";
import { EditorState, PluginView } from "@tiptap/pm/state";
import { Editor, Range } from "@tiptap/core";
export interface FloatMenuInputViewOptions {
    id?: string;
    name: string;
    type?: string;
    value?: string;
    class?: string | string[];
    style?: Partial<CSSStyleDeclaration> | Array<Partial<CSSStyleDeclaration>>;
    onEnter?: (value: string, element: HTMLInputElement) => void;
    onInput?: (value: string, element: HTMLInputElement) => void;
    onChange?: (value: string, element: HTMLInputElement) => void;
    onKey?: (key: Pick<KeyboardEvent, "key" | "ctrlKey" | "altKey" | "metaKey" | "shiftKey">, value: string, element: HTMLInputElement) => void;
    onBoundary?: (boundary: "left" | "right", value: string, element: HTMLInputElement) => void;
}
export interface FloatMenuButtonViewOptions {
    id?: string;
    name: string;
    view: string;
    shortcut?: string;
    class?: string | string[];
    style?: Partial<CSSStyleDeclaration> | Array<Partial<CSSStyleDeclaration>>;
    onClick?: (element: HTMLButtonElement) => void;
}
export interface FloatMenuUploadViewOptions extends Omit<FloatMenuButtonViewOptions, "onClick"> {
    accept?: string;
    onUpload?: (element: HTMLInputElement) => void;
}
export interface FloatMenuViewOptions {
    editor: Editor;
    class?: string | string[];
    style?: Partial<CSSStyleDeclaration> | Array<Partial<CSSStyleDeclaration>>;
    rect?: (props: {
        view: FloatMenuView;
        editor: Editor;
    }) => DOMRect;
    show?: (props: {
        view: FloatMenuView;
        editor: Editor;
    }) => boolean;
    tippy?: (props: {
        view: FloatMenuView;
        editor: Editor;
        options: Partial<Props>;
    }) => Partial<Props>;
    onInit?: (props: {
        view: FloatMenuView;
        editor: Editor;
        range: Range;
        element: HTMLElement;
    }) => void;
    onUpdate?: (props: {
        view: FloatMenuView;
        editor: Editor;
        range: Range;
        element: HTMLElement;
    }) => void;
    onDestroy?: (props: {
        view: FloatMenuView;
        editor: Editor;
        range: Range;
        element: HTMLElement;
    }) => void;
}
export declare class FloatMenuView implements PluginView {
    private readonly editor;
    private readonly popover;
    private readonly element;
    private readonly options;
    static create(options: FloatMenuViewOptions): () => FloatMenuView;
    constructor(options: FloatMenuViewOptions);
    show(): void;
    hide(): void;
    update(view: EditorView, prevState?: EditorState): void;
    destroy(): void;
    createInput(options: FloatMenuInputViewOptions): {
        input: HTMLInputElement;
    };
    createButton(options: FloatMenuButtonViewOptions): {
        button: HTMLButtonElement;
        popover: HTMLDivElement;
        instance: Instance<Props>;
    };
    createUpload(options: FloatMenuUploadViewOptions): {
        file: HTMLInputElement;
        button: HTMLButtonElement;
        popover: HTMLDivElement;
        instance: Instance<Props>;
    };
    createGroup(direction: "column" | "row"): HTMLDivElement;
    createDivider(): {
        divider: HTMLSpanElement;
    };
    private _rect;
    private _element;
    private _popover;
}
//# sourceMappingURL=view.d.ts.map