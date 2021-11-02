export class FormValidator {
  constructor(configuration, formElement) {
    this._formElement = formElement;
    this._fieldsetSelector = configuration.fieldsetSelector;
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inputErrorClass = configuration.inputErrorClass;
    this._spanErrorClass = configuration.spanErrorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._formElement.addEventListener("reset", () => {
      inputList.forEach((inputElement) => this._hideInputError(inputElement));

      buttonElement.disabled = true;
    });
  };

  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClass);
    errorElement.textContent = "";
  };
}
