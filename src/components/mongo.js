var mongoose = require('mongoose')

var jobSchema = mongoose.Schema({
    name: String,
    lastname:String,
    age:Number,
    email:String,
    password:String,
    phoneno:Number,
    address:String,
    graduate1:String,
    marks1:Number,
    graduate2:String,
    marks2:Number,
    company1:String,
    year1:Number,
    company2:String,
    year2:Number,
    resume:String,
    applied_job: {type:Array},

},{ collection: "jobs" })

module.exports = mongoose.model('Jobs', jobSchema)
