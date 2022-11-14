const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUser,
  getCurrentUser,
} = require("../controllers/auth");
const authentication = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getCurrentUser", authentication, getCurrentUser);
router.route("/uploads").post(authentication, updateUser);

module.exports = router;
