import { NavLink } from "react-router-dom";

function NavTab() {
  return (
    <nav className="promo__links">
      <NavLink to="#aboutProject" className="promo__link link">
        О проекте
      </NavLink>
      <NavLink to="#techs" className="promo__link link">
        Технологии
      </NavLink>
      <NavLink to="#student" className="promo__link link">
        Студент
      </NavLink>
    </nav>
  );
}

export default NavTab;
