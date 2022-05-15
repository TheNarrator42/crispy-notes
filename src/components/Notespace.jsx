import { React, useState } from "react";
import Book from "./Book";
import Login from "./Login";

import "../css/Notespace.css";

const Notespace = () => {
  const [user, setUser] = useState(null); //keep track of user that is logged in

  if (user === null) {
    return (
      <div className="loginPage">
        <div>
          <p>1: pointer: used to open pages/cards</p>
          <p>2: delete: click on a page/card with it selected to delete it</p>
          <p>
            3: line: click on a card then on another card while in a page to
            form a line between them
          </p>
          <p>4: color: change color of the background, a page, or a card</p>
          <p>ctrl+alt+s: save</p>
          <p>+ in bottom left to add a new page/card, logout in bottom right</p>
          <p>titles are editable, cards are draggable</p>
        </div>
        <Login onLoginSuccess={(u) => setUser(u)} />{" "}
        {/* login button to set current user */}
      </div>
    );
  } else {
    return <Book user={user} onLogoutSuccess={() => setUser(null)} />; //show the main app if you're actually logged in
  }
};

export default Notespace;
