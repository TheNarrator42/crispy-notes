import { React, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Pagination from "react-bootstrap/Pagination";
import { FaMousePointer, FaPlus, FaTrashAlt } from "react-icons/fa";
import PageItem from "react-bootstrap/PageItem";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pages, setPages] = useState(props.pages);
  const [option, setOption] = useState(1);
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

  const toolbar = [
    <PageItem key={1} active={option === 1} onClick={() => setOption(1)}>
      {<FaMousePointer size={"1.5em"} />}
    </PageItem>,
    <PageItem key={2} active={option === 2} onClick={() => setOption(2)}>
      {<FaPlus size={"1.5em"} />}
    </PageItem>,
    <PageItem key={3} active={option === 3} onClick={() => setOption(3)}>
      {<FaTrashAlt size={"1.5em"} />}
    </PageItem>,
  ];

  useHotkeys("1", () => {
    setOption(1);
  });
  useHotkeys("2", () => {
    setOption(2);
  });
  useHotkeys("3", () => {
    setOption(3);
  });

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

  const onBackgroundClick = (e) => {
    if (option === 2 && e.target === e.currentTarget) {
      let list = [...pages];
      if (active === -1) {
        list.push({ id: pages.length, title: "", cards: [] });
      } else {
        list[active]["cards"].push({
          id: list[active]["cards"].length,
          title: "",
          color: "yellow",
          pos: {
            x: 0,
            y: 0,
          },
          value: "",
          termlistValue: "",
        });
      }
      setPages(list);
    }
  };

  return (
    <div className="full-container">
      <div className="book-container" onClick={onBackgroundClick}>
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
      <Pagination>{toolbar}</Pagination>
    </div>
  );
};

export default Book;
