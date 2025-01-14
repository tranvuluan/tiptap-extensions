import React from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatQuote,
} from "react-icons/md";
import { AiOutlineBorder } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { BiCreditCardFront } from "react-icons/bi";

const onHeadingChange = (editor: any, type: string) => {
  switch (type) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(type.replace("h", "")) })
        .run();
      break;
    case "paragraph":
      editor.chain().focus().setParagraph().run();
      break;
    default:
      break;
  }
};

interface ToolbarProps {
  editor: any;
  toggleMediaLib: () => void;
  settings: { headings: string[] };
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  toggleMediaLib,
  settings,
}) => {
  if (!editor) {
    return null;
  }

  let selectedTextStyle = "none";

  if (editor.isActive("heading", { level: 1 })) selectedTextStyle = "h1";
  if (editor.isActive("heading", { level: 2 })) selectedTextStyle = "h2";
  if (editor.isActive("heading", { level: 3 })) selectedTextStyle = "h3";
  if (editor.isActive("heading", { level: 4 })) selectedTextStyle = "h4";
  if (editor.isActive("heading", { level: 5 })) selectedTextStyle = "h5";
  if (editor.isActive("heading", { level: 6 })) selectedTextStyle = "h6";
  if (editor.isActive("paragraph")) selectedTextStyle = "paragraph";

  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", width: '100%' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Text Style Dropdown */}
          <Select
            value={selectedTextStyle}
            onChange={(e) => onHeadingChange(editor, e.target.value)}
            displayEmpty
            variant="outlined"
            size="small"
            sx={{ mr: 2, minWidth: 120 }}
          >
            <MenuItem value="paragraph">Paragraph</MenuItem>
            {settings?.headings?.includes("h1") && (
              <MenuItem value="h1">Heading 1</MenuItem>
            )}
            {settings?.headings?.includes("h2") && (
              <MenuItem value="h2">Heading 2</MenuItem>
            )}
            {settings?.headings?.includes("h3") && (
              <MenuItem value="h3">Heading 3</MenuItem>
            )}
            {settings?.headings?.includes("h4") && (
              <MenuItem value="h4">Heading 4</MenuItem>
            )}
            {settings?.headings?.includes("h5") && (
              <MenuItem value="h5">Heading 5</MenuItem>
            )}
            {settings?.headings?.includes("h6") && (
              <MenuItem value="h6">Heading 6</MenuItem>
            )}
          </Select>

          {/* Text Alignment and Block Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <MdFormatAlignLeft />
            </IconButton>
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <MdFormatAlignCenter />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <MdFormatAlignRight />
            </IconButton>
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <MdFormatAlignJustify />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <MdFormatQuote />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockBox().run()}
            >
              <AiOutlineBorder />
            </IconButton>
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleBlockAccordion().run()
              }
            >
              <FaCaretDown />
            </IconButton>
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockCard().run()}
            >
              <BiCreditCardFront />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
