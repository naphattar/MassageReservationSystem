const User = require("../models/User");

//Get token from model, create cookie and send response
const sendTokenResponse=(user,statusCode,res)=>{
    //create token
    const token=user.getSignedJwtToken();
        const options={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };
    // in case of production
    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }
    res.status(statusCode)
        .json({
            success: true,
            _id    : user._id,
            name   : user.name,
            email  : user.email,
            token
        });
};

//@desc Register user
//@route POST /api/v1/user/register
//@access Public
exports.register = async(req,res) =>{
    try{
        const {name , email , password , role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        // const token = user.getSignedJwtToken();
        // res.status(200).json({
        //     success :true,
        //     token
        // })
        sendTokenResponse(user,200,res);
    }catch(err){
        res.status(400).json({
            success : false
        });
        console.log(err.stack);
    }
};

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public
exports.login = async(req,res,next) =>{
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                msg : "Please enter an email and password"
            })
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
            success : false,
            msg : "Invalid credentials"
        })
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                msg : "Invalid credentials"
            })
        }
        sendTokenResponse(user,200,res);
    }catch(err){
        res.status(401).json({
            success : false,
            message : "login failed"
        })
    }
};

exports.getMe = async(req,res,next) =>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        data : user
    });
};

//@desc Log user out / clear cookie
//@route GET /api/v1/auth/logout
//@access Private
exports.logout=async(req,res,next)=>{
    res.cookie('token','none',{
        expires: new Date(Date.now()+ 10*1000),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        data:{}
    });
};