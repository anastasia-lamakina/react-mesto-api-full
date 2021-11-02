import React from "react";

const AuthFormField = ({
  placeholder,
  name,
  minLength = undefined,
  maxLength = undefined,
  type = undefined,
  value,
  onChange = () => {},
  inputRef,
}) => (
  <label className="auth__field">
    <input
      ref={inputRef}
      className="auth__input"
      placeholder={placeholder}
      name={name}
      required
      minLength={minLength}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <span id={`${name}-error`} className="auth__span"></span>
  </label>
);

export default AuthFormField;
