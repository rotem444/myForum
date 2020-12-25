import jwtDecode from "jwt-decode";

export const initialState = {
  loading: true,
  name: localStorage.getItem("name"),
  forum: null,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SEND REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET FORUM":
      return {
        ...state,
        loading: false,
        forum: payload,
      };
    case "SIGN UP":
      return {
        ...state,
        loading: false,
        name: payload,
      };
    case "LOG OUT":
      return {
        ...state,
        name: null
      }
    case "ERROR":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`type ${type} invalide`);
  }
};
