import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children: Component, ...props }) => {
  const loggedIn = Boolean(localStorage.getItem("jwt"));
  return (
    <Route to={props.path}>
      {loggedIn ? Component : <Redirect to={"/sign-in"} />}
    </Route>
  );
};
