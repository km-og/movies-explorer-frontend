import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
    <AuthForm
      title="Добро пожаловать!"
      isNewAccount={true}
      textBtn="Зарегистрироваться"
      textBeforeLink="Уже зарегистрированы?"
      link="/signin"
      textLink="Войти"
    />
  );
}

export default Register;
