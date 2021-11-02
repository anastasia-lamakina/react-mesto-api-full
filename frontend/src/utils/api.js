import { API_BASE_PATH, API_KEY } from "./constants";

class Api {
  constructor({ basePath, apiKey }) {
    this._basePath = basePath;
    this._headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  putLikeClick(cardId) {
    return fetch(`${this._basePath}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponse);
  }

  deleteLikeClick(cardId) {
    return fetch(`${this._basePath}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }

  postNewCard({ name, link }) {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  getUserProfile() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  patchUserInformation({ name, about }) {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  apiKey: API_KEY,
  basePath: API_BASE_PATH,
});

export default api;
