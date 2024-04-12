const {register ,login , getMe , logout} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login)
router.get("/me",protect,getMe);
router.get("/logout",logout)

module.exports = router;