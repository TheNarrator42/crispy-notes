import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";

import "../css/Card.css";
import "react-quill/dist/quill.snow.css";
import BackButton from "./BackButton";

const Card = (props) => {
  const [expand, setExpand] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    switch (props.active) {
      case -1:
        setExpand(false);
        setDisplay(true);
        break;
      case props.id:
        setExpand(true);
        break;
      default:
        setDisplay(false);
        break;
    }
  }, [props.active]);

  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  if (expand) {
    return (
      <div className="card-full-container">
        <div className="card-container">
          <textarea
            className="card-title"
            rows="1"
            cols="10"
            placeholder="title goes here..."
            onChange={(e) => {
              props.setTitleValue(props.id, e.target.value);
            }}
            value={props.titleValue}
          />

          <ReactQuill
            className="card-editor"
            theme="snow"
            modules={modules}
            value={props.value}
            onChange={(value) => props.setValue(props.id, value)}
          />

          <BackButton
            onClick={() => {
              props.handleUpdateActive(-1);
            }}
            visible={true}
          />
        </div>

        <textarea
          className="card-term-list"
          rows="30"
          cols="5"
          placeholder="enter key terms here, 1 per line"
          onChange={(e) => props.setTermlistValue(props.id, e.target.value)}
          value={props.termlistValue}
        />
      </div>
    );
  } else if (display) {
    return (
      <Draggable
        handle="#handle"
        onDrag={(e, data) => props.handleDrag(props.id, data)}
      >
        <div
          style={{
            position: "absolute",
            left: props.pos["x"],
            top: props.pos["y"],
          }}
        >
          <div
            className="cardview-content"
            style={{
              backgroundColor: props.color ? props.color : "blue",
            }}
            onClick={() => {
              props.handleUpdateActive(props.id);
            }}
          >
            <div className="cardview-text">{props.title}</div>
          </div>
          <div className="triangle" id="handle" />
        </div>
      </Draggable>
    );
  } else {
    return null;
  }
};

export default Card;
