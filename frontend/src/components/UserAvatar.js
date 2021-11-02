import React, { useState } from "react";
import profileEditIcon from "../images/profile-edit-icon.svg";
import profilePicture from "../images/profile-picture.jpg";

const UserAvatar = ({ avatar }) => {
  const [isEditIconShown, setIsEditIconShown] = useState(false);

  return (
    <>
      {isEditIconShown && (
        <img
          className="profile__picture-edit-icon"
          src={profileEditIcon}
          alt="Редактировать профиль"
        />
      )}
      <img
        className="profile__picture"
        src={avatar || profilePicture}
        alt="Фотография профиля"
        onMouseEnter={() => {
          setIsEditIconShown(true);
        }}
        onMouseLeave={() => {
          setIsEditIconShown(false);
        }}
      />
    </>
  );
};

export default UserAvatar;
