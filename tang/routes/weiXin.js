var crypto = require('crypto');  
var url = require('url');  
const config = require('../config/wx_config'); 

var wx_config = require('../config/wx_config');
//公众号接入验证
auth = function(req,res){  
    var query = url.parse(req.url,true).query;  
    var signature = query.signature;  
    var timestamp = query.timestamp;  
    var nonce = query.nonce;  
    var echostr = query.echostr;  
    /**token  */
    if(check(timestamp,nonce,signature,wx_config.token)){  
        res.end(echostr);  
    }else{  
        res.end("It is not from weixin");  
    }  
};  
  
function check(timestamp,nonce,signature,token){  
    var currSign,tmp;  
    tmp = [token,timestamp,nonce].sort().join("");  
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");  
    return (currSign === signature);    
};  

module.exports = {
    auth:auth
}
