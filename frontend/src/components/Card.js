import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const LikeButton = ({ isLiked, onClick }) => (
  <button
    className={`destination-card__like-button ${
      isLiked && "destination-card__like-button_active"
    }`}
    type="button"
    onClick={onClick}
  />
);

const Card = ({
  name,
  link,
  likes,
  owner,
  _id: cardId,
  onLikeClick,
  onPictureClick,
  onDeleteClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = owner._id === currentUser._id;
  const isLikedByCurrentUser = likes.some(
    (like) => like._id === currentUser._id
  );

  const likesCount = likes.length;
  return (
    <li className="destination-card">
      {isOwner && (
        <button
          className="destination-card__delete-button"
          type="button"
          onClick={() => onDeleteClick({ cardId })}
        />
      )}
      <img
        className="destination-card__picture"
        src={link}
        alt={name}
        onClick={() => onPictureClick({ link, name })}
      />
      <div className="destination-card__text-zone">
        <h2 className="destination-card__text">{name}</h2>
        <div className="destination-card__like-wrapper">
          <LikeButton
            isLiked={isLikedByCurrentUser}
            onClick={() => onLikeClick(cardId, isLikedByCurrentUser)}
          />
          <div className="destination-card__like-count">{likesCount}</div>
        </div>
      </div>
    </li>
  );
};

export default Card;
