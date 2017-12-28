var express = require('express');
var app = express();
var router = express.Router();
var moment = require('moment-timezone');
var userService = require('../service/user/user');
var common = require('../common/common');
var jwt = require('jwt-simple');
router.route('/changepwd')
    .post((req, res) => {
        const email = req.body.email;
        userService.setVCode(email).then(code => {
            if (code) {
                userService.changepwd(email, code).then(result => {
                    if (result) {
                        res.json(result);
                    }
                }).catch(e => res.json(e));
            }
        })

    });

router.route('/sendvcode')
    .post((req, res) => {
        const email = req.body.email;
        const vcode = req.body.vcode;
        userService.getVCode(email).then(code => {
            if (parseInt(vcode) === parseInt(code)) {
                res.json(true);
            } else {
                res.json(false);
            }
        }).catch(e => res.json(e));
    })

router.route('/register')
    .post((req, res) => {
        const email = req.body.email;
        const salted_pwd = common.getSaltedPwd(req.body.password);
        const nickname = req.body.nickname;
        userService.checkEmail(email).then(result => {
            if (result != null) {
                res.json({ code: 401, errText: '该邮箱已注册' });
            } else {
                userService.register(email, salted_pwd, nickname)
                    .then(result => {
                        if (result) {
                            var expires = moment().add(7, 'days').valueOf();
                            var token = jwt.encode({ iss: email, expires: expires }, common.getSaltInToken());
                            res.json({ code: 200, token: token, expires: expires, user: email });
                        } else {
                            res.json({ code: 400, errText: '注册失败' });
                        }
                    })
                    .catch(e => res.json(e));
            }
        }).catch(e => res.json(e));
    })

router.route('/login')
    .post((req, res) => {
        const email = req.body.email;
        const salted_pwd = common.getSaltedPwd(req.body.password);
        userService.login(email).then(result => {
            if (result != null) {
                if (result.password === salted_pwd) {
                    var expires = moment().add(7, 'days').valueOf();
                    var token = jwt.encode({ iss: email, expires: expires }, common.getSaltInToken());
                    res.json({ code: 200, token: token, expires: expires, user: JSON.stringify({ email: result.email, nickname: result.nickname, image: result.image }) });
                } else {
                    res.json({ code: 402, errText: '用户名或密码错误' });
                }
            } else {
                res.json({ code: 402, errText: '用户名或密码错误' });
            }
        }).catch(e => res.json(e));
    })

router.route('/islogined')
    .get((req, res, next) => {
        const token = req.headers['x-access-token'];
        if (token) {
            try {
                var decode = jwt.decode(token, common.getSaltInToken());
                if (decode.expires <= moment().valueOf()) {
                    res.json({ code: 400, errText: 'Access token has expired' });
                } else {
                    userService.login(decode.iss).then(result => {
                        if (result != null) {
                            var expires = moment().add(7, 'days').valueOf();
                            var token = jwt.encode({ iss: decode.iss, expires: expires }, common.getSaltInToken());
                            res.json({ code: 200, token: token, expires: expires, user: JSON.stringify({ email: result.email, nickname: result.nickname, image: result.image }) });
                        } else {
                            res.json({ code: 402, errText: 'token error' });
                        }
                    });
                }
            } catch (error) {
                res.json({ code: 401, errText: 'token error' })
            }
        } else {
            res.json({ code: 400, errText: 'No Access token' })
        }
    })

router.route('/getUserData')
    .get((req, res, next) => {
        const email = req.query.email;
        userService.getUserData(email).then(result => {
            if (result) {
                res.json(result);
            } else {
                res.json({ code: 400, errText: 'System Error' });
            }
        }).catch(e => res.json(e));
    });

router.route('/setUserData')
    .post((req, res) => {
        const userData = req.body.userData;
        userService.setUserData(userData).then(result => {
            if (result) {
                res.json(result);
            } else {
                res.json({ code: 400, errText: 'System Error' });
            }
        }).catch(e => res.json(e));
    })

router.route('/setUserImage')
    .post((req, res) => {
        const data = req.body.userData;
        userService.setUserImg(data).then(result => {
            if (result) {
                res.json(result);
            } else {
                res.json({ code: 400, errText: 'System Error' });
            }
        }).catch(e => res.json(e));
    })
module.exports = router;