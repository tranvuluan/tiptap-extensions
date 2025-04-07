import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { Box, Button, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { AlignStyle } from "../AlignStyle";
import { useRef, useState } from "react";
import { FaLink } from 'react-icons/fa';
import AddLinkPopover from "../AddLinkPopover";
import './style.css';

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
      imageLink: {
        default: "https://placehold.co/100x100?text=Image"
      },
      width: {
        default: 100,
      },
      height: {
        default: 100
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

const BlockCardCustomView = ({ node, updateAttributes, editor }) => {
  const {
    backgroundColor,
    cardAlignment,
    width,
    height,
    imageLink
  } = node.attrs;
  const [cardAlign, setCardAlign] = useState(cardAlignment);
  const [dimension, setDimension] = useState({ width, height });
  const [bgColor, setBgColor] = useState(backgroundColor);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [link, setImageLink] = useState<string>(imageLink);
  const isEditable = editor.isEditable;
  const debounceResetDimension = useRef<any>();

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLinkAdd = (link: string) => {
    setImageLink(link);
    updateAttributes({ "imageLink": link });
  };

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
          {isEditable && <AlignStyle dimension={dimension} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }} onStyleChange={handleStyleChange} backgroundColor={bgColor} />}
          {isEditable && <IconButton color="primary" onClick={handleButtonClick} sx={{ position: "absolute", top: 0, left: 0 }}>
            <FaLink />
          </IconButton>}
          {isEditable && <AddLinkPopover
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            onLinkAdd={handleLinkAdd}
          />}
          <Box bgcolor={bgColor}>
            <CardMedia
              component="img"
              sx={{ width: dimension.width || 'auto', height: dimension.height || 'auto', }}
              image={link}
              alt="green iguana"
            />
            <CardContent>
              <Box
                sx={{ width: dimension.width }}>
                <NodeViewContent
                  className="block-card"
                  as="div"
                />
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </NodeViewWrapper>
  );
};
