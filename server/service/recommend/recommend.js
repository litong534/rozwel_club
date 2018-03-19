var Recommend = require('../../models/recommend');
var promise = require('promise');
var moment = require('moment-timezone');
const COUNT_PER_PAGE = 5;
function recommendSave(req) {
    var recommend = new Recommend();
    recommend.type = req.body.type;
    recommend.author = req.body.author;
    recommend.title = req.body.title;
    recommend.src = req.body.src;
    recommend.content = req.body.content;
    recommend.create_dt = moment().format('x');
    recommend.delete_flg = false;
    return new promise(function (res, rej) {
        recommend.save(err => {
            if (err) {
                rej(err);
            }
            else res('send!');
        });
    });
}

function recommendGet(page) {
    return new promise(function (res, rej) {
        Recommend.find()
            .sort('-create_dt')
            .skip((page - 1) * COUNT_PER_PAGE)
            .limit(COUNT_PER_PAGE)
            .select('type author title src create_dt')
            .exec((err, recommend) => {
                if (err) {
                    rej(err);
                }
                else res(recommend);
            });
    });
}

function recommendGetSingle(id) {
    return new Promise((res, rej) => {
        Recommend.findById(id, (err, recommend) => {
            if (err) rej(err);
            else res(recommend);
        });
    });
}

function recommendGetByTypes(type, page) {
    return new Promise((res, rej) => {
        var r = Recommend.find()
        if (parseInt(type) !== -1) {
            r = r.where('type').equals(type);
        }
        r.sort('-create_dt')
            .skip((page - 1) * COUNT_PER_PAGE)
            .limit(COUNT_PER_PAGE)
            .select('type author title src create_dt');
        r.exec((err, rec) => {
            if (err) {
                rej(err);
            } else {
                res(rec);
            }
        });
    });
}

function recommendGetTypeCount() {
    return new Promise((res, rej) => {
        Recommend.aggregate()
            .group({ _id: '$type', count: { $sum: 1 } })
            .sort('_id')
            .exec(function (err, count) {
                if (err) rej(err);
                res(count);
            });
    });
}

function recommendGetCount(type) {
    var type = type ? { type } : {};
    return new Promise((res, rej) => {
        Recommend.count(type, function (err, count) {
            if (err) rej(err);
            res(count);
        })
    })
}

exports.recommendSave = recommendSave;
exports.recommendGet = recommendGet;
exports.recommendGetSingle = recommendGetSingle;
exports.recommendGetByTypes = recommendGetByTypes;
exports.recommendGetTypeCount = recommendGetTypeCount;
exports.recommendGetCount = recommendGetCount;