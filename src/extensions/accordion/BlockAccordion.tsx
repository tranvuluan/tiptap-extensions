import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Accordion, AccordionSummary, AccordionDetails, Box, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ColorPaddingStyle } from "../ColorPaddingStyle";
import { useState } from "react";

const inputRegex = /^\s*>accordion\s$/;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    BlockAccordion: {
      /**
       * Set a blockquote node
       */
      setBlockAccordion: () => ReturnType,
      /**
       * Toggle a blockquote node
       */
      unsetBlockAccordion: () => ReturnType,
    }
  }
}


export const BlockAccordion = Node.create({
  name: "blockaccordion",

  addOptions() {
    return { HTMLAttributes: {} };
  },

  content: "block+",
  group: "block",
  defining: true,
  priority: 0,

  parseHTML() {
    return [{ tag: "accordion" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "accordion",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBlockAccordion:
        () =>
          ({ commands }) =>
            commands.wrapIn(this.name),
      toggleBlockAccordion:
        () =>
          ({ commands }) =>
            commands.toggleWrap(this.name),
      unsetBlockAccordion:
        () =>
          ({ commands }) =>
            commands.lift(this.name),
    };
  },

  addAttributes() {
    return {
      backgroundColor: { default: "white" },
      paddingHorizontal: { default: 40 },
      paddingVertical: { default: 10 },
      title: {
        default: "Title",
      },
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

  addNodeView() {
    return ReactNodeViewRenderer(BlockAccordionCustomView);
  },
});

const BlockAccordionCustomView = ({ node, updateAttributes, editor }) => {
  const {
    backgroundColor = "#F1F1F1",
    paddingHorizontal,
    paddingVertical,
    title,
  } = node.attrs;
  const [paddingStyle, setPaddingStyle] = useState({ paddingHorizontal, paddingVertical });
  const [hovered, setHovered] = useState(false);
  const isEditable = editor.isEditable;

  const handleStyleChange = (key, value) => {
    updateAttributes({ [key]: value });
    setPaddingStyle((prev) => ({
      ...prev,
      [key]: value
    }))
  };

  return (
    <NodeViewWrapper>
      <Box
        sx={{
          position: "relative",
          border: isEditable ? "1px dashed #ccc" : "unset",
          borderRadius: 1,
          overflow: "hidden",
        }}
        className="block-accordion-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isEditable && <ColorPaddingStyle
          onStyleChange={handleStyleChange}
          style={{
            position: "absolute",
            zIndex: 99,
            backgroundColor: "#f0f0f0",
            top: 10,
            right: 50,
            opacity: hovered ? 1 : 0,
            transition: '.3s'
          }}
          paddingProps={paddingStyle} />}
        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: backgroundColor,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "transparent",
              '& .MuiAccordionSummary-content': {
                margin: '0',

              },
            }}

          >
            <TextField
              type="text"
              value={title}
              onChange={(e) => handleStyleChange("title", e.target.value)}
              variant="standard"
              fullWidth
              placeholder="Enter title"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: `${paddingVertical}px ${paddingHorizontal}px`,
              backgroundColor:
                backgroundColor === "transparent" ? "#ffffff" : backgroundColor,
              minHeight: 70,
            }}
          >
            <NodeViewContent
              className="block-accordion"
              as="div"
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </NodeViewWrapper>
  );
};
