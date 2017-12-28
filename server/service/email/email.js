'use strict';
const nodemailer = require('nodemailer');
const promise = require('promise');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.sina.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '<your email>', // generated ethereal user
        pass: '<your password>'  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"rozwel" <rozwel@sina.com>', // sender address
    to: 'shana.wav@gmail.com', // list of receivers
    subject: '测试邮件 ✔', // Subject line
    text: '', // plain text body
    html: '<b>这是一封测试邮件，如果你可以看到文字，以及图片</b><img src="https://www.baidu.com/favicon.ico"/><b>以及链接<a href="https://www.baidu.com">www.baidu.com</a>证明该邮件测试成功：）</b>' // html body
};

let setMailOptions = function (opt) {
    mailOptions.to = opt.to;
    mailOptions.subject = opt.subject;
    mailOptions.text = opt.text;
    mailOptions.html = opt.html;
}

// send mail with defined transport object
let sendEmail = function () {
    return new promise((res, rej) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                rej(false);
            }
            else res({ email: mailOptions.to });
        });
    });
}

exports.setMailOptions = setMailOptions;
exports.sendEmail = sendEmail;