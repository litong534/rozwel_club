var express = require('express');
var router = express.Router();
var url = require('url');
var nimda = require('../service/nimda/nimda');
var common = require('../common/common');
var jwt = require('jwt-simple');
var moment = require('moment-timezone');
var jwtauth = require('../common/jwtauth');
router.use(jwtauth);

router.route('/')
    .post(function (req, res) {
        var salt_pwd = common.getSaltedPwd(req.body.password);
        nimda.nimdaSave(req.body.username, salt_pwd)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    })
    .get((req, res) => {
        var params = url.parse(req.url, true).query;
        nimda.nimdaGet(params.username).then((password) => {
            if (password === common.getSaltedPwd('f2q7i3n8')) {
                var expires = moment().add(5, 'minutes').valueOf();
                var token = jwt.encode({ iss: params.username, expires: expires }, common.getSaltInToken());
                res.json({ code: 200, token: token, expires: expires, user: params.username });
            } else {
                res.json({ code: 402, errText: '用户名或密码错误' });
            }

        }).catch(e => res.json(e));
    });

router.route('/islogined')
    .get((req, res, next) => {
        var token = req.headers['x-access-token'];
        if (token) {
            try {
                var decode = jwt.decode(token, common.getSaltInToken());
                if (decode.expires <= moment().valueOf()) {
                    res.json({ code: 400, errText: 'Access token has expired' });
                }else {
                    res.json({code:200});
                }
            } catch (error) {
                res.json({ code: 401, errText: 'token error' })
            }
        } else {
            res.json({ code: 400, errText: 'No Access token' })
        }
    })
module.exports = router;