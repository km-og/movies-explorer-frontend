function PageNotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>

      <a href="/" className="not-found__link link">
        Назад
      </a>
    </div>
  );
}

export default PageNotFound;
