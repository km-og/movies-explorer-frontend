import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { apiMovies } from "../../utils/MoviesApi";
import { apiMain } from "../../utils/MainApi";

function Movies({ handleSaveMovies }) {
  const [isValid, setIsValid] = useState(true);
  const [formValue, setFormValue] = useState("");
  // const [formValue, setFormValue] = useState({
  //   inputFilm: "",
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [filmsArr, setFilmsArr] = useState([]);
  const [films, setFilms] = useState([]);
  const [shortsIsActive, setShortsIsActive] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  let intermediateListOfFilms = [];

  useEffect(() => {
    function getDataFromLocalStorage() {
      if (localStorage.getItem("textFromRequest") !== null) {
        setFormValue(localStorage.getItem("textFromRequest"));
        setFilms(JSON.parse(localStorage.getItem("films")));
        setShortsIsActive(localStorage.getItem("shortsIsActive"));
        return;
      }
    }
    getDataFromLocalStorage();

    function getCards() {
      apiMovies
        .getData()
        .then((data) => {
          setFilmsArr(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsErr(true);
        });
    }
    getCards();
  }, []);

  function handleChangeCheckbox() {
    setShortsIsActive(true);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (formValue === "") {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setIsLoading(false);
    for (let i = 0; i < filmsArr.length; i++) {
      if (filmsArr[i].nameRU.toLowerCase().includes(formValue.toLowerCase())) {
        intermediateListOfFilms.push(filmsArr[i]);
      }
    }
    setFilms(intermediateListOfFilms);
    // сохранение в localStorage параметров запроса
    localStorage.setItem("textFromRequest", formValue);
    localStorage.setItem("films", JSON.stringify(intermediateListOfFilms));
    localStorage.setItem("shortsIsActive", shortsIsActive);
  }

  function handleSearchChange(e) {
    // const { name, value } = e.target;
    // setFormValue({ ...formValue, [name]: value });
    setFormValue(e.target.value);
  }

  function handleMovieLike(movie) {
    console.log(movie);
    // setIsSaved(true);
    apiMain
      .saveMovie(movie.id)
      .then((newMovie) => {
        console.log(newMovie);
        handleSaveMovies((state) => {
          // массив со всеми карточками
          console.log(state);
          // console.log(m)  каждая карточка этого массива
          state.map((m) => (m.id === movie.id ? newMovie : m));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDislike(movie) {
    console.log(movie);
    // setIsSaved(false);
    apiMain
      .deleteMovie(movie.id)
      .then((newMovie) => {
        console.log(newMovie);
        handleSaveMovies((state) => {
          const newState = state.filter((item) => {
            return item.id !== movie.id;
          });
          return newState;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="movies">
      <SearchForm
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        isValid={isValid}
        onChangeCheckbox={handleChangeCheckbox}
        value={formValue}
      />
      <MoviesCardList
        films={films}
        isLoading={isLoading}
        isErr={isErr}
        onMovieLike={handleMovieLike}
        onMovieDislike={handleMovieDislike}
        // isSaved={isSaved}
      />
    </div>
  );
}

export default Movies;
