const {register ,login , getMe , logout, changePassword} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login)
router.post("/change-password",changePassword);
router.get("/me",protect,getMe);
router.get("/logout",logout)

module.exports = router;