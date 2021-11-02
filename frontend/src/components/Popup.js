import React, { useEffect } from "react";

const Popup = ({ children, isOpen, onClose }) => {
  const handleFormClick = (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (event) => event.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen]);

  return (
    <div
      className={`popup ${isOpen && "popup_opened"}`}
      onClick={handleFormClick}
    >
      {children}
    </div>
  );
};

export default Popup;
