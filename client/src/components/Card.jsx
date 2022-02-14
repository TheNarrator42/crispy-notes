import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";

import "../css/Card.css";
import "react-quill/dist/quill.snow.css";
import BackButton from "./BackButton";
import { EditText } from "react-edit-text";

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
  }, [props.active, props.id]);

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
          <EditText
            className="card-title"
            placeholder="title goes here..."
            onSave={(title) => {
              props.setTitle(props.id, title.value);
            }}
            defaultValue={props.title}
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
        axis="none"
        position={{
          x: props.pos["x"],
          y: props.pos["y"],
        }}
        bounds={"body"}
      >
        <div>
          <div
            className="cardview-content"
            style={{
              backgroundColor: props.color ? props.color : "blue",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                props.handleUpdateActive(props.id);
              }
            }}
          >
            <EditText
              className="cardview-text"
              placeholder="title goes here..."
              onSave={(title) => {
                props.setTitle(props.id, title.value);
              }}
              defaultValue={props.title}
            />
            <div className="triangle" id="handle" />
          </div>
        </div>
      </Draggable>
    );
  } else {
    return null;
  }
};

export default Card;
