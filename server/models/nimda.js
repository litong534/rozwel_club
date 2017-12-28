var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NimdaSchema = new Schema({
    username:String,
    password:String
});

module.exports = mongoose.model('Nimda',NimdaSchema);