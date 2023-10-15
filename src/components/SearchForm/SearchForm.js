function SearchForm({
  isValid,
  onChange,
  onSubmit,
  onChangeCheckbox,
  value,
  shortsIsActive,
}) {
  return (
    <section className="search">
      <form
        className="search__form"
        id="searchForm"
        name="searchForm"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="search__container">
          <label className="search__input-box">
            <input
              className="search__input"
              type="text"
              minLength="2"
              maxLength="200"
              name="inputFilm"
              placeholder="Фильм"
              onChange={onChange}
              value={value || ""}
            />
            {isValid ? (
              ""
            ) : (
              <span className="search__text-error">
                Нужно ввести ключевое слово
              </span>
            )}
          </label>
          <button type="submit" className="search__btn cursor"></button>
        </div>
        <div className="search__box">
          <label className="search__shorts cursor">
            <input
              type="checkbox"
              id="search-checkbox"
              className="search__checkbox"
              checked={shortsIsActive}
              onChange={onChangeCheckbox}
            />
            <span className="search__slider "></span>
          </label>
          <label htmlFor="search-checkbox" className="search__label">
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
