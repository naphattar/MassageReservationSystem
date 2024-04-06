const express = require('express')
const dotenv = require('dotenv')

dotenv.config({"path":'./config/config.env'})

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    console.log("Home")
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT , console.log('Server is running in' , process.env.NODE_ENV , 'mode on port' , process.env.PORT)) 
