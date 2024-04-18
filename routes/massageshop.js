const { createMassageshop, getMassageshop, updateMassageshop, deleteMassageshop } = require("../controllers/massageshopController");
const { protect , authorize} = require("../middlewares/auth");

const router = require("express").Router();

router.post("/",protect,authorize('admin',),createMassageshop).get("/",protect,getMassageshop);
router.route("/:id").put(protect,authorize('admin'),updateMassageshop).delete(protect,authorize('admin'),deleteMassageshop)

module.exports = router;