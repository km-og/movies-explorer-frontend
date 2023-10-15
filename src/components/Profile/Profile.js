import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  userInfo,
  onChangeInput,
  isQueryResult,
  onSubmitForm,
  onSignOut,
}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [isValidInputName, setIsValidInputName] = useState(false);
  const [isValidInputEmail, setIsValidInputEmail] = useState(false);
  const [isErrorTextForName, setIsErrorTextForName] = useState("");
  const [isErrorTextForEmail, setIsErrorTextForEmail] = useState("");

  // const name = userInfo.profileName;
  // const email = userInfo.profileEmail;

  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  function signOut(e) {
    e.preventDefault();
    if (localStorage.getItem("films")) {
      localStorage.removeItem("films");
      localStorage.removeItem("textFromRequest");
      localStorage.removeItem("shortsIsActive");
    }
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    onSignOut();
  }

  function handleChangeInputName(evt) {
    const validationMessage =
      "Имя должно содержать только латиницу, кириллицу, пробел или дефис.";
    if (
      /^[а-яА-ЯёЁA-Za-z\-\s\D]+$/.test(evt.target.value) &&
      evt.target.value !== currentUser.name
    ) {
      setIsValidInputName(true);
      setIsErrorTextForName(evt.target.validationMessage);
      onChangeInput(evt);
      return;
    }
    setIsErrorTextForName(validationMessage);
    setIsValidInputName(false);
  }

  function handleChangeInputEmail(evt) {
    const validationMessage = "Почта должна быть формата example@example.com";
    if (
      /^[\w]+[\-]?[\w]+@[\w]+[\-]?[\w]+\.[a-zA-Z]{2,}$/.test(
        evt.target.value
      ) &&
      evt.target.value !== currentUser.email
    ) {
      setIsValidInputEmail(true);
      setIsErrorTextForEmail(evt.target.validationMessage);
      onChangeInput(evt);
      return;
    }
    setIsErrorTextForEmail(validationMessage);
    setIsValidInputEmail(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValidForm) {
      return;
    } else {
      onSubmitForm(evt);
    }
  }

  useEffect(() => {
    function checkAllInputs() {
      isValidInputName || isValidInputEmail
        ? setIsValidForm(true)
        : setIsValidForm(false);
    }
    checkAllInputs();
  }, [isValidInputName, isValidInputEmail]);

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      {/* <h2 className="profile__title">Привет, {userInfo.profileName}!</h2> */}
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__input-box">
          <label htmlFor="profileName" className="profile__label">
            Имя
          </label>
          <input
            id="profileName"
            type="text"
            className="profile__input"
            name="name"
            required
            minLength="2"
            maxLength="200"
            defaultValue={userInfo.name}
            onChange={handleChangeInputName}
          />
          <span className="userName-input-error auth__input-error">
            {isErrorTextForName}
          </span>
        </div>
        <span className="profile__border"></span>
        <div className="profile__input-box">
          <label htmlFor="profileEmail" className="profile__label">
            E-mail
          </label>
          <input
            id="profileEmail"
            type="email"
            className="profile__input"
            name="email"
            required
            minLength="2"
            maxLength="200"
            defaultValue={userInfo.email}
            onChange={handleChangeInputEmail}
          />
          <span className="userEmail-input-error auth__input-error">
            {isErrorTextForEmail}
          </span>
        </div>
        {isQueryResult === "" ? (
          ""
        ) : (
          <span className="auth__input-error auth__btn-error ">
            {isQueryResult}
          </span>
        )}
        <button
          type="submit"
          // className="profile__btn cursor"
          className={
            isValidForm
              ? "profile__btn cursor"
              : "profile__btn profile__btn_type_inactive"
          }
        >
          Редактировать
        </button>
        <NavLink to="/signin" className="profile__exit" onClick={signOut}>
          Выйти из аккаунта
        </NavLink>
      </form>
    </div>
  );
}

export default Profile;
