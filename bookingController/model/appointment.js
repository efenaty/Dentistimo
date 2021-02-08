var mongoose = require('mongoose');
var Clinic = require('../model/clinic');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    userid : { type : String , required : true },
    time : { type : String , required : true },
    date : { type : String, required : true },
    dentistid : { type : Number , required : true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

