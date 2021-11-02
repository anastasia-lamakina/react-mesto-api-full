import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({ isOpen, isLoading, onSubmit, onClose }) => (
  <PopupWithForm
    title="Вы уверены?"
    closeButtonText="Да"
    isOpen={isOpen}
    isLoading={isLoading}
    onSubmit={onSubmit}
    onClose={onClose}
  />
);

export default ConfirmPopup;
