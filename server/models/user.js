var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email:String,
	nickname:String,
	password:String,
	name:String,
	image:String,
	birth:String,
	sex:Number,
	constellation:Number,
	location:String,
	mobile:String,
	school:String,
	company:String,
	create_dt:Date,
	delete_flg:Boolean
});

module.exports = mongoose.model('User',UserSchema);