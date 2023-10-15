/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  isRouteSavedMovies,
  isFristRender,
  films,
  isPreload,
  isErr,
  onMovieLike,
  onMovieDislike,
  isSavedMovies,
  // isSaved,
}) {
  // const totalCards = films.length;
  const [totalCards, setTotalCards] = useState(0);
  const [arrFilms, setArrFilms] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(12);
  const windowWidthDesktop = 1025;
  const windowWidthTablet = 768;
  // let arrFilms = films.slice(0, cardsToShow);
  useEffect(() => {
    if (films) {
      setTotalCards(Object.values(films).length);
      setArrFilms(Object.values(films).slice(0, cardsToShow));
    }
  }, [films, cardsToShow]);

  useEffect(() => {
    if (windowWidth >= windowWidthDesktop) {
      setCardsToShow(12);
      return;
    } else if (windowWidth >= windowWidthTablet) {
      setCardsToShow(8);
      return;
    } else {
      setCardsToShow(5);
    }
  }, [windowWidth]);

  function handleClick() {
    if (windowWidth >= windowWidthDesktop) {
      setCardsToShow(cardsToShow + 3);
      return;
    } else {
      setCardsToShow(cardsToShow + 2);
    }
  }

  return (
    <section className="films">
      {isPreload ? (
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
              {totalCards === 0 ? (
                // {films.length === 0 ? (
                isFristRender ? (
                  ""
                ) : isRouteSavedMovies ? (
                  ""
                ) : (
                  <p className="films__not-found">Ничего не найдено</p>
                )
              ) : (
                <>
                  <ul className="films__list">
                    {arrFilms.map((film) => (
                      <MoviesCard
                        isRouteSavedMovies={isRouteSavedMovies}
                        isSavedMovies={isSavedMovies}
                        film={film}
                        key={film.id || film._id}
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
