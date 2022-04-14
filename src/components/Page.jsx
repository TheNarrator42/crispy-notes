import { React, useState, useEffect } from "react";

import BackButton from "./BackButton";
import Card from "./Card";
import { EditText } from "react-edit-text";

import "../css/Page.css";
import "react-edit-text/dist/index.css";
import { GithubPicker } from "react-color";

const Page = (props) => {
  const [active, setActive] = useState(-1);
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
  }, [props.active, expand, display, props.id, props.changingPageviewColor]);

  // useeffect props.option?

  const handleCardviewClick = (id) => {
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
    return (
      <div className="page-container">
        {active === -1 && (
          <div className="page-title">
            <EditText
              placeholder="title me!"
              defaultValue={props.title}
              onSave={(title) => {
                props.handleSetPageTitle(title.value, props.id);
              }}
            />
          </div>
        )}
        {props.cards.map((card) => (
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
        ))}
        <BackButton
          onClick={() => {
            props.handlePageviewClick(-1);
          }}
          visible={active === -1}
        />
      </div>
    );
  } else if (display) {
    return (
      <div className="pageview-full-container">
        <div className="pageview-container">
          <div className="pageview-text">
            <EditText
              key={props.title}
              placeholder="title me!"
              defaultValue={props.title}
              onSave={(title) => {
                props.handleSetPageTitle(title.value, props.id);
              }}
            />
          </div>
          <div
            className="pageview-body"
            onClick={() => {
              props.handlePageviewClick(props.id);
            }}
            style={{
              background: props.color,
            }}
          />
        </div>
        {props.changingPageviewColor === props.id && (
          <div
            style={{
              zIndex: 4,
              position: "absolute",
              top: Math.floor((props.id + 1) / 9) * 200 + 280 + "px",
            }}
          >
            <GithubPicker
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
