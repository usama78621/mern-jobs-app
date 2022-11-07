const register = async (req, res) => {
  res.send("Register New User");
};

const login = async (req, res) => {
  res.send("Login User");
};

module.exports = { login, register };
