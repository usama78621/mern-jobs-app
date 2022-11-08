const User = require("../modal/User");
const { StatusCode } = require("http-status-codes");

const register = async (req, res) => {
  const {} = req.body;
  const user = await User.create({ ...req.body });
  console.log("user =>", user);
  res.status(200).json({ user });
};

const login = async (req, res) => {
  res.send("Login User");
};

module.exports = { login, register };
