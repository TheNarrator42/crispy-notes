import { React, useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Pagination from "react-bootstrap/Pagination";
import { FaMousePointer, FaPlus, FaSlash, FaTrashAlt } from "react-icons/fa";
import PageItem from "react-bootstrap/PageItem";

import "../css/Book.css";
import Page from "./Page";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pageActive, setPageActive] = useState(false);
  const [pages, setPages] = useState(props.pages);
  const [option, setOption] = useState(1);
  const [makingLine, setMakingLine] = useState([0, -1]);
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

  useEffect(() => {
    if (active === -1 || pageActive) {
      setMakingLine([0, -1]);
    }
  }, [active, pageActive]);

  const toolbar = [
    <PageItem key={1} active={option === 1} onClick={() => setOption(1)}>
      {<FaMousePointer size="1.5em" />}
    </PageItem>,
    <PageItem
      key={2}
      active={option === 2}
      disabled={pageActive}
      onClick={() => setOption(2)}
    >
      {<FaPlus size="1.5em" />}
    </PageItem>,
    <PageItem
      key={3}
      active={option === 3}
      disabled={pageActive}
      onClick={() => setOption(3)}
    >
      {<FaTrashAlt size="1.5em" />}
    </PageItem>,
    <PageItem
      key={4}
      active={option === 4}
      disabled={active === -1 || pageActive}
      onClick={() => setOption(4)}
    >
      {<FaSlash size="1.5em" />}
    </PageItem>,
  ];

  useHotkeys(
    "z",
    () => {
      console.log(pages);
    },
    {},
    [pages]
  );

  useHotkeys(
    "x",
    () => {
      console.log(makingLine);
    },
    {},
    [makingLine]
  );

  useHotkeys("1", () => {
    setOption(1);
  });
  useHotkeys(
    "2",
    () => {
      if (!pageActive) {
        setOption(2);
      }
    },
    {},
    [pageActive]
  );
  useHotkeys(
    "3",
    () => {
      if (!pageActive) {
        setOption(3);
      }
    },
    {},
    [pageActive]
  );
  useHotkeys(
    "4",
    () => {
      if (!pageActive && active !== -1) {
        setOption(4);
      }
    },
    {},
    [pageActive, active]
  );

  const handleUpdatePageActive = (value) => {
    if (value !== -1) {
      setOption(1);
    }
    setPageActive(value === -1 ? false : true);
  };

  const handleSetPageTitle = (title, id) => {
    let list = [...pages];
    list[id]["title"] = title;
    setPages(list);
  };

  const handleDeleteCard = (pageid, id) => {
    let list = [...pages];
    list[pageid].cards = list[pageid].cards.filter((card) => card.id !== id);
    list[pageid].lines = list[pageid].lines.filter(
      (line) => line[0] !== id && line[1] !== id
    );
    list[pageid].cards = list[pageid].cards.map((card) => ({
      id: card.id > id ? card.id - 1 : card.id,
      title: card.title,
      color: card.color,
      pos: card.pos,
      value: card.value,
      termlistValue: card.termlistValue,
    }));
    list[pageid].lines = list[pageid].lines.map((line) => {
      let newLine = [];
      if (line[0] > id) {
        newLine.push(line[0] - 1);
      } else {
        newLine.push(line[0]);
      }
      if (line[1] > id) {
        newLine.push(line[1] - 1);
      } else {
        newLine.push(line[1]);
      }
      return newLine;
    });
    setPages(list);
  };

  const handlePageviewClick = (id) => {
    if (id === -1) {
      setActive(id);
    } else {
      if (option === 3) {
        let list = [...pages];
        list = list.filter((page) => page.id !== id);
        list = list.map((page) => ({
          id: page.id > id ? page.id - 1 : page.id,
          title: page.title,
          cards: page.cards,
        }));
        setPages(list);
      } else {
        setActive(id);
      }
    }
  };

  const handleLine = (pageid, id) => {
    if (makingLine[0] === 0) {
      setMakingLine([1, id]);
    } else if (makingLine[1] !== id) {
      const list = [...pages];
      if (!duplicateLine(pageid, makingLine[1], id)) {
        list[pageid].lines.push([makingLine[1], id]);
        setPages(list);
        setMakingLine([0, -1]);
      }
    }
  };

  const duplicateLine = (pageid, id1, id2) => {
    let list = pages[pageid].lines;
    for (let x = 0; x < list.length; x++) {
      let line = list[x];
      if (
        (line[0] === id1 && line[1] === id2) ||
        (line[1] === id1 && line[0] === id2)
      ) {
        return true;
      }
    }
    return false;
  };

  const setValue = (pageid, cardid, value) => {
    let list = [...pages];
    list[pageid]["cards"][cardid]["value"] = value;
    setPages(list);
  };

  const setTitle = (pageid, cardid, title) => {
    let list = [...pages];
    list[pageid]["cards"][cardid]["title"] = title;
    setPages(list);
  };

  const setTermlistValue = (pageid, cardid, termlistValue) => {
    let list = [...pages];
    list[pageid]["cards"][cardid]["termlistValue"] = termlistValue;
    setPages(list);
  };

  const handleDrag = (pageid, cardid, data) => {
    let list = [...pages];
    list[pageid]["cards"][cardid]["pos"]["x"] = Number(data.x.toFixed(0));
    list[pageid]["cards"][cardid]["pos"]["y"] = Number(data.y.toFixed(0));
    setPages(list);
  };

  const onBackgroundClick = (e) => {
    if (
      option === 2 &&
      (e.target.className === "book-container" ||
        e.target.className === "page-container")
    ) {
      let list = [...pages];
      if (active === -1) {
        list.push({ id: pages.length, title: "", cards: [], lines: [] });
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
        {active !== -1 && !pageActive && (
          <svg className="lines-container" height="100vh" width="100vw">
            {pages[active].lines.map((line) => (
              <line
                key={[line[0], line[1]]}
                x1={pages[active].cards[line[0]].pos.x + 186}
                y1={pages[active].cards[line[0]].pos.y + 160}
                x2={pages[active].cards[line[1]].pos.x + 186}
                y2={pages[active].cards[line[1]].pos.y + 160}
                style={{ stroke: "red", strokeWidth: 2 }}
              />
            ))}
          </svg>
        )}
        {pages.map((page) => (
          <Page
            active={active}
            cards={page.cards}
            id={page.id}
            key={page.id}
            title={page.title}
            handlePageviewClick={handlePageviewClick}
            handleLine={handleLine}
            setValue={setValue}
            setTitle={setTitle}
            setTermlistValue={setTermlistValue}
            handleDrag={handleDrag}
            handleSetPageTitle={handleSetPageTitle}
            handleDeleteCard={handleDeleteCard}
            handleUpdatePageActive={handleUpdatePageActive}
            option={option}
          />
        ))}
      </div>
      <Pagination>{toolbar}</Pagination>
    </div>
  );
};

export default Book;
