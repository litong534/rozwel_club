import * as moment from 'moment';
function checkEmailReg(email) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(email);
}

function checkPasswordReg(pwd) {
    var reg = /^[A-Za-z0-9]{8,20}$/;
    return reg.test(pwd);
}

function checkNickName(name) {
    if (name.length > 10) {
        return false;
    }
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    return !pattern.test(name);
}

function mongoTimeFormat(time, elMode = false) {
    if (elMode) {
        return moment(time).format('YYYY-MM-DD');
    }
    return moment(time).format('YYYY年MM月DD日');
}

function typeFormat(type) {
    switch (type) {
        case 1:
            return 'html';
            break;
        case 2:
            return 'css';
            break;
        case 3:
            return 'js';
            break;
        case 4:
            return 'angularjs';
            break;
        case 5:
            return 'vue';
            break;
        case 6:
            return 'nodejs';
            break;
        case 7:
            return 'webpack';
            break;
        case 8:
            return 'jquery';
            break;
        case 19:
            return 'others';
            break;
        default:
            return 'others';
            break;
    }
}

function getConstellation() {
    return [
        { text: "摩羯座", value: 1 },
        { text: "水瓶座", value: 2 },
        { text: "双鱼座", value: 3 },
        { text: "白羊座", value: 4 },
        { text: "金牛座", value: 5 },
        { text: "双子座", value: 6 },
        { text: "巨蟹座", value: 7 },
        { text: "狮子座", value: 8 },
        { text: "处女座", value: 9 },
        { text: "天平座", value: 10 },
        { text: "天蝎座", value: 11 },
        { text: "射手座", value: 12 },
    ];
}

function getSex() {
    return [
        { text: '女', value: 0 },
        { text: '男', value: 1 },
        { text: '秀吉', value: 2 }
    ];
}

function getUserEmail() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : undefined;
}

function setImageToLS(image) {
    let user = JSON.parse(localStorage.getItem('user'));
    user.image = image;
    localStorage.setItem('user', JSON.stringify(user));
}

export const SERVER_UPLOADS = 'http://47.95.250.143:3001/api/uploads';
// export const SERVER_UPLOADS = 'http://localhost:3001/api/uploads';
export { checkEmailReg, checkPasswordReg, checkNickName, mongoTimeFormat, typeFormat, getConstellation, getSex, getUserEmail, setImageToLS };
