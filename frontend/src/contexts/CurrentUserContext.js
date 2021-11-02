import React from "react";

const CurrentUserContext = React.createContext({
  _id: null,
  name: null,
  about: null,
  avatar: null,
});

export default CurrentUserContext;
