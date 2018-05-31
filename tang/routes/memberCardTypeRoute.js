var MemberCardTypeDao = require("../dao/memberCardTypeDao");
const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');

/**
 * 查询会员卡类型的子类型
 */
async function findChildrenTypeList(req,res) {

    var parentId = req.query.parent?req.query.parent:0;
    console.log(parentId);

    var memberCardType = new MemberCardType();
    var result = await memberCardTypeDao.findChildrenTypeList(parentId);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,result,'success'));
    }
    return res.json(new Response(RES_CONFIG.fail,result,"没有子类型"));
}

module.exports = {
    findChildrenTypeList:findChildrenTypeList,
}
