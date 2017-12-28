var Recommend = require('../../models/recommend');
var promise = require('promise');
var moment = require('moment-timezone');
function recommendSave(req){
    var recommend = new Recommend();
	recommend.type = req.body.type;
	recommend.author = req.body.author;
	recommend.title = req.body.title;
	recommend.src = req.body.src;
    recommend.content = req.body.content;
    recommend.create_dt = moment().format('x');
    recommend.delete_flg = false;
    return new promise(function(res,rej){
        recommend.save(err => {
            if (err) {
                rej(err);
            }
            else res('send!');
        });
    });
}

function recommendGet(){
    return new promise(function(res,rej){
        Recommend.find()
            .sort('-create_dt')
            .select('type author title src create_dt')
            .exec((err, recommend) => {
                if(err){
                    rej(err);
                }
                else res(recommend);
            });
    });
}

function recommendGetSingle(id) {
    return new Promise((res,rej) => {
        Recommend.findById(id, (err,recommend)=>{
            if (err) rej(err);
            else res(recommend);
        });
    });
}

function recommendGetByTypes(type) {
    return new Promise((res,rej) => {
        Recommend.find()
        .sort('-create_dt')
        .where('type').equals(type)
        .exec((err, rec) => {
            if(err) {
                rej(err);
            }else {
                res(rec);
            }
        });
    });
}

function recommendGetTypeCount() {
    return new Promise((res, rej) => {
        Recommend.aggregate()
            .group({ _id: '$type', count:{$sum:1}})
            .sort('_id')
            .exec(function (err, count) {
                if (err) rej(err);
                res(count);
            });
    });
}

exports.recommendSave = recommendSave;
exports.recommendGet = recommendGet;
exports.recommendGetSingle = recommendGetSingle;
exports.recommendGetByTypes = recommendGetByTypes;
exports.recommendGetTypeCount = recommendGetTypeCount;