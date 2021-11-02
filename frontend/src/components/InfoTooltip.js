import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import successLogo from "../images/success-logo.svg";
import failLogo from "../images/fail-logo.svg";

const InfoTooltip = ({ isOpen, onClose, success }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close" type="button" />
        <div className="popup__message">
          {success ? (
            <>
              <img className="popup__message-image" src={successLogo} />
              <p className="popup__message-text">
                Вы успешно зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img className="popup__message-image" src={failLogo} />
              <p className="popup__message-text">
                Что-то пошло не так! Попробуйте ещё раз.
              </p>
            </>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
