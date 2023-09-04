import { Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation";
import Preloader from "../Preloader/Preloader.js";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={false} />
              <Main />
              <Footer />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              {/* <Navigation /> */}
              <Header loggedIn={true} />
              <Movies />
              <Footer />
            </>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <>
              {/* <Navigation /> */}
              <Header loggedIn={true} />
              <SavedMovies />
              <Footer />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              {/* <Navigation /> */}
              <Header loggedIn={true} />
              <Profile />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        {/* <Preloader /> */}
      </Routes>
    </div>
  );
}

export default App;
