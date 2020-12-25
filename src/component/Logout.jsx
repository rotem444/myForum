import React, { useContext } from "react";
import { AppContext } from "../App";
import { logOut } from "../store/actions";
import { Redirect } from "react-router-dom";

export default function Logout() {
  const { dispatch } = useContext(AppContext);
  dispatch(logOut());
  localStorage.removeItem("name");
  localStorage.removeItem("token");
  return <Redirect />;
}
