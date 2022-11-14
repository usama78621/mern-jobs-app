const express = require("express");
const router = express.Router();
const { login, register, getCurrentUser } = require("../controllers/auth");
const uploadProductImage = require("../controllers/uploadImage");
const authentication = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
// router.route("/getCurrentUser").get(authentication, getCurrentUser);
router.route('/uploads').post(uploadProductImage);

module.exports = router;
