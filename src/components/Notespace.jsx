import { React, useState } from "react";
import Book from "./Book";
import Login from "./Login";

import "../css/Notespace.css";

const Notespace = () => {
  const [user, setUser] = useState(null);

  if (user === null) {
    return (
      <div className="loginPage">
        <Login onLoginSuccess={(u) => setUser(u)} />
      </div>
    );
  } else {
    return <Book user={user} onLogoutSuccess={() => setUser(null)} />;
  }
};

export default Notespace;
