const { createReservation, getReservations, updateReservation, deleteReservation } = require("../controllers/reservationController");
const { protect ,authorize } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/",protect,authorize('admin','user'),createReservation)
        .get("/",protect,getReservations)
router.route("/:id").put(protect,authorize('admin','user'),updateReservation)
                    .delete(protect,authorize('admin','user'),deleteReservation)


module.exports = router; 