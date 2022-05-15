import { React, useState, useEffect } from "react";

import BackButton from "./BackButton";
import Card from "./Card";
import { EditText } from "react-edit-text";

import "../css/Page.css";
import "react-edit-text/dist/index.css";
import { GithubPicker } from "react-color";

const Page = (props) => {
  const [active, setActive] = useState(-1); //id of the card in this page that is active or -1
  const [expand, setExpand] = useState(false); //expand: show the actual page and data | no expand: show the pageview
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
  }, [props.active, expand, display, props.id, props.changingPageviewColor]); //dependencies(what has to change for this function to need to run)

  const handleCardviewClick = (id) => {
    //do the right thing on click depending on the selected tool
    if (id === -1) {
      setActive(id);
      props.handleUpdatePageActive(id);
    } else {
      if (props.option === 2) {
        props.handleDeleteCard(props.id, id);
      } else if (props.option === 3) {
        props.handleLine(props.id, id);
      } else if (props.option === 4) {
        props.handleUpdateCardviewPicker(id);
      } else {
        setActive(id);
        props.handleUpdatePageActive(id);
      }
    }
  };

  if (expand) {
    //expanded page code
    return (
      <div className="page-container">
        {active === -1 && (
          <div className="page-title">
            <EditText //editable title
              placeholder="title me!"
              defaultValue={props.title}
              onSave={(title) => {
                props.handleSetPageTitle(title.value, props.id); //save new value
              }}
            />
          </div>
        )}
        {props.cards.map(
          (
            card //go through each card in the (stored in book) cards array and display it with the right data and make sure it is assigned the proper functions
          ) => (
            <div key={card.id} className="cardview-container">
              <Card
                key={card.id}
                active={active}
                id={card.id}
                title={card.title}
                color={card.color}
                pos={card.pos}
                value={card.value}
                termlistValue={card.termlistValue}
                changingCardviewColor={props.changingCardviewColor}
                setValue={(id, value) => props.setValue(props.id, id, value)}
                setTitle={(id, title) => props.setTitle(props.id, id, title)}
                setTermlistValue={(id, termlistValue) =>
                  props.setTermlistValue(props.id, id, termlistValue)
                }
                handleDrag={(id, data) => props.handleDrag(props.id, id, data)}
                handleCardviewClick={(id) => handleCardviewClick(id)}
                handleCardviewBackgroundChange={(id, color, e) => {
                  props.handleCardviewBackgroundChange(props.id, id, color, e);
                }}
              />
            </div>
          )
        )}
        <BackButton //yes
          onClick={() => {
            props.handlePageviewClick(-1);
          }}
          visible={active === -1}
        />
      </div>
    );
  } else if (display) {
    //pageview code
    return (
      <div className="pageview-full-container">
        <div className="pageview-container">
          <div className="pageview-text">
            <EditText //editable title
              key={props.title}
              placeholder="title me!"
              defaultValue={props.title}
              onSave={(title) => {
                props.handleSetPageTitle(title.value, props.id); //save new value
              }}
            />
          </div>
          <div
            className="pageview-body"
            onClick={() => {
              props.handlePageviewClick(props.id); //do stuff on click
            }}
            style={{
              background: props.color, //the main pageview color
            }}
          />
        </div>
        {props.changingPageviewColor === props.id && ( //adjust position a little bit when editing color or else it breaks
          <div
            style={{
              zIndex: 4,
              position: "absolute",
              top: Math.floor((props.id + 1) / 9) * 200 + 280 + "px",
            }}
          >
            <GithubPicker //color picker
              // color={color}
              colors={["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"]}
              width="137px"
              onChange={(color, e) => {
                props.handlePageviewBackgroundChange(props.id, color, e);
              }}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Page;
