const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    reserver_email : {
        type : String,
        required : [true, 'Please add a reserver_email'],
        trim:true, 
    },
    massage_shop_name : {
        type : String,
        required : [true, 'Please add a massage_shop_name'],
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

// 3 propoties combine must be unique
ReservationSchema.index({ reserver_email: 1, massage_shop_name: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Reservation' , ReservationSchema);