var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
router.route('/').post(function (req, res) {
  // 获得文件的临时路径
  var form = new formidable.IncomingForm();
  form.uploadDir = '/home/tmp';
  // form.uploadDir = 'E:\\tmp\\';
  form.parse(req, function (err, fields, files) {
    var tmp_path = files.file.path;
    var target_path = '/var/www/uploads/images/' + files.file.name;
    fs.rename(tmp_path, target_path, function (err) {
      if (err) throw err;
      let imgpath = 'http://<hosts>/uploads/images/' + files.file.name;
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function () {
        if (err) throw err;
        res.json({ status: 1, datas: imgpath });
      });
    });
  });
});
module.exports = router;