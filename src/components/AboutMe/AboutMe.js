import photo from "../../images/student__img.jpg";

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__container">
        <div className="student__text">
          <h3 className="student__subtitle">Инесса</h3>
          <p className="student__briefly">Фронтенд-разработчик, 22 года</p>
          <p className="student__desription">
            В 2021 году я закончила факультет химической технологии в РХТУ, но
            еще во время обучения поняла, что не хочу работать по профессии,
            поэтому начала пробовать новые направления. На ощупь дойдя до
            веб-дизайна, я познакомилась с версткой и решила изучить ее
            подробнее. Это было очень интересно, и вот я здесь &#128512;.
            {/* Помимо
            программирования люблю саморазвитие, психологию, спорт и изучение
            чего-то нового в целом. */}
          </p>
          <a
            href="https://github.com/km-og"
            target="_blank"
            rel="noreferrer"
            className="student__link link"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="Фото студента" className="student__img" />
      </div>
    </section>
  );
}

export default AboutMe;
