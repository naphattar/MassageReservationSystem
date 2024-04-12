const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true , "Please add a name"]
    },
    
    email : {
        type : String,
        require : [true , "Please add an email"],
        unique : true,
        match:[
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Please add a valid email'
        ]
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number'],
        validate: {
          validator: function (value) {
            const regex = /^\d{3}-\d{3}-\d{4}$/;
            return regex.test(value);
          },
          message: 'Please add a valid telephone number in the format "xxx-xxx-xxxx"',
        },
      },
    password : {
        type : String,
        require : [true , "Please add a password"],
        minlength : 6,
        select : false
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    createdAt : {
        type : Date,
        default : Date.now
    }
});

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    });
}
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User',UserSchema);