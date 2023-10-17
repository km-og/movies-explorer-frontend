import { useState, useEffect, useContext } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { apiMovies } from "../../utils/MoviesApi";
import { apiMain } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({ isSavedMovies, onMovieDislike, onMovieLike }) {
  const [isValid, setIsValid] = useState(true);
  const [formValue, setFormValue] = useState("");
  const [isPreload, setIsPreload] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [filmsArr, setFilmsArr] = useState([]);
  const [films, setFilms] = useState([]);
  const [shortsIsActive, setShortsIsActive] = useState(false);
  const [isFristRender, setIsFirstRender] = useState(true);
  // const [isSaved, setIsSaved] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const durationShortFilm = 40;

  useEffect(() => {
    function getDataFromLocalStorage() {
      if (!localStorage.getItem("textFromRequest")) {
        setIsFirstRender(true);
        return;
      } else {
        setFormValue(localStorage.getItem("textFromRequest"));
        setFilms(JSON.parse(localStorage.getItem("films")));
        setShortsIsActive(JSON.parse(localStorage.getItem("shortsIsActive")));
        setIsFirstRender(false);
      }
    }
    getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("shortsIsActive", JSON.stringify(shortsIsActive));
    localStorage.setItem("textFromRequest", formValue);
    localStorage.setItem("films", JSON.stringify(films));
  }, [shortsIsActive, films]);

  function getCards() {
    apiMovies
      .getData()
      .then((data) => {
        setFilmsArr(data);
        renderMovies(data);
        setIsPreload(false);
        setIsFirstRender(false);
      })
      .catch((err) => {
        setIsErr(true);
        setIsPreload(false);
      });
  }

  useEffect(() => {
    if (Object.values(filmsArr).length === 0 && !isFristRender) {
      getCards();
    }
  }, [isFristRender]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (formValue === "") {
      setIsValid(false);
      return;
    }
    setIsPreload(true);
    setIsValid(true);

    if (isFristRender && Object.values(filmsArr).length === 0) {
      getCards();
    }

    if (!isFristRender) {
      renderMovies(filmsArr);
      setIsPreload(false);
      return;
    }
  }

  function renderMovies(filmsArr) {
    let intermediateListOfFilms = [];
    for (let i = 0; i < filmsArr.length; i++) {
      if (filmsArr[i].nameRU.toLowerCase().includes(formValue.toLowerCase())) {
        intermediateListOfFilms.push(filmsArr[i]);
      }
    }
    if (shortsIsActive) {
      intermediateListOfFilms = intermediateListOfFilms.filter(
        (film) => film.duration <= durationShortFilm
      );
    }
    // setIsPreload(false);
    setFilms(intermediateListOfFilms);
  }

  function handleSearchChange(e) {
    setFormValue(e.target.value);
  }

  function handleChangeCheckbox() {
    setShortsIsActive((value) => {
      if (!value) {
        const newState = films.filter(
          (film) => film.duration <= durationShortFilm
        );
        setFilms(newState);
      } else {
        setFilms(
          filmsArr.filter((film) =>
            film.nameRU.toLowerCase().includes(formValue.toLowerCase())
          )
        );
      }
      return !value;
    });
  }

  function handleMovieLike(movie) {
    const token = localStorage.getItem("token");
    const image = `https://api.nomoreparties.co${movie.image.url}`;
    const thumbnail = `https://api.nomoreparties.co${movie.image.url}`;
    const owner = currentUser.id;
    const {
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    } = movie;
    // setIsSaved(true);
    apiMain
      .saveMovie(
        {
          country,
          director,
          duration,
          year,
          description,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail,
        },
        image,
        thumbnail,
        token,
        owner
      )
      .then((newMovie) => {
        onMovieLike(newMovie.data);
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
        shortsIsActive={shortsIsActive}
      />
      <MoviesCardList
        isFristRender={isFristRender}
        isSavedMovies={isSavedMovies}
        films={films}
        isPreload={isPreload}
        isErr={isErr}
        onMovieLike={handleMovieLike}
        onMovieDislike={onMovieDislike}
        // isSaved={isSaved}
      />
    </div>
  );
}

export default Movies;
