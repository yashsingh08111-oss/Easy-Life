const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({

userId:String,

workerId:String,

service:String,

date:Date,

status:{
type:String,
default:"pending"
}

})

module.exports = mongoose.model("Booking",BookingSchema)