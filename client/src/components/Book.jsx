import { React, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pages, setPages] = useState(props.pages);
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const onMouseMove = (e) => {
  //     setMousePos({
  //       x: e.clientX,
  //       y: e.clientY,
  //     });
  //   };
  //   window.addEventListener("mousemove", onMouseMove);
  // }, []);

  useHotkeys(
    "z",
    () => {
      let list = [...pages];
      list.push({ id: pages.length, title: "", cards: [] });
      setPages(list);
    },
    { enabled: active === -1 },
    [pages, active]
  );

  const handleSetPageTitle = (title, id) => {
    const list = [...pages];
    list[id]["title"] = title;
    setPages(list);
  };

  const handleUpdateActive = (id) => {
    setActive(id);
  };

  const handleAddCard = (pageid) => {
    let list = [...pages];
    list[pageid]["cards"].push({
      id: list[pageid]["cards"].length,
      title: "",
      color: "yellow",
      pos: {
        x: 0,
        y: 0,
      },
      value: "",
      termlistValue: "",
    });
    setPages(list);
  };

  const setValue = (pageid, cardid, value) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["value"] = value;
    setPages(list);
  };

  const setTitle = (pageid, cardid, title) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["title"] = title;
    setPages(list);
  };

  const setTermlistValue = (pageid, cardid, termlistValue) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["termlistValue"] = termlistValue;
    setPages(list);
  };

  const handleDrag = (pageid, cardid, data) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["pos"]["x"] = Number(data.x.toFixed(0));
    list[pageid]["cards"][cardid]["pos"]["y"] = Number(data.y.toFixed(0));
    setPages(list);
  };

  return (
    <div className="book-container">
      {props.title}
      {pages.map((page) => (
        <Page
          active={active}
          cards={page.cards}
          id={page.id}
          key={page.id}
          title={page.title}
          handleUpdateActive={handleUpdateActive}
          setValue={setValue}
          setTitle={setTitle}
          setTermlistValue={setTermlistValue}
          handleDrag={handleDrag}
          handleSetPageTitle={handleSetPageTitle}
          handleAddCard={handleAddCard}
        />
      ))}
    </div>
  );
};

export default Book;
