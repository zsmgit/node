var https = require('https');
var qs = require('querystring');
var SMS_CONFIG = require('../config/wangyiyun_sms');
var smsUtils = require('../utils/smsUtils');

var wangYiYunSmsDao = {}

wangYiYunSmsDao.sendMsg=function(mobile,callback){
    var post_data = {
        //templateid:SMS_CONFIG.TEMPLATEID,  
        mobile:mobile,
        //由短信平台生成验证码
        codeLen:SMS_CONFIG.CODELEN
    }

    var content = qs.stringify(post_data);
    var CurTime = smsUtils.getCurTime();
    var CheckSum = smsUtils.getCheckSum(CurTime);
    
    var options = {    
        //hostname: "https://api.netease.im",
        hostname:'api.netease.im',    
        //port:'443',  
        path: '/sms/sendcode.action',    
        method: 'POST',    
        headers: {    
            'AppKey'        : SMS_CONFIG.APP_KEY,
            'Nonce'         : SMS_CONFIG.NONCE,  
            'CurTime'       : CurTime,  
            'CheckSum'      : CheckSum,  
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }    
    };    
    var req = https.request(options, (res) => {
        res.setEncoding('utf8');    
        var data = '';
        res.on('data', (chunck) => {
            data += chunck;
        });
        res.on('end',function(){
            callback(JSON.parse(data));            
        });
      });
         
    req.on('error', function (e) {    
        console.log(e.message);    
    });    
    req.write(content);    
    req.end();  
}

wangYiYunSmsDao.checkCode = function(mobile,code,callback){

    var post_data = {
        mobile:mobile,
        code:code
    }
    var content = qs.stringify(post_data);

    var CurTime = smsUtils.getCurTime();
    var CheckSum = smsUtils.getCheckSum(CurTime);

    var options = {
        hostname:"https://api.netease.im",
        path:"/sms/verifycode.action",
        method:'POST',
        headers: {    
            'AppKey'        : SMS_CONFIG.APP_KEY,
            'Nonce'         : SMS_CONFIG.NONCE,  
            'CurTime'       : CurTime,  
            'CheckSum'      : CheckSum,  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',  
        }    
    }
    var req = https.request(options,(res) => {
        res.setEncoding('utf8');
        res.on('data',(data) => {
            callback(JSON.parse(data));
        });
    });
    req.on('error',function(error){
        console.log(e.message);
    });
    req.write(content);
    req.end(); 
}

module.exports = wangYiYunSmsDao;
