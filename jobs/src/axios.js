import axios from "axios";
axios.defaults.baseURL = `https://dashboard.heroku.com/apps/api-jobs-06`;

axios.interceptors.request.use(function (req, res) {
  const user = localStorage.getItem("user");

  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    req.headers.authorization = `Bearer ${token}`;
    return req;
  }
  return req;
});
