var knex = require('../config/knex');
var MessageRecordDao = function(){
   
}
/**
 * 
 * @param {*} message 发送成功，添加短信记录 
 */
MessageRecordDao.prototype.add =async function(message){
    
    try{
        let id = await knex('tf_messagerecord').returning('id').insert(message);
        return id;
    }catch(err){
        return false;
    }
}
/**
 * 根据手机号查询验证码
 * @param {*} mobile 
 */
MessageRecordDao.prototype.getByMobile =async function(mobile){
    try{
        let result = await knex('tf_messagerecord').where({
            mobile:mobile
        }).select('code');
        if(result.length>0){
            return result[0];
        }
    }catch(err){
        return false;
    }
    return false;
}

MessageRecordDao.prototype.deleteByMobile =async function(mobile){
    try{
        let result = await knex('tf_messagerecord').where({mobile:mobile}).del();
        return result;
    }catch(err){
        return false;
    }
}
module.exports = MessageRecordDao