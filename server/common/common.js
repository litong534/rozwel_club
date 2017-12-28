const moment = require('moment');
const SALT = '<your salt>';
const SALT2 = '<your salt>';
const utils = require('utility');
function getSaltedPwd(pwd) {
    return utils.md5(pwd + SALT, 'base64');
}

function MathRand(num) {
    var Num = "";
    for (var i = 0; i < num; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

function getSaltInToken(){
    return utils.md5(SALT2, 'base64');
}

exports.MathRand = MathRand;
exports.getSaltedPwd = getSaltedPwd;
exports.getSaltInToken = getSaltInToken;