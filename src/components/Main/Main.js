import AboutMe from "../AboutMe/AboutMe.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Promo from "../Promo/Promo.js";
import Techs from "../Techs/Techs.js";

function Main() {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
