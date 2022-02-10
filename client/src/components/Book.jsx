import { React, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pages, setPages] = useState(props.pages);

  useHotkeys(
    "z",
    () => {
      let list = [...pages];
      list.push({ id: pages.length, title: "", cards: [] });
      setPages(list);
    },
    {},
    [pages]
  );

  const handleSetPageTitle = (title, id) => {
    const list = [...pages];
    list[id]["title"] = title;
    setPages(list);
  };

  const handleUpdateActive = (id) => {
    setActive(id);
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
        />
      ))}
    </div>
  );
};

export default Book;
