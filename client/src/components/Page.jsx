import { React, useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import "../css/Page.css";
import BackButton from "./BackButton";
import Card from "./Card";

const Page = (props) => {
  const [active, setActive] = useState(-1);
  const [cards, setCards] = useState(props.cards); //object of objects
  const [expand, setExpand] = useState(false);
  const [display, setDisplay] = useState(false);

  useHotkeys("z", () => {
    console.log("props active: " + props.active);
    console.log("id: " + props.id);
    console.log("active: " + active);
    if (props.active === props.id && active === -1) {
      console.log(props.id + " z pressed!");
    }
  });

  const handleUpdateActive = (id) => {
    setActive(id);
  };

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

  const handleDrag = (id, data) => {
    let list = { ...cards };
    list[id]["pos"]["x"] = data.x.toFixed(0);
    list[id]["pos"]["y"] = data.y.toFixed(0);
    setCards(list);
  };

  const handleUpdatePage = (id, value, titleValue, termlistValue) => {
    let list = { ...cards };
    list[id]["value"] = value;
    list[id]["titleValue"] = titleValue;
    list[id]["termlistValue"] = termlistValue;
    setCards(list);
  };

  if (expand) {
    return (
      <div className="page-container">
        {active === -1 && props.title}
        {props.cards.map((card) => (
          <div key={card.id} className="page-cards-container">
            <Card
              active={active}
              id={card.id}
              title={card.title}
              color={card.color}
              pos={card.pos}
              handleDrag={(id, data) => handleDrag(id, data)}
              handleUpdateActive={(id) => handleUpdateActive(id)}
              handleUpdatePage={(id, value, titleValue, termlistValue) =>
                handleUpdatePage(id, value, titleValue, termlistValue)
              }
              value={card.value}
              titleValue={card.titleValue}
              termlistValue={card.termlistValue}
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
      <div
        className="pageview-container"
        onClick={() => {
          props.handleUpdateActive(props.id);
        }}
      >
        <div className="pageview-text">{props.title}</div>
        <div
          style={{ backgroundColor: "violet", width: "100%", height: "100%" }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Page;
