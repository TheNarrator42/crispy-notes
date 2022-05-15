import React from "react";
import { useGoogleLogin } from "react-google-login";

import { refreshTokenSetup } from "../utils/refreshToken";

import "../css/AuthButtons.css";
import { Button } from "react-bootstrap";

const clientId =
  "782862493589-96j62bmn3cs7o0mr61rva8oa4qsojvvk.apps.googleusercontent.com"; //link to the google oauth client for this app

const Login = (props) => {
  const onSuccess = (res) => {
    refreshTokenSetup(res); //token will expire after some time, this refreshes it
    props.onLoginSuccess(res.profileObj); //passes user profile to parent when login is successful(name, pfp, googleid, etc.)
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    //neat hook that manages most of the work for you, just have to pass your own functions
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    //the actual component button
    <Button variant="info" onClick={signIn}>
      Sign in
    </Button>
  );
};

export default Login;
