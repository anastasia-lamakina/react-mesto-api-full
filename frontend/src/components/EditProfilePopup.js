import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, isLoading, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && !isLoading) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [isOpen, isLoading, currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-form"
      closeButtonText="Сохранить"
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={() => onSubmit({ name, about })}
      validate
      onClose={onClose}
    >
      <PopupField
        name="profile-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={setName}
      />
      <PopupField
        name="profile-about"
        placeholder="Вид деятельности"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={setAbout}
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
