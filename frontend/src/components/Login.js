import React from "react";
import { AuthForm } from "./AuthForm";

export const Login = ({ onSignInSubmit, isLoading }) => (
  <AuthForm
    isLoading={isLoading}
    onSubmit={onSignInSubmit}
    title={"Вход"}
    submitButtonText={"Войти"}
  />
);
