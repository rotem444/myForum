export const sendRequest = () => ({
  type: "SEND REQUEST",
  info: "set loading to true",
});

export const signUp = (name) => ({
  type: "SIGN UP",
  info: "set the user name",
  payload: name,
});

export const error = () => ({
  type: "ERROR",
  info: "set loading to false",
});

export const getForum = (forum) => ({
  type: "GET FORUM",
  info: "get forum",
  payload: forum,
});

export const logOut = () => ({
  type: "LOG OUT",
  info: "set 'name' to null",
});
