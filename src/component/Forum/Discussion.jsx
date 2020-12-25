import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getForum } from "../../store/actions";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../App";
import { apiUrl } from "../../config.json";

export default function Discussion({ location: { pathname } }) {
  const [value, setValue] = useState();
  const { forum, dispatch } = useContext(AppContext) ?? {};
  if (!forum) return <Redirect to="/Forum" />;
  const discussion = forum[pathname.split("/").pop()];
  if (!discussion) return <Redirect to="/Forum" />;
  const { title, user, date, body, comments, _id } = discussion;
  return (
    <section className="container">
      {" "}
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <div>{body}</div>
      </main>
      <footer>
        <form action="" className="m-2">
          <label htmlFor="comment">
            <h3 className="mb-1">add comment:</h3>
          </label>
          <textarea
            className="form-control mb-3"
            name="comment"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              axios.defaults.headers.common[
                "x-auth-token"
              ] = localStorage.getItem("token");
              axios
                .post(`${apiUrl}/forum/comment`, {
                  body: value,
                  id: _id,
                })
                .then(({ data }) => {
                  dispatch(getForum(data));
                  setValue("");
                })
                .catch(({ data }) => toast.warn(data ?? "unexpected error"));
            }}
          >
            submit
          </button>
        </form>
        <ul>
          {comments.map(({ user, date, body, _id }) => (
            <li key={_id}>
              <h5>{user}</h5> <div>{body}</div>
              <div className="text-right">{date}</div>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
