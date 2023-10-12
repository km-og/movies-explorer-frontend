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
import { apiMain } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [isError, setIsError] = useState("");
  const [isQueryResultUpdateInfo, setIsQueryResultUpdateInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleSaveMovies(savedMovies) {
    console.log(savedMovies);
    setIsSavedMovies([...isSavedMovies, savedMovies]);
  }

  // СДЕЛАТЬ в навигационном меню активные ссылки

  function handleSubmitRegister(props) {
    const { userName: name, userEmail: email, userPassword: password } = props;
    Auth.register(name, email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        return res;
      })
      .catch((err) => {
        setIsError(err);
      });
  }

  function handleSubmitLogin(props) {
    const { userEmail: email, userPassword: password } = props;
    Auth.authorize(email, password)
      .then((res) => {
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

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            const userData = {
              name: res.data.name,
              email: res.data.email,
              id: res.data._id,
            };
            setCurrentUser(userData);
            return res;
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }

  function handleChangeUserInfo(e) {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  }

  function handleUpdateProfile(e) {
    const token = localStorage.getItem("token");
    const { name, email } = currentUser;

    apiMain
      .sendData(name, email, token, "PATCH")
      .then((newData) => {
        console.log(newData);
        setIsQueryResultUpdateInfo("Запрос прошел успешно");
        setCurrentUser({ ...currentUser, newData });
      })
      .catch((err) => {
        setIsQueryResultUpdateInfo("Что-то пошло не так...");
        console.log(err);
      });
  }

  function changeOnExit() {
    setLoggedIn(false);
    setIsLoading(false);
  }

  function handleMovieDislike(movie) {
    console.log(movie);
    const token = localStorage.getItem("token");
    // setIsSaved(false);
    apiMain
      .deleteMovie(movie.id, token)
      .then((newMovie) => {
        console.log(newMovie);
        handleSaveMovies((state) => {
          const newState = state.filter((item) => {
            return item.id !== movie.id;
          });
          return newState;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              path=""
              element={
                <Main loggedIn={loggedIn} handleSaveMovies={handleSaveMovies} />
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  handleSaveMovies={handleSaveMovies}
                  onMovieDislike={handleMovieDislike}
                />
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  isLoading={isLoading}
                  loggedIn={loggedIn}
                  isSavedMovies={isSavedMovies}
                  onMovieDislike={handleMovieDislike}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  userInfo={currentUser}
                  onChangeInput={handleChangeUserInfo}
                  isQueryResult={isQueryResultUpdateInfo}
                  onSubmitForm={handleUpdateProfile}
                  onSignOut={changeOnExit}
                />
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
