var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var weiXin = require('./routes/weixin');
var memberCardTypeRoute = require('./routes/memberCardTypeRoute');
var memberCardRoute = require('./routes/memberCardRoute');
var payRecordRoute = require('./routes/payRecordRoute');
var serviceProjectRoute = require('./routes/serviceProjectRoute');
var customerRoute = require('./routes/customerRoute');
var wangYiYunSmsRoute = require('./routes/wangYiYunSmsRoute');


var app = express();

app.use(bodyParser.urlencoded({extended:false})); //post
app.use(bodyParser.json());                       //ajax post 
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** 接入验证 */
app.get('/',weiXin.auth);

/**获取验证码 查询参数mobile */
app.post('/getCode',wangYiYunSmsRoute.sendMessage);

/**手机号绑定 查询参数 mobile,code,openid*/
app.post('/bindOpenid',wangYiYunSmsRoute.checkCodeAndBindOpenid);

/**解除手机号绑定 查询参数mobile */
app.post('/unbindOpenid',customerRoute.unbindOpenid);

/** 会员卡列表  查询参数openid*/
app.get('/card/findCardList',memberCardRoute.findCardList);

/**查看会员卡余额 查询参数id*/
app.get('/card/getBalance',memberCardRoute.getBalanceByCardId);

/**查看会员卡的服务项目 查询参数id */
app.get('/card/serviceProject',serviceProjectRoute.findServiceProject);

/**获取会员卡交易流水 查询参数id */
app.get('/card/findPayRecordList',payRecordRoute.findPayRecordList);

app.get('*',(req,res) =>{
      res.end('not found');
})

app.listen('8081',function(){
      console.log('8081');
})

