import { API_BASE_PATH } from "./constants";

class AuthApi {
  constructor({ basePath }) {
    this._basePath = basePath;
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  signUp(data) {
    return fetch(`${this._basePath}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  signIn(data) {
    return fetch(`${this._basePath}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }
}

const authApi = new AuthApi({
  basePath: API_BASE_PATH,
});

export default authApi;
