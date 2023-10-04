import { useState, useEffect } from "react";

import logo from "../../images/header-logo.svg";

function AuthForm({
  title,
  isNewAccount,
  textBtn,
  textBeforeLink,
  link,
  textLink,
  onSubmitForm,
  onChangeInput,
  isError,
}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [isValidInputName, setIsValidInputName] = useState(true);
  const [isValidInputEmail, setIsValidInputEmail] = useState(false);
  const [isValidInputPassword, setIsValidInputPassword] = useState(false);
  const [isErrorTextForName, setIsErrorTextForName] = useState("");
  const [isErrorTextForEmail, setIsErrorTextForEmail] = useState("");
  const [isErrorTextForPassword, setIsErrorTextForPassword] = useState("");

  function handleChangeInputName(evt) {
    const validationMessage =
      "Имя должно содержать только латиницу, кириллицу, пробел или дефис.";
    if (/^[а-яА-ЯёЁA-Za-z\-\s\D]+$/.test(evt.target.value)) {
      setIsValidInputName(true);
      setIsErrorTextForName(evt.target.validationMessage);
      onChangeInput(evt);
      return;
    }
    setIsErrorTextForName(validationMessage);
    setIsValidInputName(false);
  }

  function handleChangeInputEmail(evt) {
    onChangeInput(evt);
    evt.target.validity.valid
      ? setIsValidInputEmail(true)
      : setIsValidInputEmail(false);
    setIsErrorTextForEmail(evt.target.validationMessage);
  }

  function handleChangeInputPassword(evt) {
    onChangeInput(evt);
    evt.target.validity.valid
      ? setIsValidInputPassword(true)
      : setIsValidInputPassword(false);
    setIsErrorTextForPassword(evt.target.validationMessage);
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
      isValidInputName && isValidInputEmail && isValidInputPassword
        ? setIsValidForm(true)
        : setIsValidForm(false);
    }
    checkAllInputs();
  }, [isValidInputName, isValidInputEmail, isValidInputPassword]);

  return (
    <div className="auth">
      <a href="/" className="link">
        <img className="auth__logo" src={logo} alt="логотип" />
      </a>
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        <div className="auth__box">
          {isNewAccount ? (
            <>
              <label htmlFor="userName" className="auth__label">
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
                onChange={handleChangeInputName}
              />
              <span className="userName-input-error auth__input-error">
                {isErrorTextForName}
              </span>
            </>
          ) : (
            ""
          )}
          <label htmlFor="userEmail" className="auth__label">
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
            onChange={handleChangeInputEmail}
          />
          <span className="userEmail-input-error auth__input-error">
            {isErrorTextForEmail}
          </span>
          <label htmlFor="userPassword" className="auth__label">
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
            onChange={handleChangeInputPassword}
          />
          <span className="userPassword-input-error auth__input-error">
            {isErrorTextForPassword}
          </span>
        </div>
        <div className="auth__box">
          {isError === "" ? (
            ""
          ) : (
            <span className="auth__input-error auth__btn-error ">
              {isError}
            </span>
          )}

          <button
            type="submit"
            className={
              isValidForm
                ? "auth__btn cursor"
                : "auth__btn auth__btn_type_inactive"
            }
          >
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
    </div>
  );
}

export default AuthForm;
