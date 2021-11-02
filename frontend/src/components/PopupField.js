import React from "react";

const PopupField = ({
  placeholder,
  name,
  minLength = undefined,
  maxLength = undefined,
  type = undefined,
  value,
  onChange = () => {},
  inputRef,
}) => (
  <label className="popup__field">
    <input
      ref={inputRef}
      className="popup__input"
      placeholder={placeholder}
      name={name}
      required
      minLength={minLength}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <span id={`${name}-error`} className="popup__span"></span>
  </label>
);

export default PopupField;
