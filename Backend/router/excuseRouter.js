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

excuseRouter.post('/add-excuse', async (req, res) => {
    try {
      const newExcuse = new excuses(req.body);
      await newExcuse.save();
      res.status(201).json(newExcuse);
    } catch (err) {
      console.error("POST error:", err);
      res.status(500).json({ message: "Failed to add excuse", error: err.message });
    }
  });
  
  // GET: Retrieve all excuses
  excuseRouter.get('/add-excuse', async (req, res) => {
    try {
      const allExcuses = await excuses.find();
      res.status(200).json(allExcuses);
    } catch (err) {
      console.error("GET error:", err);
      res.status(500).json({ message: "Error fetching excuses", error: err.message });
    }
  });


module.exports = excuseRouter;
