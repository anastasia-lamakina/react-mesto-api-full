import React from "react";
import { AuthForm } from "./AuthForm";

export const Register = ({ onRegisterSubmit, isLoading }) => (
  <AuthForm
    isLoading={isLoading}
    title={"Регистрация"}
    submitButtonText={"Зарегистрироваться"}
    showSignInButton
    onSubmit={onRegisterSubmit}
  />
);
