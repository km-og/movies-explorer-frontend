import logo from "../../images/header-logo.svg";

function AuthForm({
  title,
  isNewAccount,
  textBtn,
  textBeforeLink,
  link,
  textLink,
}) {
  return (
    <section className="auth">
      <a href="/" className="link">
        <img className="auth__logo" src={logo} alt="логотип" />
      </a>
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form">
        <div className="auth__box">
          {isNewAccount ? (
            <>
              <label for="userName" className="auth__label">
                Имя
              </label>
              <input
                id="userName"
                type="text"
                className="auth__input"
                name="userName"
                required
                minLength="2"
                maxLength="200"
              />
            </>
          ) : (
            ""
          )}
          <label for="userEmail" className="auth__label">
            E-mail
          </label>
          <input
            id="userEmail"
            type="email"
            className="auth__input"
            name="userEmail"
            required
            minLength="2"
            maxLength="200"
          />
          <label for="userEmail" className="auth__label">
            Пароль
          </label>
          <input
            id="userPassword"
            type="password"
            className="auth__input"
            name="userPassword"
            required
            minLength="6"
            maxLength="200"
          />
        </div>
        <div className="auth__box">
          <button type="submit" className="auth__btn cursor">
            {textBtn}
          </button>

          <p className="auth__text">
            {textBeforeLink}
            <a href={link} className="auth__link ">
              {textLink}
            </a>
          </p>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
