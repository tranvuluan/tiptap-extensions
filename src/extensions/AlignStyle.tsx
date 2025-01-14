import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Popover,
  Typography
} from "@mui/material";
import { useRef, useState } from "react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaSlidersH,
} from "react-icons/fa";

const AlignStyle = ({ style, onStyleChange, dimension, backgroundColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { width, height } = dimension;
  const deboundChangeColor = useRef<any>();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlignmentChange = (alignment) => {
    onStyleChange("alignment", alignment);
  };

  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    onStyleChange("width", newWidth);
  };

  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    onStyleChange("height", newHeight);
  };


  const handleColorChange = (event) => {
    if (deboundChangeColor.current) {
      clearTimeout(deboundChangeColor.current);
    }
    deboundChangeColor.current = setTimeout((args: any[]) => {
      const [color] = args;
      onStyleChange("backgroundColor", color);
    }, 500, [event.target.value]);

  };
  

  const isOpen = Boolean(anchorEl);

  return (
    <Box sx={{ ...style }}>
      {/* Trigger Button */}
      <IconButton onClick={handleOpen}>
        <FaSlidersH size={20} />
      </IconButton>

      {/* Popover Content */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            width: "200px",
            height: '100%'
          }}
        >
          <ButtonGroup>
            <Button
              onClick={() => handleAlignmentChange("left")}
              variant={style.textAlign === "left" ? "contained" : "outlined"}
              color={style.textAlign === "left" ? "secondary" : "primary"}
            >
              <FaAlignLeft />
            </Button>
            <Button
              onClick={() => handleAlignmentChange("center")}
              variant={style.textAlign === "center" ? "contained" : "outlined"}
              color={style.textAlign === "center" ? "secondary" : "primary"}
            >
              <FaAlignCenter />
            </Button>
            <Button
              onClick={() => handleAlignmentChange("right")}
              variant={style.textAlign === "right" ? "contained" : "outlined"}
              color={style.textAlign === "right" ? "secondary" : "primary"}
            >
              <FaAlignRight />
            </Button>
          </ButtonGroup>

          {/* Width and Height Fields */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Width</Typography>
            <Input
              value={width}
              onChange={handleWidthChange}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              type="number"
            />
            <Typography variant="subtitle1">Height</Typography>
            <Input
              value={height}
              onChange={handleHeightChange}
              fullWidth
              type="number"
              size="small"
            />
          </Box>

          <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Background</Typography>
          <input
              value={backgroundColor}
              onChange={handleColorChange}
              type="color"
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export { AlignStyle };
