import { React, useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Pagination from "react-bootstrap/Pagination";
import { GithubPicker } from "react-color";
import {
  FaMousePointer,
  FaPaintBrush,
  FaPlus,
  FaSlash,
  FaTrashAlt,
} from "react-icons/fa";
import PageItem from "react-bootstrap/PageItem";
import Toast from "react-bootstrap/Toast";
import axios from "axios";

import "../css/Book.css";
import Page from "./Page";
import { ToastContainer } from "react-bootstrap";

const Book = (props) => {
  const [active, setActive] = useState(-1);
  const [pageActive, setPageActive] = useState(false);
  const [option, setOption] = useState(1);
  const [makingLine, setMakingLine] = useState([0, -1]);
  const [changingBackground, setChangingBackground] = useState(false);
  const [changingPageviewColor, setChangingPageviewColor] = useState(-1);
  const [changingCardviewColor, setChangingCardviewColor] = useState(-1);
  const [clickCoords, setClickCoords] = useState([0, 0]);
  const [pages, setPages] = useState([]);
  const [color, setColor] = useState("white");
  const [showToast, setShowToast] = useState(false);
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

  const getData = async () => {
    await axios
      .get(
        "https://33a3ec2d-1447-4805-bbf6-5450509be122-us-east1.apps.astra.datastax.com/api/rest/v2/keyspaces/note/stuff/0",
        {
          headers: {
            "x-cassandra-token":
              "AstraCS:moCPnxZzBdnHjNZYfbsfrRYU:0126f59ad3a8f9b56c1eb80ab3be003322e8ee58405dd5794713ea7c320b8c16",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        setColor(res.data.data[0].color);
        setPages(JSON.parse(res.data.data[0].pages));
      });
  };

  const sendData = async () => {
    await axios
      .put(
        "https://33a3ec2d-1447-4805-bbf6-5450509be122-us-east1.apps.astra.datastax.com/api/rest/v2/keyspaces/note/stuff/0",
        {
          color: color,
          pages: JSON.stringify(pages),
        },
        {
          headers: {
            "x-cassandra-token":
              "AstraCS:moCPnxZzBdnHjNZYfbsfrRYU:0126f59ad3a8f9b56c1eb80ab3be003322e8ee58405dd5794713ea7c320b8c16",
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setShowToast(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (active === -1 || pageActive) {
      setMakingLine([0, -1]);
    }
  }, [active, pageActive]);

  const toolbar = [
    <PageItem
      key={1}
      active={option === 1}
      onClick={() => {
        setOption(1);
        setMakingLine([0, -1]);
        setChangingBackground(false);
        setChangingPageviewColor(-1);
        setChangingCardviewColor(-1);
      }}
    >
      {<FaMousePointer size="1.5em" />}
    </PageItem>,
    <PageItem
      key={2}
      active={option === 2}
      disabled={pageActive}
      onClick={() => {
        setOption(2);
        setMakingLine([0, -1]);
        setChangingBackground(false);
        setChangingPageviewColor(-1);
        setChangingCardviewColor(-1);
      }}
    >
      {<FaPlus size="1.5em" />}
    </PageItem>,
    <PageItem
      key={3}
      active={option === 3}
      disabled={pageActive}
      onClick={() => {
        setOption(3);
        setMakingLine([0, -1]);
        setChangingBackground(false);
        setChangingPageviewColor(-1);
        setChangingCardviewColor(-1);
      }}
    >
      {<FaTrashAlt size="1.5em" />}
    </PageItem>,
    <PageItem
      key={4}
      active={option === 4}
      disabled={active === -1 || pageActive}
      onClick={() => {
        setOption(4);
        setChangingBackground(false);
        setChangingPageviewColor(-1);
        setChangingCardviewColor(-1);
      }}
    >
      {<FaSlash size="1.5em" />}
    </PageItem>,
    <PageItem
      key={5}
      active={option === 5}
      disabled={pageActive}
      onClick={() => {
        setOption(5);
        setMakingLine([0, -1]);
      }}
    >
      {<FaPaintBrush size="1.5em" />}
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
      console.log(changingCardviewColor);
    },
    {},
    [changingCardviewColor]
  );
  useHotkeys(
    "ctrl+alt+s",
    () => {
      sendData();
    },
    {},
    [color, pages]
  );

  useHotkeys("1", () => {
    setOption(1);
    setMakingLine([0, -1]);
    setChangingBackground(false);
    setChangingPageviewColor(-1);
    setChangingCardviewColor(-1);
  });
  useHotkeys(
    "2",
    () => {
      setOption(2);
      setMakingLine([0, -1]);
      setChangingBackground(false);
      setChangingPageviewColor(-1);
      setChangingCardviewColor(-1);
    },
    { enabled: !pageActive },
    [pageActive]
  );
  useHotkeys(
    "3",
    () => {
      setOption(3);
      setMakingLine([0, -1]);
      setChangingBackground(false);
      setChangingPageviewColor(-1);
      setChangingCardviewColor(-1);
    },
    { enabled: !pageActive },
    [pageActive]
  );
  useHotkeys(
    "4",
    () => {
      setOption(4);
      setChangingBackground(false);
      setChangingPageviewColor(-1);
      setChangingCardviewColor(-1);
    },
    { enabled: !pageActive && active !== -1 },
    [pageActive, active]
  );
  useHotkeys(
    "5",
    () => {
      setOption(5);
      setMakingLine([0, -1]);
    },
    { enabled: !pageActive },
    [pageActive]
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
          color: page.color,
          cards: page.cards,
        }));
        setPages(list);
      } else if (option === 5) {
        if (changingPageviewColor === -1) {
          setChangingPageviewColor(id);
        } else {
          setChangingPageviewColor(-1);
        }
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
      e.target.className === "book-container" ||
      e.target.className === "page-container" ||
      e.target.className.baseVal === "lines-container"
    ) {
      if (option === 2) {
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
      } else if (option === 5) {
        if (!changingBackground) {
          setClickCoords([e.clientX, e.clientY]);
        }
        setChangingBackground(!changingBackground);
      }
    }
  };

  const handleLineClick = (id1, id2) => {
    if (option === 3) {
      const list = [...pages];
      list[active].lines = list[active].lines.filter(
        (line) => line[0] !== id1 || line[1] !== id2
      );
      setPages(list);
    }
  };

  const handleBackgroundChange = (color, e) => {
    setColor(color.hex);
  };

  const handlePageviewBackgroundChange = (id, color, e) => {
    const list = [...pages];
    list[id]["color"] = color.hex;
    setPages(list);
  };

  const handleCardviewBackgroundChange = (pageid, cardid, color, e) => {
    const list = [...pages];
    list[pageid].cards[cardid]["color"] = color.hex;
    setPages(list);
  };

  const handleUpdateCardviewPicker = (id) => {
    if (changingCardviewColor === -1) {
      setChangingCardviewColor(id);
    } else {
      setChangingCardviewColor(-1);
    }
  };

  return (
    <div
      className="full-container"
      style={{
        background: color,
      }}
    >
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
                style={{ stroke: "red", strokeWidth: 3 }}
                onClick={() => {
                  handleLineClick(line[0], line[1]);
                }}
              />
            ))}
          </svg>
        )}
        {pages.map((page) => (
          <Page
            active={active}
            color={page.color}
            cards={page.cards}
            id={page.id}
            key={page.id}
            title={page.title}
            changingPageviewColor={changingPageviewColor}
            changingCardviewColor={changingCardviewColor}
            handlePageviewClick={handlePageviewClick}
            handleLine={handleLine}
            setValue={setValue}
            setTitle={setTitle}
            setTermlistValue={setTermlistValue}
            handleDrag={handleDrag}
            handleSetPageTitle={handleSetPageTitle}
            handleDeleteCard={handleDeleteCard}
            handleUpdatePageActive={handleUpdatePageActive}
            handlePageviewBackgroundChange={handlePageviewBackgroundChange}
            handleCardviewBackgroundChange={handleCardviewBackgroundChange}
            handleUpdateCardviewPicker={handleUpdateCardviewPicker}
            option={option}
          />
        ))}
      </div>
      {changingBackground && (
        <div
          style={{
            position: "absolute",
            left:
              clickCoords[0] - 15 > 0
                ? clickCoords[0] - 15 < window.innerWidth - 137
                  ? clickCoords[0] - 15
                  : window.innerWidth - 137
                : 0,
            top:
              clickCoords[1] + 30 < window.innerHeight - 57
                ? clickCoords[1] + 30
                : window.innerHeight - 57,
            zIndex: 4,
          }}
        >
          <GithubPicker
            // color={color}
            colors={["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"]}
            width="137px"
            onChange={handleBackgroundChange}
          />
        </div>
      )}
      <Pagination>{toolbar}</Pagination>
      <ToastContainer className="toast-container" position="bottom-end">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong>Success!</strong>
          </Toast.Header>
          <Toast.Body>Saved successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Book;
