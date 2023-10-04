function Navigation({ handleClick }) {
  return (
    <div className="navigation">
      <button
        type="button"
        aria-label="Закрыть"
        className="navigation__btn cursor"
        onClick={handleClick}
      ></button>
      <nav>
        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="/" className="navigation__link link">
              Главная
            </a>
          </li>
          <li className="navigation__item">
            <a
              href="/movies"
              className="navigation__link link navigation__link_type_active"
            >
              Фильмы
            </a>
          </li>
          <li className="navigation__item">
            <a href="/saved-movies" className="navigation__link link">
              Сохранённые фильмы
            </a>
          </li>
          <li className="navigation__item">
            <a href="/profile" className="navigation__account link">
              Аккаунт
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
