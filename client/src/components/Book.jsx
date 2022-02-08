import { React, useState } from "react";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pages, setPages] = useState(props.pages);

  const handleUpdateActive = (id) => {
    setActive(id);
  };

  const setValue = (pageid, cardid, value) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["value"] = value;
    setPages(list);
  };

  const setTitleValue = (pageid, cardid, titleValue) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["titleValue"] = titleValue;
    setPages(list);
  };

  const setTermlistValue = (pageid, cardid, termlistValue) => {
    const list = [...pages];
    list[pageid]["cards"][cardid]["termlistValue"] = termlistValue;
    setPages(list);
  };

  const handleDrag = (pageid, cardid, data) => {
    console.log(pages);
    const list = [...pages];
    list[pageid]["cards"][cardid]["pos"]["x"] = data.x.toFixed(0);
    list[pageid]["cards"][cardid]["pos"]["y"] = data.y.toFixed(0);
    setPages(list);
    console.log(pages);
  };

  return (
    <div className="book-container">
      {props.title}
      {props.pages.map((page) => (
        <Page
          active={active}
          cards={page.cards}
          id={page.id}
          key={page.id}
          title={page.title}
          handleUpdateActive={handleUpdateActive}
          setValue={setValue}
          setTitleValue={setTitleValue}
          setTermlistValue={setTermlistValue}
          handleDrag={handleDrag}
        />
      ))}
    </div>
  );
};

export default Book;
