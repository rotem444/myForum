import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { getForum, sendRequest } from "../../store/actions";
import { apiUrl } from "../../config.json";

import { AppContext } from "../../App";

export default function Forum({ history }) {
  const [title, setTitel] = useState("");
  const [body, setBody] = useState("");
  const { forum, name, dispatch } = useContext(AppContext);
  return (
    <div className="container">
      <h1 className="text-center">Forum</h1>
      <table className="container" style={{ border: "1px solid black" }}>
        <thead style={{ border: "1px solid black" }}>
          <tr>
            <th style={{ width: "10%" }}>User</th>
            <th style={{ width: "70%" }}>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {forum?.length ? (
            forum.map(({ user, title, date, _id }, index) => (
              <tr
                key={_id}
                className={`bg-${
                  index % 2 ? "primary" : "secondary"
                } text-white`}
                onClick={() => history.push(`/Forum/${index}`)}
              >
                <td>{user}</td>
                <td>{title}</td>
                <td>{date}</td>
              </tr>
            ))
          ) : (
            <h4>No Post In The Forum</h4>
          )}
        </tbody>
      </table>
      {name && (
        <form action="">
          <h3>Add Discussion:</h3>
          <label htmlFor="titel">Titel:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="titel"
            id="titel"
            value={title}
            onChange={({ target: { value } }) => setTitel(value)}
          />
          <br />
          <label htmlFor="body">body:</label>
          <br />
          <textarea
            className="form-control"
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={body}
            onChange={({ target: { value } }) => setBody(value)}
          ></textarea>
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={() => {
              if (!title || !body) {
                return toast.warn(`you can't send empty title or body`);
              }
              axios.defaults.headers.common[
                "x-auth-token"
              ] = localStorage.getItem("token");
              dispatch(sendRequest());
              axios
                .post(`${apiUrl}/forum/discussion`, { title, body })
                .then(({ data }) => {
                  dispatch(getForum(data));
                  setTitel("");
                  setBody("");
                })
                .catch(({ data }) => {
                  console.log(data);
                  toast.warn(data);
                });
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
