import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useState } from 'react';
import { ColorPaddingStyle } from '../ColorPaddingStyle';

export interface BlockBoxOptions {
  /**
   * HTML attributes to add to the blockquote element
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    blockBox: {
      /**
       * Set a blockquote node
       */
      setBlockBox: () => ReturnType,
      /**
       * Toggle a blockquote node
       */
      toggleBlockBox: () => ReturnType,
      /**
       * Unset a blockquote node
       */
      unsetBlockBox: () => ReturnType,
    }
  }
}

/**
 * Matches a blockquote to a `>` as input.
 */
const inputRegex = /^\s*>box\s$/

/**
 * This extension allows you to create blockquotes.
 * @see https://tiptap.dev/api/nodes/blockquote
 */
export const BlockBox = Node.create<BlockBoxOptions>({

  name: 'blockbox',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'block+',

  group: 'block',

  defining: true,
  priority: 0,

  parseHTML() {
    return [
      { tag: 'blockbox' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockbox', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setBlockBox: () => ({ commands }) => {
        return commands.wrapIn(this.name)
      },
      toggleBlockBox: () => ({ commands }) => {
        return commands.toggleWrap(this.name)
      },
      unsetBlockBox: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },

  addAttributes() {
    return {
      backgroundColor: {
        default: '#F1F1F1',
      },
      paddingHorizontal: {
        default: 10
      },
      paddingVertical: {
        default: 10
      }
    };
  },

  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
  //   }
  // },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },

  addStorage() {
    return {
      ...this.parent?.(),
      blockMenu: {
        items: [
          {
            id: this.name,
            name: "Block box",
            icon: `<div style="border: 2px solid #1e1e1e; width: 10px; height: 10px"></div>`,
            // shortcut: "Mod-Shift-B",
            keywords: "blockbox,bb,box",
            action: editor => editor.chain().toggleBlockBox().focus().run(),
          },
        ],
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockBoxCustomView);
  },
})


const BlockBoxCustomView = (props: any) => {
  let { backgroundColor, paddingHorizontal, paddingVertical } = props.node.attrs;
  const [paddingStyle, setPaddingStyle] = useState({ paddingHorizontal, paddingVertical });
  if (backgroundColor === 'transparent') {
    backgroundColor = "#ffffff"
  }

  function handleChangeColor(hex: string) {
    props.updateAttributes({
      backgroundColor: hex
    })
  }

  function handleChangePadding(type: 'horizontal' | 'vertical', value: number) {
    props.updateAttributes({
      [type === 'horizontal' ? 'paddingHorizontal' : 'paddingVertical']: value
    });
    if (type === "horizontal") {
      setPaddingStyle((prev) => {
        return {
          paddingVertical: prev.paddingVertical,
          paddingHorizontal: value
        }
      });
    } else if (type === "vertical") {
      setPaddingStyle((prev) => {
        return {
          paddingVertical: value,
          paddingHorizontal: prev.paddingHorizontal
        }
      });
    }
  }

  function handleStyleChange(key: string, value: any) {

    switch (key) {
      case 'paddingHorizontal':
        handleChangePadding('horizontal', value);
        break;
      case 'paddingVertical':
        handleChangePadding('vertical', value);
        break;
      case 'backgroundColor':
        handleChangeColor(value);
        break;
      default:
        break;
    }
  }

  return (
    <NodeViewWrapper>
      <div style={{ position: 'relative' }}>
        <ColorPaddingStyle onStyleChange={handleStyleChange} style={{ right: 0, position: 'absolute', top: 0 }}  paddingProps={paddingStyle}/>
        <NodeViewContent className={`block-box`} as="div" style={{
          backgroundColor, paddingTop: paddingStyle.paddingVertical + "px", paddingBottom: paddingStyle.paddingVertical + "px",
          paddingLeft: paddingStyle.paddingHorizontal + "px", paddingRight: paddingStyle.paddingHorizontal + "px", minHeight: 20
        }} />
      </div>
    </NodeViewWrapper>
  );
}
