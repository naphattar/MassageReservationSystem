const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");

dotenv.config({"path":'./config/config.env'})

const app = express()

// connect to DB
connectDB();

// basic app config
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// home route
app.get('/',(_,res)=>{
    res.json({
        message : "Massagereservation api is ready to serve u"
    });
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT , console.log('Server is running in' , process.env.NODE_ENV , 'mode on port' , process.env.PORT));

//handle promise
process.on('unhandleRejection' , (err,_) =>{
    console.log(`Error : ${err.message}`)
    server.close(() => process.exit(1))
}) 
