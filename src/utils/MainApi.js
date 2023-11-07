class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // проверка статуса ответа сервера

  _checkingStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error("Что-то пошло не так..."));
    }
  }

  // получить данные с сервера

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return this._checkingStatus(res);
      })
      .then((res) => {
        return res;
      });
  }

  getData(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkingStatus(res);
    });
  }

  // отправить данные на сервер

  sendData(name, email, token, methodType) {
    return fetch(`${this._url}/users/me`, {
      method: methodType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => {
      console.log(res);
      return this._checkingStatus(res);
    });
  }

  // поставить лайк и сохранить

  saveMovie(
    {
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    },
    image,
    thumbnail,
    token,
    owner
  ) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        nameRU,
        nameEN,
        owner,
      }),
    }).then((res) => {
      return this._checkingStatus(res);
    });
  }

  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkingStatus(res);
    });
  }
}

const configApiMain = {
  url: "https://api.km-og.nomoreparties.co",
};

const apiMain = new MainApi(configApiMain);

export { apiMain };
