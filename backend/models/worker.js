const mongoose = require("mongoose")

const WorkerSchema = new mongoose.Schema({

name:String,

service:String,

rating:{
type:Number,
default:5
},

experience:Number,

location:String,

price:Number

})

module.exports = mongoose.model("Worker",WorkerSchema)