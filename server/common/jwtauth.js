var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var common = require('./common');
var moment = require('moment-timezone');
module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, common.getSaltedPwd('<your salt>'));

            if(decoded.iss !== 'rozweladmin') {
                res.send('invalid token', 401);
            }

            if (decoded.exp <= moment().valueOf()) {
                res.send('Access token has expired', 400);
            }

        } catch (err) {
            next();
        }
    } else {
        next();
    }
};