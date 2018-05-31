const ServiceProjectDao = require('../dao/serviceProjectDao');
const RES_CONFIG = require('../config/res_config');
var  Response = require('../utils/Response');
//根据会员卡id 查询会员卡的服务项目
async function findServiceProject(req,res){
    var cardId = req.query.id;
    var serviceProjectDao = new ServiceProjectDao();
    var result = await serviceProjectDao.findListByCardId(cardId);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,result,''));
    }
    return res.json(new Response(RES_CONFIG.fail,result,'会员卡下没有服务项目'));
}
module.exports = {
    findServiceProject:findServiceProject
}