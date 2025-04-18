import { useState } from "react";
import { IconButton, Popover, Box, Typography } from "@mui/material";
import { FaSlidersH } from "react-icons/fa"; // Replacing Faders from @strapi/icons
import { ColorPicker } from "./ColorPicker";
import { Padding } from "./Padding";

const ColorPaddingStyle = ({ style, onStyleChange, paddingProps }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayColorPicker, setDisplayColorPicker ] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaddingChange = (type, value) => {
    if (type === "horizontal") {
      onStyleChange("paddingHorizontal", value);
    } else if (type === "vertical") {
      onStyleChange("paddingVertical", value);
    }
  };

  const isOpen = Boolean(anchorEl);

  return (
    <Box sx={{ ...style}}>
      {/* Trigger Button */}
      <IconButton onClick={handleOpen}>
        <FaSlidersH size={20} /> {/* Using react-icons */}
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
            width: "max-content",
            height: displayColorPicker ? "160px" : "100%"
          }}
        >
          {/* Background Color Picker */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 11 }}>
              Background:
            </Typography>
            <ColorPicker
              color="white"
              onChange={(color) => onStyleChange("backgroundColor", color)}
              onDisplayStatus={(status) => setDisplayColorPicker(status)}
            />
          </Box>

          {/* Padding Controls */}
          <Padding
            onChange={handlePaddingChange}
            paddingHorizontal={paddingProps?.paddingHorizontal || 0}
            paddingVertical={paddingProps?.paddingVertical ||0}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export { ColorPaddingStyle };
