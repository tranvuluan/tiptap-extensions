import { useState } from "react";

const StyleBoxEditor = () => {
  const [styles, setStyles] = useState({
    padding: "10px",
    margin: "10px",
    border: "1px solid black",
    backgroundColor: "#f0f0f0",
  });

  const [enableStyle, setEnableStyle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prevStyles) => ({
      ...prevStyles,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex", gap: "20px", position: "relative" }}>
      <button onClick={() => setEnableStyle(!enableStyle)}>Set style</button>
      {enableStyle && (
        <div style={{ width: "250px", position: "absolute", top: 5, right: 0 }}>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Padding:
                <input
                  type="text"
                  name="padding"
                  value={styles.padding}
                  onChange={handleChange}
                  placeholder="e.g., 10px"
                  style={{ marginLeft: "10px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Margin:
                <input
                  type="text"
                  name="margin"
                  value={styles.margin}
                  onChange={handleChange}
                  placeholder="e.g., 10px"
                  style={{ marginLeft: "10px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Border:
                <input
                  type="text"
                  name="border"
                  value={styles.border}
                  onChange={handleChange}
                  placeholder="e.g., 1px solid black"
                  style={{ marginLeft: "10px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Background Color:
                <input
                  type="text"
                  name="backgroundColor"
                  value={styles.backgroundColor}
                  onChange={handleChange}
                  placeholder="e.g., #f0f0f0"
                  style={{ marginLeft: "10px", width: "100%" }}
                />
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { StyleBoxEditor };
