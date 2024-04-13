const Reservation = require("../models/Reservation");

const countUserReservationByUserEmail = async(userEmail) => {
    try {
        const count = await Reservation.countDocuments({ reserver_email: userEmail });
        return count;
    } catch (error) {
        console.error("Error counting user reservations:", error);
        throw new Error("Error counting user reservations");
    }
}

module.exports = countUserReservationByUserEmail;