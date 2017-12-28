var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailVCodeTempSchema = new Schema({
    email:String,
    vcode:String,
    create_dt:Date,
    expire_dt:Date
});

module.exports = mongoose.model('EmailVCodeTemp',emailVCodeTempSchema);