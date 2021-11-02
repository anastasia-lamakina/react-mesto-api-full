import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";

import Card from "./Card";

import UserAvatar from "./UserAvatar";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onPlaceDelete,
  onPlacePicture,
  onLikeClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__picture-container" onClick={onEditAvatar}>
            <UserAvatar avatar={currentUser.avatar} />
          </div>
          <div className="profile__text-container">
            <div className="profile__name-container">
              <h1 className="profile__name">
                {currentUser.name || "Жак-Ив Кусто"}
              </h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">
              {currentUser.about || "Исследователь океана"}
            </p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="destinations">
        <ul className="destinations__list">
          {cards.map((card) => (
            <Card
              {...card}
              key={card._id}
              onLikeClick={onLikeClick}
              onPictureClick={onPlacePicture}
              onDeleteClick={onPlaceDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
