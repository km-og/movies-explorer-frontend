import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainAfterLogin({ loggedIn, onClick }) {
  return (
    <>
      <Header loggedIn={loggedIn} onClick={onClick} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainAfterLogin;
