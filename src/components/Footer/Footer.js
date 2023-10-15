import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__year">&#169; 2023</p>
        <nav>
          <ul className="footer__list">
            <li className="footer__item">
              <NavLink
                to="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
                className="footer__link link"
              >
                Яндекс.Практикум
              </NavLink>
            </li>
            <li className="footer__item">
              <NavLink
                to="https://github.com/km-og?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="footer__link link"
              >
                Github
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
