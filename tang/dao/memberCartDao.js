const knex = require('../config/knex');

var MemberCartDao = function(){}

/**
 * 
 * @param {*} id 根据会员卡id余额查询
 */
MemberCartDao.prototype.getBalanceByCardId =async function(id){
    try {
        let balance = await knex.select('balance').from('tf_member_card').where('id',id);
        if(balance.length > 0 ){
            return balance[0];
        }
        
    } catch (error) {
        return false;        
    }
    return false;
}
/**
 * 根据openid 查询会员卡列表
 */
MemberCartDao.prototype.findListByOpenid = async function(openid){
    try{
        let result = await knex.select('*').from('tf_customer as c').leftJoin('tf_member_card as d','c.id','d.customer').leftJoin('tf_member_card_type as t','d.membercardtype','t.id').where({'openid':openid});
        if(result.length >0){
            return result;
        } 
    }catch(err){
        return false;
    }
    return false;       
}
module.exports = MemberCartDao;