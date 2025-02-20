const mongoose = require('mongoose')

const excuseSchema = new mongoose.Schema({
    excuse:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:"Anonymous"
    }
})

module.exports = mongoose.model("excuse",excuseSchema)
