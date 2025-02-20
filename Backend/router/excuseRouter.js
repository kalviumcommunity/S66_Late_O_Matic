const express = require('express')
const excuseRouter = express.Router()
const excuses = require("../model/excuse.model")

excuseRouter.post('/create', async(req,res)=>{
    try{
        const newExcuse = new excuses(req.body)
        await newExcuse.save()
        res.status(201).send(newExcuse)
    }catch(err){
        res.status(500).send(err)
    }
})

excuseRouter.get('/excuses',async(req,res)=>{
    try{
        const allExcuses = await excuses.find()
        res.status(200).send(allExcuses)
    }catch(err){
        res.status(500).send({message: "Error retrieving excuses", error: err.message})
    }
})


module.exports = excuseRouter;
