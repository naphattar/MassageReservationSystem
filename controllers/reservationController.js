const {Reservation} = require("../models/Reservation");
const {MassageShop} = require("../models/MassageShop");
const {countUserReservationByUserEmail, checkReservationTime}= require("../utills/reservationUtill");

//@desc login user reserve a massageshop
//@route POST /api/v1/reservation/
//@access Private
exports.createReservation = async(req,res,next)=>{
    const {massageshop_name ,reservation_date , start_time , end_time} = req.body;
    const user = req.user;
    // check user 
    if(!user){
        res.status(401).json({
            success : false,
            message : "unauthorized"
        });
        return;
    }
    // check request body
    if((!massageshop_name) || (!reservation_date) ||  (!start_time) || (!end_time)){
        res.status(400).json({
            success : false,
            message : "invalid request body"
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
    const massageshop = await MassageShop.findOne({ massageshop_name: massageshop_name });
    if(!massageshop){
        res.status(400).json({
            success : false,
            message : `Massageshop : ${massageshop_name} is not existed in this reservation system`
        });
        return;
    }
    // check the starttime and endtime 
    if(!checkReservationTime(startTime,endTime,massageshop)){
        res.status(400).json({
            success : false,
            message : `Massageshop : ${massageshop_name} is not available in this reservation time`
        });
        return;
    };
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
            massageshop_name : massageshop_name,
            reservation_date : new Date(reservation_date),
            reservation_starttime : start_time,
            reservation_endtime : end_time
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