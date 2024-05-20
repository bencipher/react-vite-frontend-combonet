import React from "react";
import { useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const state = params.get("state");

  return (
    <>
      <h1>CALL BACK URL</h1>
      <p>Code: {code}</p>
      <p>State: {state}</p>
    </>
  );
};

export default Callback;
