function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" id="searchForm" name="searchForm">
        <div className="search__container">
          <input
            className="search__input"
            type="text"
            min="2"
            name="inputFilm"
            placeholder="Фильм"
          />
          <button type="submit" className="search__btn cursor"></button>
        </div>
        <div className="search__box">
          <label className="search__shorts cursor">
            <input
              type="checkbox"
              id="search-checkbox"
              className="search__checkbox"
            />
            <span className="search__slider "></span>
          </label>
          <label for="search-checkbox" className="search__label">
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
