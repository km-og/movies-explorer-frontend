function MoviesCard({ film }) {
  return (
    <li className="films__card">
      <img src={film.link} alt={film.name} className="films__preview cursor" />
      {film.isSaved ? (
        <div className="films__icon-save"></div>
      ) : (
        <button
          type="button"
          aria-label="Сохранить"
          className="films__btn-save cursor"
        >
          Сохранить
        </button>
      )}

      <div className="films__text">
        <p className="films__name">{film.name}</p>
        <p className="films__duration">{film.duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
