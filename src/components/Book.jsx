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
import { Button, Image, ToastContainer } from "react-bootstrap";
import Logout from "./Logout";

const Book = (props) => {
  const [active, setActive] = useState(-1); //what page is active or -1
  const [pageActive, setPageActive] = useState(false); //whether or not the active page has a card active
  const [option, setOption] = useState(1); //selected toolbar option
  const [makingLine, setMakingLine] = useState([0, -1]); //first number is 0 or 1 for whether or not you are currently making a line, second number is the id of the first cardview clicked for the line
  const [changingBackground, setChangingBackground] = useState(false); //whether or not to show background color picker
  const [changingPageviewColor, setChangingPageviewColor] = useState(-1); //whether or not to show pageview color picker
  const [changingCardviewColor, setChangingCardviewColor] = useState(-1); //whether or not to show cardview color picker
  const [clickCoords, setClickCoords] = useState([0, 0]); //coordinates of most recent mouse click to display the background color picker
  const [pages, setPages] = useState([]); //main data! array of every page
  const [color, setColor] = useState("white"); //background color
  const [showToast, setShowToast] = useState(false); //whether or not to show the "data sent successfully" message
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

  const url =
    "https://33a3ec2d-1447-4805-bbf6-5450509be122-us-east1.apps.astra.datastax.com/api/rest/v2/keyspaces/note/stuff/" + //database url
    props.user.googleId;

  const getData = async (url) => {
    //function to get data
    await axios
      .get(url, {
        headers: {
          "x-cassandra-token":
            "AstraCS:moCPnxZzBdnHjNZYfbsfrRYU:0126f59ad3a8f9b56c1eb80ab3be003322e8ee58405dd5794713ea7c320b8c16", //definitely not a "temporary" hard coded access token nope nope nope
          accept: "application/json",
        },
      })
      .then((res) => {
        //display data once received
        if (res.data.data.length !== 0) {
          setColor(res.data.data[0].color);
          setPages(JSON.parse(res.data.data[0].pages));
        }
      });
  };

  const sendData = async () => {
    //function to send data
    await axios
      .put(
        url,
        {
          color: color,
          pages: JSON.stringify(pages),
        },
        {
          headers: {
            "x-cassandra-token":
              "AstraCS:moCPnxZzBdnHjNZYfbsfrRYU:0126f59ad3a8f9b56c1eb80ab3be003322e8ee58405dd5794713ea7c320b8c16", //listen this is a TEMPORARY solution
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setShowToast(true); //congrats it worked message
      });
  };

  useEffect(() => {
    //get data on app start
    getData(url);
  }, [url]);

  useEffect(() => {
    if (active === -1 || pageActive) {
      //cancel the line if you change layers
      setMakingLine([0, -1]);
    }
  }, [active, pageActive]);

  const toolbar = [
    //yeah its just the toolbar idk what else to say
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
      {<FaTrashAlt size="1.5em" />}
    </PageItem>,
    <PageItem
      key={3}
      active={option === 3}
      disabled={active === -1 || pageActive}
      onClick={() => {
        setOption(3);
        setChangingBackground(false);
        setChangingPageviewColor(-1);
        setChangingCardviewColor(-1);
      }}
    >
      {<FaSlash size="1.5em" />}
    </PageItem>,
    <PageItem
      key={4}
      active={option === 4}
      disabled={pageActive}
      onClick={() => {
        setOption(4);
        setMakingLine([0, -1]);
      }}
    >
      {<FaPaintBrush size="1.5em" />}
    </PageItem>,
  ];

  useHotkeys(
    //data debug hotkey
    "z",
    () => {
      console.log(pages);
    },
    {},
    [pages]
  );
  useHotkeys(
    //save hotkey
    "ctrl+alt+s",
    () => {
      sendData();
    },
    {},
    [color, pages]
  );

  useHotkeys("1", () => {
    //toolbar hotkeys
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
      setChangingBackground(false);
      setChangingPageviewColor(-1);
      setChangingCardviewColor(-1);
    },
    { enabled: !pageActive && active !== -1 },
    [pageActive, active]
  );
  useHotkeys(
    "4",
    () => {
      setOption(4);
      setMakingLine([0, -1]);
    },
    { enabled: !pageActive },
    [pageActive]
  );

  const handleUpdatePageActive = (value) => {
    //function to set pageactive to the correct value depending on child data
    if (value !== -1) {
      setOption(1);
    }
    setPageActive(value === -1 ? false : true);
  };

  const handleSetPageTitle = (title, id) => {
    //yeah basically does exactly that, given pageid
    let list = [...pages];
    list[id]["title"] = title;
    setPages(list);
  };

  const handleDeleteCard = (pageid, id) => {
    let list = [...pages];
    list[pageid].cards = list[pageid].cards.filter((card) => card.id !== id); //remove the card
    list[pageid].lines = list[pageid].lines.filter(
      //and its associated lines
      (line) => line[0] !== id && line[1] !== id
    );
    list[pageid].cards = list[pageid].cards.map((card) => ({
      //shift over the cards in the array as well as adjusts id
      id: card.id > id ? card.id - 1 : card.id,
      title: card.title,
      color: card.color,
      pos: card.pos,
      value: card.value,
      termlistValue: card.termlistValue,
    }));
    list[pageid].lines = list[pageid].lines.map((line) => {
      //and then do the same for the lines
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
      //open the page
      setActive(id);
    } else {
      if (option === 2) {
        //deleting
        let list = [...pages];
        list = list.filter((page) => page.id !== id); //delete the page
        list = list.map((page) => ({
          //shift over the pages in the array as well as adjusts id
          id: page.id > id ? page.id - 1 : page.id,
          title: page.title,
          color: page.color,
          cards: page.cards,
          lines: page.lines,
        }));
        setPages(list);
      } else if (option === 4) {
        //toggle pageview color editing
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
    //for making lines
    if (makingLine[0] === 0) {
      //first click
      setMakingLine([1, id]);
    } else if (makingLine[1] !== id) {
      //second click
      const list = [...pages];
      if (!duplicateLine(pageid, makingLine[1], id)) {
        list[pageid].lines.push([makingLine[1], id]); //add the new line
        setPages(list);
        setMakingLine([0, -1]);
      }
    }
  };

  const duplicateLine = (pageid, id1, id2) => {
    //does this line already exist
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
    //set card body value
    let list = [...pages];
    list[pageid]["cards"][cardid]["value"] = value;
    setPages(list);
  };

  const setTitle = (pageid, cardid, title) => {
    //set card title value
    let list = [...pages];
    list[pageid]["cards"][cardid]["title"] = title;
    setPages(list);
  };

  const setTermlistValue = (pageid, cardid, termlistValue) => {
    //set card termlist value
    let list = [...pages];
    list[pageid]["cards"][cardid]["termlistValue"] = termlistValue;
    setPages(list);
  };

  const handleDrag = (pageid, cardid, data) => {
    //set new position of cardview when dragging
    let list = [...pages];
    list[pageid]["cards"][cardid]["pos"]["x"] = Number(data.x.toFixed(0));
    list[pageid]["cards"][cardid]["pos"]["y"] = Number(data.y.toFixed(0));
    setPages(list);
  };

  const onBackgroundClick = (e) => {
    //toggle changing background color picker if the right option is selected
    if (
      (e.target.className === "book-container" ||
        e.target.className === "page-container" ||
        e.target.className.baseVal === "lines-container") &&
      option === 4
    ) {
      if (!changingBackground) {
        setClickCoords([e.clientX, e.clientY]);
      }
      setChangingBackground(!changingBackground);
    }
  };

  const handleAdd = () => {
    //for adding a new(and blank) page
    let list = [...pages];
    if (active === -1) {
      list.push({ id: pages.length, title: "", cards: [], lines: [] });
    } else {
      list[active]["cards"].push({
        id: list[active]["cards"].length,
        title: "",
        color: "ffffba",
        pos: {
          x: 0,
          y: 0,
        },
        value: "",
        termlistValue: "",
      });
    }
    setPages(list);
  };

  const handleLineClick = (id1, id2) => {
    //for deleting a line if the right option is selected
    if (option === 2) {
      const list = [...pages];
      list[active].lines = list[active].lines.filter(
        (line) => line[0] !== id1 || line[1] !== id2
      );
      setPages(list);
    }
  };

  const handleBackgroundChange = (color, e) => {
    //yeah
    setColor(color.hex);
  };

  const handlePageviewBackgroundChange = (id, color, e) => {
    //also yeah
    const list = [...pages];
    list[id]["color"] = color.hex;
    setPages(list);
  };

  const handleCardviewBackgroundChange = (pageid, cardid, color, e) => {
    //yet another yeah
    const list = [...pages];
    list[pageid].cards[cardid]["color"] = color.hex;
    setPages(list);
  };

  const handleUpdateCardviewPicker = (id) => {
    //toggle for color picker for cardview
    if (changingCardviewColor === -1) {
      setChangingCardviewColor(id);
    } else {
      setChangingCardviewColor(-1);
    }
  };

  return (
    //finally, displaying the actual book
    <div
      className="full-container"
      style={{
        background: color,
      }}
    >
      <div className="toolbar-container">
        {/* the toolbar */}
        <Pagination>{toolbar}</Pagination>
      </div>
      <div
        className="book-container"
        onClick={onBackgroundClick}
        style={{
          display: active === -1 ? "grid" : "flex", //grid display for pageviews, otherwise "regular" display
        }}
      >
        {/* lines container dont ask why its part of the book and not the pageview it just made it way easier */}
        {active !== -1 && !pageActive && (
          <svg className="lines-container" height="100vh" width="100vw">
            {pages[active].lines.map((line) => (
              <line
                key={[line[0], line[1]]}
                x1={pages[active].cards[line[0]].pos.x + 190} //adjust all coordinates so endpoints are centered on the cardview
                y1={pages[active].cards[line[0]].pos.y + 250}
                x2={pages[active].cards[line[1]].pos.x + 190}
                y2={pages[active].cards[line[1]].pos.y + 250}
                style={{ stroke: "#8fbbaf", strokeWidth: 3 }}
                onClick={() => {
                  handleLineClick(line[0], line[1]);
                }}
              />
            ))}
          </svg>
        )}
        {pages.map(
          (
            page //display all the damn pages with the right data and functions and stuff yknow
          ) => (
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
          )
        )}
      </div>
      {/* color picker for the book background */}
      {changingBackground && (
        <div
          style={{
            position: "absolute",
            //funky ternary operator inception to basically make sure that the background color picker wont go off the screen
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
          <GithubPicker //the actual picker now
            // color={color}
            colors={["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"]}
            width="137px"
            onChange={handleBackgroundChange}
          />
        </div>
      )}
      {/* container for the bottom right auto closing successfully saved message */}
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
      {/* exactly what the title says */}
      <div className="pfp-container">
        <Image
          src={props.user.imageUrl}
          referrerPolicy="no-referrer"
          roundedCircle
          fluid
        />
      </div>
      {/* add button for pages/cards */}
      {!pageActive && (
        <div className="add-button-container">
          <Button variant="light" size="sm" onClick={handleAdd}>
            <FaPlus size="1.5em" />
          </Button>
        </div>
      )}
      {/* logout button */}
      <Logout onLogoutSuccess={props.onLogoutSuccess} />
    </div>
  );
};

export default Book;
