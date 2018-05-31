const knex = require('../config/knex');
const PageBean = require('../utils/pageBean');

var PayRecordDao = function(){}

/**
 * 根据会员卡id查询交易流水
 * @param {*} memberCardId 会员卡id
 */
PayRecordDao.prototype.findAllByCardId =async function(memberCardId){
    try {
        let result = await knex('tf_pay_record').where({memberid:memberCardId}).select('*');
        if(result.length >0){
            return result;
        }
    } catch (error) {
        return false;
    }
    return false;
}

/**
 * 根据openid查询用户所有会员卡交易记录
 * @param {*} openid 
 */
PayRecordDao.prototype.findAllByOpenid = async function(openid){
    
    try {
        let rows = await knex.select('*').from('tf_member_card as card').leftJoin('tf_pay_record as record','card.id','record.memberid').where('record.openid',openid);
        if(rows.length>0){
            return rows;
        }
    } catch (error) {
        return false;
    }
    return false;
}
/**
 * 根据openid分页查询交易记录
 * @param {*} openid 
 * @param {*} currentPage 
 * @param {*} pageSize 
 */
PayRecordDao.prototype.findPayRecordList = async function(openid,currentPage,pageSize){
    try {
        if(!currentPage || currentPage<0){
            currentPage = 1;
        }
        var pageBean = new PageBean(currentPage,pageSize);
        var beginPage = pageBean.calcBeginPage(); 
        //total pageNum        
        let total = await knex.select(count('*')).from('tf_member_card as card').leftJoin('tf_pay_record as record','card.id','record.memberid').where('record.openid',openid);
        //page data
        let rows = await knex.select('*').from('tf_member_card as card').leftJoin('tf_pay_record as record','card.id','record.memberid').where('record.openid',openid).limit(pageSize).offset(beginPage);
        if(rows.length>0){
            pageBean.total = total;
            pageBean.rows = rows;
            pageBean.currentPage = currentPage;
            return pageBean;
        }
    } catch (error) {
        return false;
    }
    return false;
        
}
module.exports = PayRecordDao;