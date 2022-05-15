import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";

import "../css/Card.css";
import "react-quill/dist/quill.snow.css";
import BackButton from "./BackButton";
import { EditText } from "react-edit-text";
import { GithubPicker } from "react-color";

const Card = (props) => {
  const [expand, setExpand] = useState(false); //expand: show the actual card and data | no expand: show the cardview
  const [display, setDisplay] = useState(false); //visible or not?

  useEffect(() => {
    //sets correct expand and display properties depending on the status of the app(what page the user is on)
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
  }, [props.active, props.id]); //dependencies(what has to change for this function to need to run)

  const modules = {
    //rich text editor tool configuration
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
    //expanded card code
    return (
      <div className="card-full-container">
        <div className="card-container">
          <EditText //editable title
            className="card-title"
            placeholder="title goes here..."
            onSave={(title) => {
              //saves new title
              props.setTitle(props.id, title.value);
            }}
            defaultValue={props.title}
          />

          <ReactQuill //the main text editor for the card
            className="card-editor"
            theme="snow"
            modules={modules}
            value={props.value}
            onChange={(value) => props.setValue(props.id, value)} //saves new value
          />

          <BackButton //yeah
            onClick={() => {
              props.handleCardviewClick(-1);
            }}
            visible={true}
          />
        </div>

        <textarea //key terms list
          className="card-term-list"
          rows="30"
          cols="5"
          placeholder="enter key terms here"
          onChange={(e) => props.setTermlistValue(props.id, e.target.value)} //saves new value
          value={props.termlistValue}
        />
      </div>
    );
  } else if (display) {
    //cardview code
    return (
      <Draggable //container to let the cards be moved
        handle="#handle" //reference to the black triangle that you have to drag
        onDrag={(e, data) => props.handleDrag(props.id, data)} //save new position
        axis="none"
        position={{
          //for initializing position
          x: props.pos["x"],
          y: props.pos["y"],
        }}
        bounds={"body"} //doesnt let you drag outside of screen
      >
        {/* main body of the cardview */}
        <div className="cardview-full-container">
          <div
            className="cardview-content"
            style={{
              backgroundColor: props.color, //color yay!
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                props.handleCardviewClick(props.id); //handles click functions(opening, deleting, line)
              }
            }}
          >
            <EditText //editable title
              key={props.title}
              className="cardview-text"
              placeholder="title goes here..."
              onSave={(title) => {
                //saves new value
                props.setTitle(props.id, title.value);
              }}
              defaultValue={props.title}
            />
            {/* bottom right black triangle for dragging */}
            <div className="triangle" id="handle" />
          </div>
          {props.changingCardviewColor === props.id && (
            <div
              style={{
                zIndex: 4,
              }}
            >
              {/* color picker */}
              <GithubPicker
                // color={color}
                colors={["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"]}
                width="137px"
                onChange={(color, e) => {
                  props.handleCardviewBackgroundChange(props.id, color, e); //save new color
                }}
              />
            </div>
          )}
        </div>
      </Draggable>
    );
  } else {
    return null;
  }
};

export default Card;
