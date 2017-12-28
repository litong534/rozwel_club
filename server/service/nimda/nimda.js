var promise = require('promise');
var Nimda = require('../../models/nimda');

function nimdaSave(username,salt_pwd) {
    var nimda = new Nimda();
    nimda.username = username,
    nimda.password = salt_pwd;
    return new Promise((res,rej) => {
        nimda.save(err => {
            if(err){
                rej(err);
            }
            else res('send!');
        })
    })
}

function nimdaGet(username) {
    return new Promise(function(res,rej) {
        Nimda.findOne({'username':username},'password',function(err,obj){
            if(err) rej(err);
            else res(obj.password);
        });
    });
}

exports.nimdaSave = nimdaSave;
exports.nimdaGet = nimdaGet;