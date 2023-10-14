import { useState, useEffect, useContext } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { apiMovies } from "../../utils/MoviesApi";
import { apiMain } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({ isSavedMovies, onMovieDislike, onMovieLike }) {
  const [isValid, setIsValid] = useState(true);
  const [formValue, setFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [filmsArr, setFilmsArr] = useState([]);
  const [films, setFilms] = useState([]);
  const [shortsIsActive, setShortsIsActive] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    function getDataFromLocalStorage() {
      if (localStorage.getItem("textFromRequest") !== null) {
        setFormValue(localStorage.getItem("textFromRequest"));
        setFilms(JSON.parse(localStorage.getItem("films")));
        setShortsIsActive(JSON.parse(localStorage.getItem("shortsIsActive")));
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

  useEffect(() => {
    localStorage.setItem("shortsIsActive", JSON.stringify(shortsIsActive));
    localStorage.setItem("textFromRequest", formValue);
    localStorage.setItem("films", JSON.stringify(films));
  }, [shortsIsActive, films]);

  function handleChangeCheckbox() {
    setShortsIsActive((value) => {
      if (!value) {
        const newState = films.filter((film) => film.duration <= 40);
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

  function handleSearchSubmit(e) {
    let intermediateListOfFilms = [];
    e.preventDefault();
    setIsLoading(true);
    if (formValue === "") {
      setIsValid(false);
      setIsLoading(false);
      return;
    }
    setIsValid(true);
    setIsLoading(false);
    for (let i = 0; i < filmsArr.length; i++) {
      if (filmsArr[i].nameRU.toLowerCase().includes(formValue.toLowerCase())) {
        intermediateListOfFilms.push(filmsArr[i]);
      }
    }
    if (shortsIsActive) {
      intermediateListOfFilms = intermediateListOfFilms.filter(
        (film) => film.duration <= 40
      );
    }
    setFilms(intermediateListOfFilms);
  }

  function handleSearchChange(e) {
    setFormValue(e.target.value);
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
        // setFilmsArr((state) => {
        //   console.log(state);
        //   state.map((mov) =>
        //     mov.nameRU === newMovie.data.nameRU ? newMovie.data : mov
        //   );
        // });
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
        isSavedMovies={isSavedMovies}
        films={films}
        isLoading={isLoading}
        isErr={isErr}
        onMovieLike={handleMovieLike}
        onMovieDislike={onMovieDislike}
        // isSaved={isSaved}
      />
    </div>
  );
}

export default Movies;
