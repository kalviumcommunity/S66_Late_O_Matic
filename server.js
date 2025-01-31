const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const db =require("./database")
db()
const PORT = 8080;


const user = require('./model/user.model')

app.get("/",async(req,res)=>{
    const status = mongoose.connection.readyState===1?"connected to mongodb successfully"
    : "not connected to mongodb"
    res.json({"message":"Welcome to LateOMatic",database:status})
})

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


app.listen(PORT, async() => {
 
    console.log(`Server running at http://localhost:${PORT}`);

});



