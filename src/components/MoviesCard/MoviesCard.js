import { useState } from "react";
function MoviesCard({ film, onMovieLike, onMovieDislike }) {
  // function MoviesCard({ film, isSaved, onMovieLike, onMovieDislike }) {
  const [isSaved, setIsSaved] = useState(false);
  function handleLikeClick() {
    onMovieLike(film);
    setIsSaved(true);
  }

  function handleDislikeClick() {
    onMovieDislike(film);
    setIsSaved(false);
  }

  return (
    <li className="films__card">
      <a href={film.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={`https://api.nomoreparties.co${film.image.url}`}
          alt={film.nameRU}
          className="films__preview cursor"
        />
      </a>
      {isSaved ? (
        <button
          className="films__icon-save cursor"
          onClick={handleDislikeClick}
        ></button>
      ) : (
        <button
          type="button"
          aria-label="Сохранить"
          className="films__btn-save cursor"
          onClick={handleLikeClick}
        >
          Сохранить
        </button>
      )}

      <div className="films__text">
        <p className="films__name">{film.nameRU}</p>
        <p className="films__duration">{`${Math.floor(film.duration / 60)} ч ${
          film.duration % 60
        } м`}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
