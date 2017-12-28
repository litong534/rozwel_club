module.exports = function (app) {
    var rec = require('../api/recommend');
    var uploads = require('../api/uploads');
    var nimda = require('../api/nimda');
    var user = require('../api/user');
    var uploadblog = require('../api/uploadbimage');
    app.use('/api/recommend', rec);
    app.use('/api/uploads', uploads);
    app.use('/api/uploadsb', uploadblog);
    app.use('/api/nimda', nimda);
    app.use('/api/user', user);
};