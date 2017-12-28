var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendSchema = new Schema({
	type:Number,
	author:String,
	title:String,
	src:String,
	content:String,
	create_dt:Date,
	delete_flg:Boolean
});

module.exports = mongoose.model('Recommend',RecommendSchema);