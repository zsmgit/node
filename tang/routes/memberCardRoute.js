var MemberCardDao = require('../dao/memberCartDao');
const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var CustomerDao = require('../dao/customerDao');
                         

var memberCardDao = new MemberCardDao();
var customerDao = new CustomerDao();
//根据会员卡id余额查询
async function getBalanceByCardId(req,res) {
    var id = req.query.id;
    let balance = await memberCardDao.getBalanceByCardId(id);
    
    if(!!balance){
        return res.json(new Response(RES_CONFIG.success,balance,""));
    }
    
    return res.json(new Response(RES_CONFIG.fail,balance,'未查询到余额'));
}
//获取用户会员卡列表
async function findCardList(req,res){
    var openid = req.query.openid;
    //先判断是否已经绑定
    var customer = await customerDao.getByOpenid(openid);
    if(!!customer){
        var cardList = await memberCardDao.findListByOpenid(openid);
        
        if(!!cardList){
            return res.json(new Response(RES_CONFIG.success,cardList,""));
        }
        return res.json(new Response(RES_CONFIG.fail,"","没有会员卡"));
    }
    return res.json(new Response(RES_CONFIG.fail,"","请先绑定"));
}
module.exports = {
    getBalanceByCardId:getBalanceByCardId,
    findCardList:findCardList
}
