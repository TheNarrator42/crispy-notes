import { React, useState } from "react";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);

  const handleUpdateActive = (id) => {
    setActive(id);
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
          handleUpdateActive={(id) => handleUpdateActive(id)}
        />
      ))}
    </div>
  );
};

export default Book;
