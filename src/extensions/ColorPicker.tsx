import { useState } from "react";
import { HexColorPicker } from "react-colorful";

type TProps = {
  color: string;
  onChange: (...args: any) => void;
  onDisplayStatus?: (...args: any) => void;
}

const ColorPicker = ({ color, onChange, onDisplayStatus }: TProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
    onDisplayStatus(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    onDisplayStatus(false);
  };

  const styles = {
    color: {
      width: "36px",
      height: "14px",
      borderRadius: "2px",
      background: color,
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: 100,
      right: 0,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  } as any;

  return (
    <div contentEditable={false}>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <HexColorPicker
            style={{ width: 150, height: 150 }}
            color={color}
            onChange={(colorResult) => onChange(colorResult)}
          />
        </div>
      )}
    </div>
  );
};

export { ColorPicker };
