//  ============================================================================================================================================================================================================================================================================================================================== 
//  封装ajax函数
//{string opt.type    		http连接方式,包括GET和POST,默认GET
//{string} opt.url      			发送请求的地址
//{boolean} opt.ansyc		异步加载/同步加载   true/false
//{object} opt.data			发送的参数
//{function} opt.success 	ajax成功回调
//{function} opt.error		ajax失败回调
//} 
//  ============================================================================================================================================================================================================================================================================================================================== 
 function ajax(opt){
// 	console.log("c");
	opt = opt || {};
	var type = opt.type || 'GET';
	type = type.toUpperCase() || 'GET'; //转换为大写
	var url=opt.url || '';
	var async = opt.async||'true';
	var data=opt.data||null;
	var success=opt.success||function(){};
	var error=opt.error||function(){};
	var xmlHttp=null;
	if(XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{
		xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	var params=[];
	for(var key in data){
		params.push(key + '=' + data[key]);
	}
	var dataStr = params.join('&');
	if(type == 'POST'){
		xmlHttp.open(type,url,async);
		xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		xmlHttp.send(dataStr);
	}else{
		xmlHttp.open(type,url+'?'+dataStr,async);
		xmlHttp.send(null);
	}
	xmlHttp.onreadystatechange=function(){
//		console.log("d");
//		console.log(xmlHttp.readyState);
//		console.log(xmlHttp.status);
		
		if(xmlHttp.readyState==4&&xmlHttp.status==200){
//			console.log("e");
//			console.log(xmlHttp.responseText);
		var json=jsonchange(xmlHttp.responseText);
//			if(json.code==200){
				　success(json);
//			}else{
//					error(json)	;
//			}
		}
	}
}
// 判断对象是否需要解析
function jsonchange(data) {
	var dataObjiect;
//	if(data instanceof Object && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
	if(typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
		dataObjiect = data;
	} else {
		dataObjiect = JSON.parse(data);
	}
	return dataObjiect;
}