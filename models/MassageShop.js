const mongoose = require('mongoose')

const MassageShopSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please add a name'],
        unique: true,
        trim:true, //trim space front and back 
        maxlength:[50,'Name can not be more than 50 word']
    },
    address : {
        type: String,
        required: [true,'Please add an address']
    },
    district:{
        type:String,
        required:[true,'Please add a district']
    },
    province:{
        type:String,
        required:[true,'Please add a province']
    },
    tel:{
        type:String
    },
    open_time:{
        type: Date,
        required:[true , 'Please add an open time']
    },
    close_time:{
        type: Date,
        required:[true , 'Please add a close time']
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


module.exports = mongoose.model('MassageShop' , MassageShopSchema);