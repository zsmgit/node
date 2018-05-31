module.exports = {
    "appID":"wxc4f7923afd2d2586",
    "appScrect":"86bc3edd8089d89e518f8e37100162b0",
}
//"access_token": "9_OSs4dtxb8G-I6jxl4SotWnlvYgoazwISLKygzb1wegtcm0Ymev_EdsMo2vuPIrZ5GOJBLXYE4_B3B6nH09c8j1jDORSK1eTW1JAiUS0YhQ7Wiu9GRxwlHhegOJUKwg1cyS9KxozxZgq9js35AUTeADATNM"
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc4f7923afd2d2586&secret=86bc3edd8089d89e518f8e37100162b0

//test account:
// 'appID':'wxf3c5c2ce368f14ee','appsecret':'29a8ef2bab88bbc8382fc71cc606736b'

//url :208gq50113.51mypc.cn
//获取code的接口 参考：https://segmentfault.com/a/1190000005921102
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
//REDIRECT_URI:回调接口
//redirect_uri就是授权成功后需要跳转到的链接。回调接口后面会加上code=
//response_type是固定的就是code。
//scope就是授权权限，主要有两种：snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）。
   
   
// "encodingAESKey":"afPsLj0rV0yGBtZRyWpGWTGFgsrvI40XBCZrnwUURFk",
//"apiDomain":"https://api.weixin.qq.com/",
//"apiURL":{
//    "accessTokenApi":"%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
//   "createMenu":"%scgi-bin/menu/create?access_token=%s"
//}