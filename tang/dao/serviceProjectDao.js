const knex = require('../config/knex');

var ServiceProjectDao = function(){};
/**
 * 根据会员卡id 查询会员卡的服务项目
 * @param {*} cardId 
 */
ServiceProjectDao.prototype.findListByCardId = async function(cardId){
    try{
        var result = await knex.select('*').from('tf_member_card as card').leftJoin('tf_member_card_type_detail as detail',"card.membercardtype",'detail.card_type').leftJoin('tf_service_project as p','detail.service_project','p.id');
        if(result.length>0){
            return result;
        }
    }catch(error){
        return false;
    }
    return false;
}

module.exports = ServiceProjectDao
