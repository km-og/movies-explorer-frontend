import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/header-logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isNavigationMenu, setIsNavigationMenu] = useState(false);

  function handleNavigationMenuShow() {
    setIsNavigationMenu(true);
  }

  function handleNavigationMenuHide() {
    setIsNavigationMenu(false);
  }

  return (
    <header className="header">
      <NavLink to="/" className="header__link link">
        <img src={logo} alt="логотип" className="header__logo" />
      </NavLink>
      {loggedIn ? (
        <>
          <nav className="header__nav">
            <div className="header__container">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link_name_films link header__link_type_active"
                    : "header__link header__link_name_films link"
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link_type_active link header__link_name_saved"
                    : "header__link header__link_name_saved link"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "header__link header__link_type_active link header__link_name_account"
                  : "header__link header__link_name_account link"
              }
            >
              Аккаунт
            </NavLink>
          </nav>
          <div
            className="header__menu cursor"
            onClick={handleNavigationMenuShow}
          ></div>
          {isNavigationMenu ? (
            <Navigation handleClick={handleNavigationMenuHide} />
          ) : (
            ""
          )}
        </>
      ) : (
        <nav className="header__box">
          <NavLink to="/signup" className="header__auth link">
            Регистрация
          </NavLink>
          <NavLink
            to="/signin"
            className="header__auth header__auth_name_signin cursor"
          >
            Войти
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
