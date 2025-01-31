const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const mongoURL = process.env.mongo
const connection = mongoose.connect(mongoURL)
const user = require('./model/user.model')

app.get("/ping",function(req,res){
    res.send("pong");
})

app.post("/create",async(req,res)=>{
    let {username,email,password}=req.body
    let payload = {username,email,password}
    try{
        let newUser = new user(payload)
        await newUser.save()
        res.send({"message":"newUser created"})
    }catch(error){
        console.error(error)
        res.send({"message":"couldn't create newUser",error:error.message})

    }
    

})
const PORT = 8080;

app.listen(PORT, async() => {
    try{
        await connection 
        console.log(`Connected to MongoDB`)
    }catch(error){
        console.error(error)
    }
    console.log(`Server running at http://localhost:${PORT}`);

});



