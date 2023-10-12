import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { apiMain } from "../../utils/MainApi";

function SavedMovies({ isSavedMovies, onMovieDislike }) {
  // console.log(isSavedMovies);
  useEffect(() => {
    const token = localStorage.getItem("token");
    apiMain
      .getData(token)
      .then((res) => {
        console.log(res);
        console.log("res");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="saved">
      <SearchForm />
      <MoviesCardList
        films={isSavedMovies}
        // isLoading={isLoading}
        // isErr={isErr}
        onMovieDislike={onMovieDislike}
      />
    </div>
  );
}

export default SavedMovies;
