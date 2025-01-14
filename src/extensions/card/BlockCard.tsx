import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { AlignStyle } from "../AlignStyle";
import { useState } from "react";

export const inputRegex = /^\s*>card\s$/;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    BlockCard: {
      /**
       * Set a blockquote node
       */
      setBlockCard: () => ReturnType,
      /**
       * Toggle a blockquote node
       */
      unsetBlockCard: () => ReturnType,
      toggleBlockCard: () => ReturnType,
    }
  }
}


export const BlockCard = Node.create({
  name: "blockcard",

  addOptions() {
    return { HTMLAttributes: {} };
  },

  content: "block+",
  group: "block",
  defining: true,
  priority: 0,

  parseHTML() {
    return [{ tag: "card" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "card",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBlockCard:
        () =>
          ({ commands, chain }) => {
            return commands.wrapIn(this.name)
          },
      toggleBlockCard:
        () =>
          ({ commands }) =>
            commands.toggleWrap(this.name),
      unsetBlockCard:
        () =>
          ({ commands }) =>
            commands.lift(this.name),
    };
  },

  addAttributes() {
    return {
      backgroundColor: { default: "#ffff" },
      cardAlignment: { default: "center" },
      width: {
        default: 700,
      },
      height: {
        default: 393
      }
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addStorage() {
    return {
      ...this.parent?.(),
      blockMenu: {
        items: [
          {
            id: this.name,
            name: "Card",
            icon: `<div class="editor--block-card-icon">
                      <div class="editor--block-card-icon__bar"></div>
                      <div class="editor--block-card-icon__bar"></div>
                  </div>`,
            // shortcut: "Mod-Shift-B",
            keywords: "card,card,c",
            action: editor => editor.chain().toggleBlockCard().focus().run(),
          },
        ],
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockCardCustomView);
  },
});

const BlockCardCustomView = ({ node, updateAttributes }) => {
  const {
    backgroundColor,
    cardAlignment,
    width,
    height
  } = node.attrs;
  const [cardAlign, setCardAlign] = useState(cardAlignment);
  const [dimension, setDimension] = useState({ width, height });
  const [bgColor, setBgColor] = useState(backgroundColor);

  const handleStyleChange = (key: "alignment" | "width" | "height" | "backgroundColor", value: any) => {
    let attr: string;
    switch (key) {
      case "alignment":
        setCardAlign(value);
        attr = "cardAlignment";
        break;
      case "width":
        value = Number(value);
        setDimension(prev => ({ ...prev, width: value }))
        attr = "width";
        break;
      case "height":
        value = Number(value);
        setDimension(prev => ({ ...prev, height: value }))
        attr = "height";
        break;
      case "backgroundColor":
        setBgColor(value)
        attr = "backgroundColor";
        break;
      default:
        break;
    }
    updateAttributes({ [attr]: value });
  };

  return (
    <NodeViewWrapper>
      <Box sx={{ display: 'flex', alignItems: cardAlign, flexDirection: 'column' }}>
        <Card sx={{ position: 'relative', width: dimension.width }}>
          <AlignStyle dimension={dimension} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }} onStyleChange={handleStyleChange} backgroundColor={bgColor} />
          <Box bgcolor={bgColor}>
            <CardMedia
              component="img"
              sx={{ width: dimension.width, height: dimension.height, }}
              image="https://placehold.co/200x200?text=Image"
              alt="green iguana"
            />
            <CardContent>
              <NodeViewContent
                className="block-card"
                as="div"
              />
            </CardContent>
          </Box>
        </Card>
      </Box>
    </NodeViewWrapper>
  );
};
