export const Selectors = {
  destinationsList: ".destinations__list",
  profileName: ".profile__name",
  profileSubtitle: ".profile__subtitle",
  popupPicture: ".popup_picture",
  popupNew: ".popup_new",
  popupEdit: ".popup_edit",
  popupEditAvatar: ".popup_avatar",
  popupConfirm: ".popup_confirm",
  popupFieldset: ".popup__fieldset",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  popupInputError: "popup__input_error",
  popupSpanError: "popup__span_error",
  avatarSelector: ".profile__picture",
};

export const validatorSettings = {
  fieldsetSelector: Selectors.popupFieldset,
  inputSelector: Selectors.popupInput,
  submitButtonSelector: Selectors.popupButton,
  inputErrorClass: Selectors.popupInputError,
  spanErrorClass: Selectors.popupSpanError,
};

export const API_BASE_PATH = `https://mesto-lamakina.nomoredomains.work/api`;
