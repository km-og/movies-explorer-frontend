import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainAfterLogin({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainAfterLogin;
