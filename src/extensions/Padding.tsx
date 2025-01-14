const inputStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const textStyle = {
  fontSize: "11px",
  marginRight: "5px",
};

const Padding = ({ paddingHorizontal, paddingVertical, onChange }) => {
  return (
    <div>
      <div style={{ ...inputStyle, marginBottom: "5px" }}>
        <span style={textStyle}>Padding horizontal</span>
        <input
          type="number"
          defaultValue={paddingHorizontal || 0}
          style={{ width: "46px", height: "20px" }}
          onChange={(e) => onChange("horizontal", parseInt(e.target.value, 10))}
        />
      </div>
      <div style={inputStyle}>
        <span style={textStyle}>Padding vertical</span>
        <input
          type="number"
          defaultValue={paddingVertical || 0}
          style={{ width: "46px" }}
          onChange={(e) => onChange("vertical", parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  );
};

export { Padding };
