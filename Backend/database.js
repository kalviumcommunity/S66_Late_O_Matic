const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongoURL = process.env.mongo



const connection =async()=>{
    try{
        await mongoose.connect(mongoURL,{useNewUrlParser:true, useUnifiedTopology: true})
        console.log(`Connected to MongoDB`)
    }catch(error){
        console.error(error)
    }

}

module.exports = connection 