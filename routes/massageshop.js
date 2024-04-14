const { createMassageshop } = require("../controllers/massageshopController");
const { protect , authorize} = require("../middlewares/auth");

const router = require("express").Router();

router.post("/",protect,authorize('admin',),createMassageshop);

module.exports = router;