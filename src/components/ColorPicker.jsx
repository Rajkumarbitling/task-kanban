import React, { useState } from 'react'
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const ColorPicker = (props) => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleClick = () => {
      setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
      setDisplayColorPicker(false);
    };

    const handleChange = (color) => {
      props.setColor(color.hex);
    };

    const styles = reactCSS({
      default: {
        color: {
          height: "20px",
          borderRadius: "2px",
          background: props.color,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
          width: "-webkit-fill-available",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });
  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={props.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker