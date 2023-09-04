import { films } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="films">
      <ul className="films__list">
        {films.map((film) => (
          <MoviesCard film={film} key={film._id} />
        ))}
      </ul>
      <button type="button" className="films__btn-more cursor">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
