import React, { useEffect, useRef } from "react";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, isLoading, onSubmit, onClose }) => {
  const avatarInputRef = useRef();

  useEffect(() => {
    if (isOpen && !isLoading) {
      avatarInputRef.current.value = "";
    }
  }, [isOpen, isLoading]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-avatar-form"
      closeButtonText="Сохранить"
      validate
      isOpen={Boolean(isOpen)}
      isLoading={isLoading}
      onSubmit={() => onSubmit(avatarInputRef?.current.value)}
      onClose={onClose}
    >
      <PopupField
        inputRef={avatarInputRef}
        name="profile-avatar"
        placeholder="Ссылка"
        type="url"
        minLength="2"
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
