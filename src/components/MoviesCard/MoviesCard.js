import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MoviesCard({
  isRouteSavedMovies,
  isSavedMovies,
  film,
  onMovieLike,
  onMovieDislike,
}) {
  const [isSaved, setIsSaved] = useState(false);

  function handleLikeClick() {
    onMovieLike(film);
    setIsSaved(true);
  }

  function handleDislikeClick() {
    const filmFromApi = Object.values(isSavedMovies).find(
      (el) => el.nameRU === film.nameRU
    );
    onMovieDislike(filmFromApi);
    setIsSaved(false);
  }

  useEffect(() => {
    function takeLikes() {
      Object.values(isSavedMovies).find((fil) => fil.nameRU === film.nameRU)
        ? setIsSaved(true)
        : setIsSaved(false);
    }
    takeLikes();
  }, [isSavedMovies]);

  return (
    <li className="films__card">
      <a href={film.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={
            film.owner
              ? `${film.image}`
              : `https://api.nomoreparties.co${film.image.url}`
          }
          alt={film.nameRU}
          className="films__preview cursor"
        />
      </a>
      {isSaved ? (
        <button
          type="button"
          aria-label="Удалить"
          className={
            isRouteSavedMovies
              ? "films__icon-delete cursor"
              : "films__icon-save cursor"
          }
          // className="films__icon-save cursor"
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
