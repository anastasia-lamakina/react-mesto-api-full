import React, { useEffect, useRef, useState } from "react";
import { FormValidator } from "../utils/FormValidator";
import Popup from "./Popup";
import { validatorSettings } from "../utils/constants";

const PopupWithForm = ({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  closeButtonText,
  isLoading,
  validate,
}) => {
  const [closeText, setCloseText] = useState(closeButtonText);
  const loadingRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (validate) {
      new FormValidator(validatorSettings, formRef.current).enableValidation();
    }
  }, []);

  useEffect(() => {
    if (isLoading && !loadingRef.current) {
      let loadingCount = 1;
      loadingRef.current = setInterval(() => {
        setCloseText(`Сохранение${".".repeat(loadingCount)}`);
        if (loadingCount > 3) {
          loadingCount = 1;
        } else {
          loadingCount += 1;
        }
      }, 250);
    } else if (!isLoading && loadingRef.current) {
      clearInterval(loadingRef.current);
      setCloseText(closeButtonText);
      loadingRef.current = null;
    }
  }, [isLoading]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form
        ref={formRef}
        className="popup__container"
        name={name}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <button className="popup__close" type="button" />
        <h2 className="popup__title">{title}</h2>
        <fieldset className="popup__fieldset">
          {children}
          <input className="popup__button" type="submit" value={closeText} />
        </fieldset>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
