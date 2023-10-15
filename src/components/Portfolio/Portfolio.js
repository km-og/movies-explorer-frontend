import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li>
          <Link
            to="https://km-og.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link link"
          >
            Статичный сайт
          </Link>
        </li>
        <li>
          <Link
            to="https://km-og.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link link"
          >
            Адаптивный сайт
          </Link>
        </li>
        <li>
          <Link
            to="https://km.og.nomoredomains.monster/sign-up"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link portfolio__link_order_last link"
          >
            Одностраничное приложение
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
