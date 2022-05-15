import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import "../css/BackButton.css";

const BackButton = (props) => {
  //button to return to previous page
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    visible && (
      <div className="backbutton">
        {/* onClick is passed from parent */}
        <Button variant="light" size="sm" onClick={props.onClick}>
          <FaArrowLeft size="1.5em" />
        </Button>
      </div>
    )
  );
};

export default BackButton;
