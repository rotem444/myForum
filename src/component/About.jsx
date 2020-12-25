import React, { useContext } from "react";
import { AppContext } from "../App";

export default function About() {
  const { name } = useContext(AppContext);
  return (
    <section className="container">
      <h1>Hello {name}</h1>
      <div>
        welcom to my forum. in this side, after you sing up you can talk to
        other users
      </div>
    </section>
  );
}
