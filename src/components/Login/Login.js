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
    const { userEmail, userPassword } = formValue;
    handleSubmitLogin({ userEmail, userPassword });
    setFormValue({ userEmail: "", userPassword: "" });
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
