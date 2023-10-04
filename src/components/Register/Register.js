import { useState, useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({ handleSubmitRegister, isError }) {
  const [formValue, setFormValue] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  function handleChangeInputs(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmitForm(e) {
    const { userName, userEmail, userPassword } = formValue;
    handleSubmitRegister({ userName, userEmail, userPassword });
    // здесь  должен быть запрос  на роут /signup нашего API.
    // Если в ответе на этот запрос сервер возвращает ошибку,
    // сообщение о ней должно располагаться над кнопкой «Зарегистрироваться».
    // Если ответ на запрос успешен, пользователь сразу авторизуется и будет
    // перенаправлен на страницу «Фильмы».
  }

  return (
    <AuthForm
      title="Добро пожаловать!"
      isNewAccount={true}
      textBtn="Зарегистрироваться"
      textBeforeLink="Уже зарегистрированы?"
      link="/signin"
      textLink="Войти"
      onSubmitForm={handleSubmitForm}
      onChangeInput={handleChangeInputs}
      isError={isError}
    />
  );
}

export default Register;
