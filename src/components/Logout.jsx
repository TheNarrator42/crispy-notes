import React from "react";
import { Button } from "react-bootstrap";
import { useGoogleLogout } from "react-google-login";
import { FaSignOutAlt } from "react-icons/fa";

import "../css/AuthButtons.css";

const clientId =
  "782862493589-96j62bmn3cs7o0mr61rva8oa4qsojvvk.apps.googleusercontent.com";

const Logout = (props) => {
  const onLogoutSuccess = (res) => {
    props.onLogoutSuccess();
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <div className="button-div">
      <Button variant="danger" size="sm" onClick={signOut}>
        <FaSignOutAlt size="1.5em" />
      </Button>
    </div>
  );
};

export default Logout;
