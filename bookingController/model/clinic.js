var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clinicSchema = new Schema({
    id : { type: Number, required: true},
    name : { type: String, required: true },
    owner : { type: String, required: true },
    dentistsNumber : { type: Number, required: true },
    longitude : { type: Number, required: true},
    latitude : { type: Number, required: true}
});

module.exports = mongoose.model('Clinic', clinicSchema);