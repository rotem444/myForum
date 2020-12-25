import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import _ from "lodash";
import Forum from "./Forum";
import Discussion from "./Discussion";
import { AppContext } from "../../App";

export default function ForumRouter({ history, location: { pathname } }) {
  return (
    <>
      {pathname === "/Forum" && <Forum history={history} />}
      <Switch>
        <Route exact="*" component={Discussion} />
      </Switch>
    </>
  );
}
