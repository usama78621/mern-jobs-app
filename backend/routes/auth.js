const express = require("express");
const router = express.Router();

const { login, register ,getCurrentUser} = require("../controllers/auth");
const auth = require("../middleware/auth");

// router.route("/:id").get(getSingleLoginUser).patch(uploadProductImage);
router.post("/register", register);
router.post("/login", login);
router.route('/getCurrentUser').get(auth, getCurrentUser);

module.exports = router;
