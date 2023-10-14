import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { apiMain } from "../../utils/MainApi";

function SavedMovies({
  isErr,
  isSavedMovies,
  handleSaveMovies,
  onMovieDislike,
}) {
  const [isValid, setIsValid] = useState(true);
  const [formValue, setFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  // const [isErr, setIsErr] = useState(false);
  const [shortsIsActive, setShortsIsActive] = useState(false);

  useEffect(() => {
    setFilms(isSavedMovies);
  }, []);

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
    let intermediateListOfFilms = [];
    console.log(1);
    e.preventDefault();
    setIsLoading(true);
    if (formValue === "") {
      setIsValid(false);
      setIsLoading(false);
      return;
    }
    setIsValid(true);
    setIsLoading(false);
    for (let i = 0; i < isSavedMovies.length; i++) {
      if (
        isSavedMovies[i].nameRU.toLowerCase().includes(formValue.toLowerCase())
      ) {
        intermediateListOfFilms.push(isSavedMovies[i]);
      }
    }
    if (shortsIsActive) {
      intermediateListOfFilms = intermediateListOfFilms.filter(
        (film) => film.duration <= 40
      );
    }
    setFilms(intermediateListOfFilms);
  }

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
        isLoading={isLoading}
        isErr={isErr}
        onMovieLike={handleSaveMovies}
        onMovieDislike={onMovieDislike}
      />
    </div>
  );
}

export default SavedMovies;
