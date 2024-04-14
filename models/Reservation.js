const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    reserver_email : {
        type : String,
        required : [true, 'Please add a reserver_email'],
        trim:true, 
    },
    massageshop_name : {
        type : String,
        required : [true, 'Please add a massageshop_name'],
        trim:true, 
    },
    reservation_date : {
        type : Date,
        required : [true, 'Please add a reservation date'],
    },
    reservation_starttime: {
        type: String,
        required: [true, 'Please add an open time'],
        match: [
            /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
            'Please add a valid time in the format "00:00" to "23:59"',
        ],
    },
    reservation_endtime:{
        type: String,
        required:[true , 'Please add a close time'],
        match: [
            /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
            'Please add a valid time in the format "00:00" to "23:59"',
        ],
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

module.exports =  {Reservation : mongoose.model('Reservation' , ReservationSchema) , ReservationSchema};