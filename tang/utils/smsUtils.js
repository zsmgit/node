var sha1 = require('sha1');
var SMS_CONFIG = require('../config/wangyiyun_sms');
/**
 * 生成验证码：数字与字母
 */
function getVerifyCode(){
    var vcode = Math.floor(Math.random()*999999+111111).toString(16).substr(0,4);
    return vcode;
}

function getCurTime(){
    return parseInt((new Date()).getTime() / 1000)+"";
}

function getCheckSum(curTime){
    var str1 = SMS_CONFIG.APP_SECRET+SMS_CONFIG.NONCE+curTime;
    var checkSum=sha1(str1);  
    return  checkSum;
}
module.exports = {
    getVerifyCode:getVerifyCode,
    getCurTime:getCurTime,
    getCheckSum:getCheckSum
}