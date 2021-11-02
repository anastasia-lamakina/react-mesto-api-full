import React from "react";
import Popup from "./Popup";
import failLogo from "../images/fail-logo.svg";

const FailPopup = ({ isOpen, onClose }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close" type="button" />
        <div className="popup__message">
          <img className="popup__message-image" src={failLogo} />
          <p className="popup__message-text">
            Что-то пошло не так! Попробуйте ещё раз.
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default FailPopup;
