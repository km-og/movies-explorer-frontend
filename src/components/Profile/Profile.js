import { useNavigate } from "react-router-dom";

function Profile() {
  const name = "Виталий";
  const email = "pochta@yandex.ru";

  const navigate = useNavigate();

  function signOut() {
    if (localStorage.getItem("films")) {
      localStorage.removeItem("films");
      localStorage.removeItem("textFromRequest");
      localStorage.removeItem("shortsIsActive");
    }
    navigate("/signin");
  }

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form">
        <div className="profile__input-box">
          <label for="profileName" className="profile__label">
            Имя
          </label>
          <input
            id="profileName"
            type="text"
            className="profile__input"
            name="profileName"
            required
            minLength="2"
            maxLength="200"
            value={name}
          />
        </div>
        <span className="profile__border"></span>
        <div className="profile__input-box">
          <label for="profileEmail" className="profile__label">
            E-mail
          </label>
          <input
            id="profileEmail"
            type="text"
            className="profile__input"
            name="profileEmail"
            required
            minLength="2"
            maxLength="200"
            value={email}
          />
        </div>
        <button type="submit" className="profile__btn cursor">
          Редактировать
        </button>
        <a href="/signin" className="profile__exit" onClick={signOut}>
          Выйти из аккаунта
        </a>
      </form>
    </div>
  );
}

export default Profile;
