import React from "react";
import { useGoogleLogin } from "react-google-login";

import { refreshTokenSetup } from "../utils/refreshToken";

import "../css/AuthButtons.css";
import { Button } from "react-bootstrap";

const clientId =
  "782862493589-96j62bmn3cs7o0mr61rva8oa4qsojvvk.apps.googleusercontent.com";

const Login = (props) => {
  const onSuccess = (res) => {
    refreshTokenSetup(res);
    props.onLoginSuccess(res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button variant="info" onClick={signIn}>
      Sign in
    </Button>
  );
};

export default Login;
