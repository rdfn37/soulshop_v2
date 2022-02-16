const { Router } = require("express");
const UserController = require("../controllers/UserController");
const router = Router();

router.get("/login", UserController.loginPage);
router.get("/signup", UserController.signupPage);

router.post("/login", UserController.loginUser);
router.post("/signup", UserController.signupUser);

router.get("/logout", UserController.logoutUser);

module.exports = router;
