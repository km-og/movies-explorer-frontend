import logo from "../../images/header-logo.svg";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <a href="/" className="header__link link">
        <img src={logo} alt="логотип" className="header__logo" />
      </a>
      {loggedIn ? (
        <>
          <nav className="header__nav">
            <div className="header__container">
              <a
                href="/movies"
                className="header__link header__link_type_active header__link_name_films link"
              >
                Фильмы
              </a>
              <a
                href="/saved-movies"
                className="header__link header__link_name_saved link"
              >
                Сохранённые фильмы
              </a>
            </div>
            <a
              href="/profile"
              className="header__link header__link_name_account link"
            >
              Аккаунт
            </a>
          </nav>
          <div className="header__menu cursor"></div>
        </>
      ) : (
        <nav className="header__box">
          <a href="/signup" className="header__auth link">
            Регистрация
          </a>
          <a
            href="/signin"
            className="header__auth header__auth_name_signin link"
          >
            Войти
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
