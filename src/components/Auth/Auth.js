const baseUrl = "https://api.km-og.nomoreparties.co";

function checkingStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(new Error("Что-то пошло не так..."));
  }
}

const register = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      return checkingStatus(res);
    })
    .then((res) => {
      // здесь возвращается токен JWT
      if (res.token) {
        console.log(res.token);
        localStorage.setItem("token", res.token);
      }
      return res;
    });
};

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkingStatus(res);
    })
    .then((res) => {
      if (res.token) {
        console.log(res.token);
        localStorage.setItem("token", res.token);
        return res;
      }
    });
};

export { baseUrl, register, authorize };
