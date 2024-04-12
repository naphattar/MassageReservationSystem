const { createReservation } = require("../controllers/reservationController");
const { protect ,authorize } = require("../middlewares/auth");

const router = require("express").Router();

router.route('/').post(protect,authorize('admin','user'),createReservation)

module.exports = router;