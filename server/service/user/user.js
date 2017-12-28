const promise = require('promise');
const emailService = require('../email/email');
const EmailVCodeTemp = require('../../models/pwd/emailvcodetemp');
const User = require('../../models/user');
const common = require('../../common/common');
const moment = require('moment-timezone');
function changepwd(email, vcode) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (reg.test(email)) {
        emailService.setMailOptions({
            to: email,
            subject: '罗兹威尔前端俱乐部<修改密码--验证码>',
            text: '您即将修改密码',
            html: '<p><b>感谢光顾本网站^^~！您即将修改密码，验证码是:' + vcode + '</b></p><p><b>如果不是您本人操作，请忽略本邮件</b></p>'
        });

        return emailService.sendEmail();
    }
}

function setVCode(email) {
    let emailvcode = new EmailVCodeTemp();
    emailvcode.email = email;
    emailvcode.vcode = common.MathRand(8);
    emailvcode.create_dt = moment().format('x');
    emailvcode.expire_dt = moment().add(30, 'minutes').format('x');
    return new promise((res, rej) => {
        emailvcode.save(err => {
            if (err) {
                rej(err);
            } else {
                res(emailvcode.vcode);
            }
        })
    })
}

function getVCode(email) {
    return new promise((res, rej) => {
        EmailVCodeTemp.findOne()
            .where('email').equals(email)
            .where('expire_dt').gt(moment().format('x'))
            .sort('-create_dt')
            .limit(1)
            .exec((err, evc) => {
                if (err) {
                    rej(err);
                } else {
                    res(evc.vcode);
                }
            })
    })
}

function register(email, salted_pwd, nickname) {
    let user = new User();
    user.email = email;
    user.password = salted_pwd;
    user.nickname = nickname;
    user.name = '';
    user.image = '';
    user.birth = '';
    user.sex = 0;
    user.constellation = 0;
    user.location = '';
    user.mobile = '';
    user.school = '';
    user.company = '';
    user.create_dt = moment().format('x');
    user.delete_flg = false;
    return new promise((res, rej) => {
        user.save(err => {
            if (err) {
                rej(err);
            }
            res(true);
        })
    })
}

function checkEmail(email) {
    return new promise((res, rej) => {
        User.findOne()
            .where('email').equals(email)
            .exec((err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
    });
}

function login(email) {
    return new promise((res, rej) => {
        User.findOne()
            .where('email').equals(email)
            .exec((err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
    });
}

function getUserData(email) {
    return new Promise((res, rej) => {
        User.findOne()
            .where('email').equals(email)
            .select('email nickname name sex constellation location birth mobile school company')
            .exec((err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
    });
}

function setUserData(userData) {
    return new Promise((res, rej) => {
        User.findOne({ email: userData.email }, function (err, doc) {
            if (err) rej(err);
            doc.nickname = userData.nickname;
            doc.name = userData.name;
            doc.sex = userData.sex;
            doc.birth = userData.birth;
            doc.constellation = userData.constellation;
            doc.location = userData.location;
            doc.mobile = userData.mobile;
            doc.school = userData.school;
            doc.company = userData.company;
            doc.save();
            res({ nickname: userData.nickname });
        });
    });
}

function setUserImg(data) {
    return new Promise((res, rej) => {
        User.findOne({ email: data.email }, function (err, doc) {
            if (err) rej(err);
            doc.image = data.image;
            doc.save();
            res({ code: 200, image: data.image });
        });
    });
}

exports.changepwd = changepwd;
exports.getVCode = getVCode;
exports.setVCode = setVCode;
exports.register = register;
exports.checkEmail = checkEmail;
exports.login = login;
exports.getUserData = getUserData;
exports.setUserData = setUserData;
exports.setUserImg = setUserImg;