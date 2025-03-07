const express = require('express');
const excuseRouter = express.Router();
const Excuse = require('../model/excuse.model');


excuseRouter.post('/', async (req, res) => {
    try {
        const newExcuse = new Excuse(req.body);
        await newExcuse.save();
        res.status(201).json(newExcuse);
    } catch (err) {
        res.status(500).json({ message: "Failed to add excuse", error: err.message });
    }
});


excuseRouter.get('/', async (req, res) => {
    try {
        const allExcuses = await Excuse.find();
        res.status(200).json(allExcuses);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving excuses", error: err.message });
    }
});


excuseRouter.put('/:id', async (req, res) => {
    try {
        const updatedExcuse = await Excuse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExcuse) return res.status(404).json({ message: "Excuse not found" });
        res.status(200).json(updatedExcuse);
    } catch (err) {
        res.status(500).json({ message: "Failed to update excuse", error: err.message });
    }
});


excuseRouter.delete('/:id', async (req, res) => {
    try {
        const deletedExcuse = await Excuse.findByIdAndDelete(req.params.id);
        if (!deletedExcuse) return res.status(404).json({ message: "Excuse not found" });
        res.status(200).json({ message: "Excuse deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete excuse", error: err.message });
    }
});

module.exports = excuseRouter;
