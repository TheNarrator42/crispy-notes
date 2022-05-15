import React from "react";
import { Button } from "react-bootstrap";
import { useGoogleLogout } from "react-google-login";
import { FaSignOutAlt } from "react-icons/fa";

import "../css/AuthButtons.css";

const clientId =
  "782862493589-96j62bmn3cs7o0mr61rva8oa4qsojvvk.apps.googleusercontent.com"; //link to the google oauth client for this app

const Logout = (props) => {
  const onLogoutSuccess = (res) => {
    props.onLogoutSuccess(); //function derived from parent for what to do on a logout
  };

  const onFailure = () => {
    console.log("Handle failure cases"); //lol
  };

  const { signOut } = useGoogleLogout({
    //hook that just does everything for you again
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    //the actual component button
    <div className="button-div">
      <Button variant="danger" size="sm" onClick={signOut}>
        <FaSignOutAlt size="1.5em" />
      </Button>
    </div>
  );
};

export default Logout;
