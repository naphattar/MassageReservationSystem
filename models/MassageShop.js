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
    open_close_time:{
        type:String,
        required:[true , 'Please add a open&close time']
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// HospitalSchema.virtual('appointments',{
//     ref:'Appointment',
//     localField:'_id',
//     foreignField:'hospital',
//     justOne:false
// });

// HospitalSchema.pre('deleteOne',{document:true,  query:false}, async function(next){
//     console.log(`Appointment begin removed from hospial ${this._id}`)
//     await this.model('Appoitment').deleteMany({hospital:this._id})
//     next();
// })



module.exports = mongoose.model('MassageShop' , MassageShopSchema);