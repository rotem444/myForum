import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import _ from "lodash";
import NavBar from "./component/Navbar";
import About from "./component/About";
import ForumRouter from "./component/Forum/_ForumRouter";
import Sign from "./component/Sing";
import Logout from "./component/Logout";
import { apiUrl } from "./config.json";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "./App.css";
import { reducer, initialState } from "./store/reducer";
import { getForum, error } from "./store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = React.createContext({});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then(({ data }) => dispatch(getForum(data)))
      .catch(() => dispatch(error()));
  }, []);
  const links = {
    "": About,
    Forum: ForumRouter,
    ...(state.name ? { Logout } : { signin: Sign, signup: Sign }),
  };
  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <NavBar links={_.keys(links)} />
      </header>
      <main>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <Switch>
            {_.map(links, (component, link) => (
              <Route
                key={link}
                path={"/" + link}
                exact={!link}
                component={component}
              />
            ))}
          </Switch>
        </AppContext.Provider>
      </main>
    </div>
  );
}

export { AppContext };

export default App;
