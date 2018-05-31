const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var CustomerDao = require('../dao/customerDao');
var customerDao = new CustomerDao();
//解除手机号绑定
async function unbindOpenid(req,res) {
    var mobile = req.query.mobile;

    var result = customerDao.unbindOpenid(mobile);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,'',"解除绑定成功"));    
    }
    return res.json(new Response(RES_CONFIG.fail,"","解除绑定失败"));
}
module.exports = {
    unbindOpenid:unbindOpenid
}