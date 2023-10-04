import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({ handleSubmitLogin, isError }) {
  const [formValue, setFormValue] = useState({
    userEmail: "",
    userPassword: "",
  });

  function handleChangeInputs(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmitForm(e) {
    // console.log(e.target[0].value);
    // console.log(userEmail);
    const { userEmail, userPassword } = formValue;
    handleSubmitLogin({ userEmail, userPassword });
    setFormValue({ userEmail: "", userPassword: "" });
    // здесь  должен быть запрос  на роут /signup нашего API.
    // Если в ответе на этот запрос сервер возвращает ошибку,
    // сообщение о ней должно располагаться над кнопкой «Зарегистрироваться».
    // Если ответ на запрос успешен, пользователь сразу авторизуется и будет
    // перенаправлен на страницу «Фильмы».
  }

  return (
    <AuthForm
      title="Рады видеть!"
      isNewAccount={false}
      textBtn="Войти"
      textBeforeLink="Ещё не зарегистрированы?"
      link="/signup"
      textLink="Регистрация"
      onSubmitForm={handleSubmitForm}
      onChangeInput={handleChangeInputs}
      isError={isError}
    />
  );
}

export default Login;
