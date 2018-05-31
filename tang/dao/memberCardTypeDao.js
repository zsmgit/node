const knex = require('../config/knex');

var MemberCardTypeDao = function(){}
/**
 * 
 * @param {*} parentId 根据父id获取会员卡类型的子类型
 */
MemberCardTypeDao.prototype.findChildrenTypeList = async function(){
    //查询一级节点时parentId为默认值0
    var parentId = arguments[0]?arguments[0]:0;

    try{
        var result =await knex('tf_member_card_type').where({parent:parentId}).select(['id','card_type']);
        if(result.length>0){
            return result;
        }
    }catch(error){
        return false;
    }
    return false;
}

module.exports = MemberCardTypeDao