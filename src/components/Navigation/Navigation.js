import { NavLink } from "react-router-dom";

function Navigation({ handleClick }) {
  function onClick() {
    handleClick();
  }
  return (
    <div className="navigation">
      <button
        type="button"
        aria-label="Закрыть"
        className="navigation__btn cursor"
        onClick={onClick}
      ></button>
      <nav>
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link link navigation__link_type_active"
                  : "navigation__link link "
              }
              onClick={onClick}
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link link navigation__link_type_active"
                  : "navigation__link link "
              }
              onClick={onClick}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link link navigation__link_type_active"
                  : "navigation__link link "
              }
              onClick={onClick}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/profile"
              className="navigation__account link"
              onClick={onClick}
            >
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
