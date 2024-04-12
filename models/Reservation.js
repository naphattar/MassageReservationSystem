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
    date : {
        type : Date,
        required : [true, 'Please add a reservation date'],
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// 3 propoties combine must be unique
ReservationSchema.index({ reserver_email: 1, massage_shop_name: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Reservation' , ReservationSchema);