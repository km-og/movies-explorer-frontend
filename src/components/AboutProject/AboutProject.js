function AboutProject() {
  return (
    <section className="description" id="aboutProject">
      <h2 className="description__title">О проекте</h2>
      <div className="description__container">
        <div className="description__column">
          <h3 className="description__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="description__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="description__column">
          <h3 className="description__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="description__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="description__stages">
        <div className="description__stage">
          <p className="description__week description__week_type_first">
            1 неделя
          </p>
          <p className="description__which-end">Back-end</p>
        </div>
        <div className="description__stage">
          <p className="description__week description__week_type_second">
            4 недели
          </p>
          <p className="description__which-end">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
