import React, { useMemo, useContext } from "react";
import {AppContext} from "../../App"
import { useLocation } from "react-router-dom";
import { axios } from "axios";
import { Formik } from "formik";
import * as yup from "yup";

export default function Form({ index }) {
  const {dispatch} = useContext(AppContext)
  const [formikProp, Head] = useMemo(() => {
    let id = useLocation().pathname.split("/").pop();
    id = isNaN(id) ? null : +id;
    return [
      {
        initialValues: {
          title: "",
          body: "",
          ...(id ?? { id }),
        },
        validationSchema: yup.object({
          title: yup.string().required("required"),
          body: yup.string().required("required"),
          index: yup.number(),
        }),
        onSubmit: (p) => {
          console.log(p);
        },
      },
      () => <h3>Add {index?.constructor ? "Comment" : "Discussion"}:</h3>,
    ];
  });

  return (
    <div>
      <Head />
    </div>
  );
}
