import base from '../base';

function sendEmail(email) {
    return base.post('/user/changepwd', {
        email
    });
}

function sendVCode(email, vcode) {
    return base.post('/user/sendvcode', {
        email,
        vcode
    });
}

function register(email, password, nickname) {
    return base.post('/user/register', {
        email,
        password,
        nickname
    });
}

function login(email, password) {
    return base.post('/user/login', {
        email,
        password
    });
}

function commonBase() {
    return base;
}

function isLogined() {
    return base.get('/user/islogined');
}

function getUserData() {
    const email = JSON.parse(localStorage.getItem('user')).email;
    return base.get(`/user/getUserData?email=${email}`);
}

function setUserData(userData) {
    return base.post('/user/setUserData', {
        userData: userData
    });
}

function setUserImage(userData) {
    return base.post('/user/setUserImage', {
        userData: userData
    });
}

export { sendEmail, sendVCode, register, login, commonBase, isLogined, getUserData, setUserData, setUserImage };