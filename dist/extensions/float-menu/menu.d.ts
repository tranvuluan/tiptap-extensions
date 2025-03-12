import { Editor, Extension, Range } from "@tiptap/core";
import { FloatMenuView } from "./view";
export interface FloatMenuItem {
    id: string;
    name: string;
    view: string;
    shortcut?: string;
    active: (props: {
        editor: Editor;
        view: FloatMenuView;
        range: Range;
        element: HTMLElement;
    }) => boolean;
    action: (props: {
        editor: Editor;
        view: FloatMenuView;
        range: Range;
        element: HTMLElement;
    }) => void;
    onInit?: (props: {
        editor: Editor;
        view: FloatMenuView;
        range: Range;
        element: HTMLElement;
    }) => void;
    onUpdate?: (props: {
        editor: Editor;
        view: FloatMenuView;
        range: Range;
        element: HTMLElement;
    }) => void;
    onDestroy?: (props: {
        editor: Editor;
        view: FloatMenuView;
        range: Range;
        element: HTMLElement;
    }) => void;
}
export interface FloatMenuItemStorage {
    floatMenu?: {
        hide?: boolean;
        items?: FloatMenuItem | Array<FloatMenuItem>;
    };
}
export interface FloatMenuOptions {
    items: Array<string>;
}
export declare const FloatMenu: Extension<FloatMenuOptions, any>;
//# sourceMappingURL=menu.d.ts.map