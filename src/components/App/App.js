import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import MainAfterLogin from "../MainAfterLogin/MainAfterLogin";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import * as Auth from "../Auth/Auth";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState([]);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  function handleSaveMovies(savedMovies) {
    setIsSavedMovies([...isSavedMovies, savedMovies]);
  }
  // СДЕЛАТЬ в навигационном меню активные ссылки

  function handleSubmitRegister(props) {
    const { userName: name, userEmail: email, userPassword: password } = props;
    Auth.register(name, email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        setIsError(err);
      });
  }

  function handleSubmitLogin(props) {
    const { userEmail: email, userPassword: password } = props;
    Auth.authorize(email, password)
      .then((res) => {
        console.log(res);
        if (res.token) {
          setLoggedIn(true);

          navigate("/movies", { replace: true });
          return res;
        }
      })
      .catch((err) => {
        setIsError(err);
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/signin"
          element={
            <Login handleSubmitLogin={handleSubmitLogin} isError={isError} />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              handleSubmitRegister={handleSubmitRegister}
              isError={isError}
            />
          }
        />

        <Route path="/" element={<MainAfterLogin loggedIn={loggedIn} />}>
          <Route
            path="movies"
            element={
              <ProtectedRouteElement
                element={<Movies />}
                loggedIn={loggedIn}
                handleSaveMovies={handleSaveMovies}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRouteElement
                element={<SavedMovies />}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRouteElement
                element={<Profile />}
                loggedIn={loggedIn}
              />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
