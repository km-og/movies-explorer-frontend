/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  films,
  isLoading,
  isErr,
  onMovieLike,
  onMovieDislike,
  // isSaved,
}) {
  const totalCards = films.length;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(12);
  let arrFilms = films.slice(0, cardsToShow);

  useEffect(() => {
    if (windowWidth >= 1025) {
      setCardsToShow(12);
      return;
    } else if (windowWidth >= 768) {
      setCardsToShow(8);
      return;
    } else {
      setCardsToShow(5);
    }
  }, [windowWidth]);

  function handleClick() {
    if (windowWidth >= 1025) {
      setCardsToShow(cardsToShow + 3);
      return;
    } else {
      setCardsToShow(cardsToShow + 2);
    }
  }

  return (
    <section className="films">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isErr ? (
            <p className="films__not-found">
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз
            </p>
          ) : (
            <>
              {films.length === 0 ? (
                <p className="films__not-found">Ничего не найдено</p>
              ) : (
                <>
                  <ul className="films__list">
                    {arrFilms.map((film) => (
                      <MoviesCard
                        film={film}
                        key={film.id}
                        // isSaved={isSaved}
                        onMovieLike={onMovieLike}
                        onMovieDislike={onMovieDislike}
                      />
                    ))}
                  </ul>
                  {cardsToShow < totalCards && (
                    <button
                      type="button"
                      className="films__btn-more cursor"
                      onClick={handleClick}
                    >
                      Ещё
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
