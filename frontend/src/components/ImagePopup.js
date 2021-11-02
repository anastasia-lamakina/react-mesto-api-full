import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ name, link, isOpen, onClose }) => (
  <Popup isOpen={isOpen} onClose={onClose}>
    <div className="popup__picture-container">
      <button className="popup__close" type="button" onClick={onClose}></button>
      <img className="popup__image" src={link} alt={name} />
      <p className="popup__subtitle">{name}</p>
    </div>
  </Popup>
);

export default ImagePopup;
