const Reservation = require("../models/Reservation");
const Massageshop = require("../models/MassageShop");
const countUserReservationByUserEmail = require("../utills/reservationUtill");

//@desc login user reserve a massageshop
//@route POST /api/v1/reservation/
//@access Private
exports.createReservation = async(req,res,next)=>{
    const {massage_shop_name ,reservation_date} = req.body;
    const user = req.user;
    // check user 
    if(!user){
        res.status(401).json({
            success : false,
            message : "unauthorized"
        });
        return;
    }
    // check user's reservation count
    const counts = countUserReservationByUserEmail(user.email);
    if(counts > 3){
        res.status(401).json({
            success : false,
            message : `User : ${user.name} has alreadyed reserved up to maximum capacity reservation`
        });
        return;
    }
    // check the massageshop_name 
    const massageshop = await Massageshop.findOne({ massageshop_name: massage_shop_name });
    if(!massageshop){
        res.status(400).json({
            success : false,
            message : `Massageshop : ${user.name} is not existed in this reservation system`
        });
        return;
    }
    try{
        // validate reservation_date e.g., 'YYYY-MM-DD
        const isValidDate = !isNaN(Date.parse(reservation_date));
        if (!isValidDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format for reservation_date"
            });
        }
        // create new reservation
        const reservation = await Reservation.create({
            reserver_email : user.email,
            massage_shop_name : massage_shop_name,
            reservation_date : new Date(reservation_date)
        });

        res.status(201).json({
            success : true,
            data : reservation,
            message : "reservation success"
        });
        
    }catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        });
        console.log(err.stack);
    }
};