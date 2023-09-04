import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return (
    <AuthForm
      title="Рады видеть!"
      isNewAccount={false}
      textBtn="Войти"
      textBeforeLink="Ещё не зарегистрированы?"
      link="/signup"
      textLink="Регистрация"
    />
  );
}

export default Login;
