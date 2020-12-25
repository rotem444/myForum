import React, { useMemo, useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import { sendRequest, signUp, error } from "../store/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import _ from "lodash";
import { apiUrl } from "../config.json";

export default function Sign({ location: { pathname }, history }) {
  const { dispatch } = useContext(AppContext);
  const [formikProp, Head] = useMemo(() => {
    const page = pathname.slice(-2);
    const isSingUp = page === "up";

    return [
      {
        initialValues: {
          ...(isSingUp && { name: "" }),
          email: "",
          password: "",
        },
        validationSchema: yup.object({
          ...(isSingUp && {
            name: yup.string().required("required").label("Name"),
          }),
          email: yup.string().required("required").label("Email"),
          password: yup.string().required("required").label("Password"),
        }),
        onSubmit: (fields) => {
          dispatch(sendRequest());
          axios
            .post(`${apiUrl}/sign/${page}`, fields)
            .then(({ data: { name, token, massage } }) => {
              toast(massage);
              if (isSingUp) return history.push("/signin");
              console.log(token);
              localStorage.setItem("token", token);
              localStorage.setItem("name", name);
              dispatch(signUp(name));
              history.push("/Forum");
            })
            .catch(({ response }) => {
              toast.warning(response?.data ?? "Unexpected error");
              dispatch(error());
            });
        },
      },
      () => <h3>Sign-{page}</h3>,
    ];
  }, []);

  return (
    <div className="container">
      <Head />
      <Formik {...formikProp}>
        <Form>
          {_.keys(formikProp.initialValues).map((name) => (
            <div key={name}>
              <label htmlFor={name}>{_.upperFirst(name)}:</label>
              <br />
              <Field name={name} id={name} />
              <br />
              <ErrorMessage name={name} className="text-danger">
                {(err) => <div className="text-danger">{err}</div>}
              </ErrorMessage>
            </div>
          ))}
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
