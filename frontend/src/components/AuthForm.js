import React, { useEffect, useRef, useState } from "react";
import { FormValidator } from "../utils/FormValidator";
import { authValidatorSettings } from "../utils/constants";
import AuthFormField from "./AuthFormField";
import { Link, useLocation } from "react-router-dom";

export const AuthForm = ({
  title,
  isLoading,
  submitButtonText,
  showSignInButton,
  onSubmit,
}) => {
  const location = useLocation();
  const [submitText, setSubmitText] = useState(submitButtonText);
  const loadingRef = useRef();
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading && !loadingRef.current) {
      let loadingCount = 1;
      loadingRef.current = setInterval(() => {
        setSubmitText(`Сохранение${".".repeat(loadingCount)}`);
        if (loadingCount > 3) {
          loadingCount = 1;
        } else {
          loadingCount += 1;
        }
      }, 250);
    } else if (!isLoading && loadingRef.current) {
      clearInterval(loadingRef.current);
      setSubmitText(submitButtonText);
      loadingRef.current = null;
    }
  }, [isLoading]);

  const handleSubmit = () => {
    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form
      ref={formRef}
      name={"auth-form"}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="auth__title">{title}</h2>
      <fieldset className="auth__fieldset">
        <AuthFormField
          inputRef={emailRef}
          placeholder={"Email"}
          name={"email"}
        />
        <AuthFormField
          inputRef={passwordRef}
          placeholder={"Пароль"}
          name={"password"}
          type={"password"}
        />
        <input className="auth__button" type="submit" value={submitText} />
        {showSignInButton && (
          <Link to={"/sign-in"} className="auth__form-link">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </fieldset>
    </form>
  );
};
