import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  isErr,
  isSavedMovies,
  handleSaveMovies,
  onMovieDislike,
}) {
  const [isValid, setIsValid] = useState(true);
  const [formValue, setFormValue] = useState("");
  const [films, setFilms] = useState([]);
  const [shortsIsActive, setShortsIsActive] = useState(false);
  const [isRouteSavedMovies, setIsRouteSavedMovies] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const durationShortFilm = 40;

  useEffect(() => {
    setFilms(isSavedMovies);
    if (isSubmit) {
      renderMovies(isSavedMovies);
    }
  }, [isSavedMovies]);

  console.log(isSavedMovies);
  console.log(typeof isSavedMovies);

  function handleChangeCheckbox() {
    setShortsIsActive((value) => {
      if (!value) {
        const newState = films.filter((film) => film.duration <= 40);
        setFilms(newState);
      } else {
        setFilms(
          isSavedMovies.filter((film) =>
            film.nameRU.toLowerCase().includes(formValue.toLowerCase())
          )
        );
      }
      return !value;
    });
  }

  function handleSearchChange(e) {
    setFormValue(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    setIsValid(true);
    renderMovies(isSavedMovies);
  }

  function renderMovies(isSavedMovies) {
    console.log(123);
    let intermediateListOfFilms = [];
    console.log(456);
    const savedMoviesArr = Object.values(isSavedMovies);
    for (let i = 0; i < savedMoviesArr.length; i++) {
      console.log(654);
      console.log(isSavedMovies[i]);
      if (
        savedMoviesArr[i].nameRU.toLowerCase().includes(formValue.toLowerCase())
      ) {
        intermediateListOfFilms.push(savedMoviesArr[i]);
      }
    }
    if (shortsIsActive) {
      intermediateListOfFilms = intermediateListOfFilms.filter(
        (film) => film.duration <= durationShortFilm
      );
    }
    console.log(intermediateListOfFilms);
    setFilms(intermediateListOfFilms);
  }
  console.log(films);
  return (
    <div className="saved">
      <SearchForm
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        isValid={isValid}
        onChangeCheckbox={handleChangeCheckbox}
        value={formValue}
        shortsIsActive={shortsIsActive}
      />
      <MoviesCardList
        isSavedMovies={isSavedMovies}
        films={films}
        // isLoading={isLoading}
        isErr={isErr}
        onMovieLike={handleSaveMovies}
        onMovieDislike={onMovieDislike}
        isRouteSavedMovies={isRouteSavedMovies}
      />
    </div>
  );
}

export default SavedMovies;
