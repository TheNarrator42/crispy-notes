import { React, useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import BackButton from "./BackButton";
import Card from "./Card";
import { EditText } from "react-edit-text";

import "../css/Page.css";
import "react-edit-text/dist/index.css";

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
  }, [props.active, expand, display, props.id]);

  useHotkeys(
    "z",
    () => {
      props.handleAddCard(props.id);
    },
    { enabled: props.active === props.id && active === -1 },
    [active, props.pages, props.active]
  );

  const handleUpdateActive = (id) => {
    setActive(id);
  };

  if (expand) {
    return (
      <div className="page-container">
        {active === -1 && (
          <EditText
            placeholder="title me!"
            defaultValue={props.title}
            onSave={(title) => {
              props.handleSetPageTitle(title.value, props.id);
            }}
          />
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
              setValue={(id, value) => props.setValue(props.id, id, value)}
              setTitle={(id, title) => props.setTitle(props.id, id, title)}
              setTermlistValue={(id, termlistValue) =>
                props.setTermlistValue(props.id, id, termlistValue)
              }
              handleDrag={(id, data) => props.handleDrag(props.id, id, data)}
              handleUpdateActive={(id) => handleUpdateActive(id)}
            />
          </div>
        ))}
        <BackButton
          onClick={() => {
            props.handleUpdateActive(-1);
          }}
          visible={active === -1}
        />
      </div>
    );
  } else if (display) {
    return (
      <div className="pageview-container">
        <div className="pageview-text">
          <EditText
            placeholder="title me!"
            defaultValue={props.title}
            onSave={(title) => {
              props.handleSetPageTitle(title.value, props.id);
            }}
          />
        </div>
        <div
          onClick={() => {
            props.handleUpdateActive(props.id);
          }}
          style={{ backgroundColor: "violet", width: "100%", height: "100%" }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Page;
