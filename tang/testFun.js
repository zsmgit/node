var knex = require('./config/knex');
var MemberCardDao = require('./models/memberCartDao');
var Response = require('./utils/Response');
var PayRecordDao = require('./models/payRecordDao');
var ServiceProjectDao = require('./models/serviceProjectDao');
var PageBean = require('./utils/pageBean');
var CustomerDao = require('./models/customerDao');
var UUID = require('uuid');
var smsUtils = require('./utils/smsUtils');
var wangYiYunSmsDao = require('./models/wangYiYunSmsDao');


var MessageRecordDao = require('./models/messageRecordDao');
var messageRecordDao = new MessageRecordDao();
var memberCardDao = new MemberCardDao();
var payRecordDao = new PayRecordDao();
var customerDao = new CustomerDao();


async function testArguments(openid){
    var page = arguments[1];
    var pageSize = arguments[2];
    if(page && pageSize){
        console.log(page +" "+pageSize);
    }else{
        console.log('not page');
    }
    
}
function testCallBack(callback){
    var data = 'data';
    return callback(data);
}
async function test(){
    var result =  testCallBack(function callback(data){
        return data;
    })
    console.log(result);
    
}

async function updateTest(){
   // console.log(UUID.v1());
   // const curTime =smsUtils.getCurTime();
    //console.log(curTime);
    //console.log(smsUtils.getCheckSum(curTime));
    var result =await messageRecordDao.deleteByMobile('174');
    var result1 = await messageRecordDao.add({id:'2',sendid:'2',mobile:'123',code:'123'});
    console.log(result1);
    var result2 = await customerDao.bindOpenid('123','22');
    console.log(result2);
}
//test();
updateTest();
// testArguments(12,null,2);

