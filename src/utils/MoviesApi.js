class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // проверка статуса ответа сервера

  _checkingStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(new Error("Что-то пошло не так..."));
    }
  }

  getData() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }
}

const configApiMovies = {
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiMovies = new MoviesApi(configApiMovies);

export { apiMovies };
