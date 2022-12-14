var mongoose = require('mongoose')

var jobreqSchema = mongoose.Schema({
    companyname: String,
    position:String,
    salary:Number,
   
},{ collection: "jobreq" })

module.exports = mongoose.model('Jobreq', jobreqSchema)
