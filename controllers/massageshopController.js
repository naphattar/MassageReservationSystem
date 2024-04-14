
//@desc Register massageshop
//@route POST /api/v1/massageshop

const {MassageShop} = require("../models/MassageShop");

//@access Private
exports.createMassageshop = async(req,res) =>{
    const {name ,address , district , province, tel , open_time , close_time } = req.body;
    // check request body
    if((!name) || (!district) || (!province)|| (!address) ||  (!open_time) || (!close_time)  || (!tel)){
        res.status(400).json({
            success : false,
            message : "invalid request body"
        });
        return;
    }
    try{
        // create new massageshop
        const massageshop = await MassageShop.create({
            name,
            address,
            district,
            province,
            tel,
            open_time,
            close_time
        });
        res.status(201).json({
            success : true,
            data : massageshop,
            message : "create massageshop success"
        });
    }catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        });
        console.log(err.stack);
    }
};