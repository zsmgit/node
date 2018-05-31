var UUID = require('uuid');
var wangYiYunSmsDao = require('../dao/wangYiYunSmsDao');
var RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var MessageRecordDao = require('../dao/messageRecordDao');
var CustomerDao = require('../dao/customerDao');
var messageRecordDao = new MessageRecordDao();
var customerDao = new CustomerDao();
/**
 * 获取验证码
 * @param {*} req 
 * @param {*} res 
 */
async function sendMessage(req,res){
    var mobile = req.query.mobile;

    if(!!mobile){
        wangYiYunSmsDao.sendMsg(mobile,async function(data){
            if(data.code == 200){
                var id =UUID.v1();
                var sendid = data.msg;
                var code = data.obj;
                var sendTime = (new Date()).getTime();
                var sendMsg = {
                    id:id,
                    sendid:sendid,
                    mobile:mobile,
                    code:code,
                    sendTime:sendTime
                };
                //添加一条向短信平台发送记录
                var result = await messageRecordDao.add(sendMsg);
                if(!!result){
                    console.log('添加短信记录成功');
                }
            }
            return res.json(new Response(RES_CONFIG.fail,"","获取验证码失败"));
        });
        return ;
    }
    return res.json(new Response(RES_CONFIG.Response,"","请输入手机号"));
}
/**
 * 校验验证码,并绑定用户和openid
 * @param {*} req 
 * @param {*} res 
 */
async function checkCodeAndBindOpenid(req,res){
    var mobile = req.query.mobile;
    var code = req.query.code;
    var openid = req.query.openid;
    
    console.log(mobile+code+openid);
    if(!!mobile && !!code){
        var codeObj = await messageRecordDao.getByMobile(mobile);
        var vcode = codeObj.code;

        messageRecordDao.deleteByMobile(mobile);
        
        if(!!vcode){
            //校验成功,绑定用户
            if(vcode == code){
                var result = await customerDao.bindOpenid(mobile,openid);
                console.log(result);
                if(!!result){
                    return res.json(new Response(RES_CONFIG.success,'',"绑定成功"));
                }
                return res.json(new Response(RES_CONFIG.fail,"","绑定失败"));
            }
        }
        return res.json(new Response(RES_CONFIG.fail,"","验证码不正确")); 
    }
    return res.json(new Response(RES_CONFIG.fail,"","手机号或验证码不正确"));
}
module.exports = {
    sendMessage:sendMessage,
    checkCodeAndBindOpenid
}