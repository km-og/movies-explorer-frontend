class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // проверка статуса ответа сервера

  _checkingStatus(response) {
    if (response.ok) {
      console.log(response);

      return response.json();
    } else {
      return Promise.reject(new Error("Что-то пошло не так..."));
    }
  }

  // получить данные с сервера

  getData() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }

  // поставить лайк и сохранить

  saveMovie(id) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }
}

const configApiMain = {
  url: "https://api.km-og.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiMain = new MainApi(configApiMain);

export { apiMain };
