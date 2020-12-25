import React from "react";
import _ from "lodash";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ links }) {
  const [left, rigth] = _.chunk(links, 2);

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm d-flex justify-content-between">
      <Side links={left} />
      <Side links={rigth} />
    </nav>
  );
}

function Side({ links }) {
  return (
    <div className={`d-inline-flex p-2`}>
      {links.map((link) => (
        <NavLink key={link} className="nav-link" to={"/" + link}>
          {_.upperFirst(link || "about")}
        </NavLink>
      ))}
    </div>
  );
}
