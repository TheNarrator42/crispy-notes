import { React, useState, useEffect } from "react";

const BackButton = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    visible && (
      <div
        style={{
          background: "red",
          height: "50px",
          width: "50px",
          position: "absolute",
          bottom: "20px",
        }}
        onClick={props.onClick}
      ></div>
    )
  );
};

export default BackButton;
