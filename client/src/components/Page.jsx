import { React, useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import "../css/Page.css";
import BackButton from "./BackButton";
import Card from "./Card";

const Page = (props) => {
  const [active, setActive] = useState(-1);
  const [expand, setExpand] = useState(false);
  const [display, setDisplay] = useState(false);

  // useHotkeys("z", () => {
  //   console.log("props active: " + props.active);
  //   console.log("id: " + props.id);
  //   console.log("active: " + active);
  //   if (props.active === props.id && active === -1) {
  //     console.log(props.id + " z pressed!");
  //   }
  // });

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

  const handleUpdateActive = (id) => {
    setActive(id);
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
              value={card.value}
              titleValue={card.titleValue}
              termlistValue={card.termlistValue}
              setValue={(id, value) => props.setValue(props.id, id, value)}
              setTitleValue={(id, titleValue) =>
                props.setTitleValue(props.id, id, titleValue)
              }
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
