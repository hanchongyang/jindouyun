//  ============================================================================================================================================================================================================================================================================================================================== 
//  封装ajax函数
//{string opt.type    		http连接方式,包括GET和POST,默认GET
//{string} opt.url      			发送请求的地址
//{boolean} opt.ansyc		异步加载/同步加载   true/false
//{object} opt.data			发送的参数
//{function} opt.success 	ajax成功回调
//{function} opt.error		ajax失败回调
//} 
//delayBol		访问内网，wifi下面会迅速返回xmlHttp.readyState和xmlHttp.status;当判断status，不为200，为非内网环境
//delayTime     但是4G网络下	事件onreadystatechange长时间未响应，延时时间为设置为delayTime
//  ============================================================================================================================================================================================================================================================================================================================== 
function ajax(opt) {
	// 	console.log("c");
	opt = opt || {};
	var type = opt.type || 'GET';
	type = type.toUpperCase() || 'GET'; //转换为大写
	var url = opt.url || '';
	var async = opt.async || 'true';
	var data = opt.data || null;
	var success = opt.success || function() {};
	var error = opt.error || function() {};
	var xmlHttp = null;
	var delayBol = true;
	var delayTime = 5000;
	if(XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	var params = [];
	for(var key in data) {
		params.push(key + '=' + data[key]);
	}
	var dataStr = params.join('&');
	if(type == 'POST') {
		xmlHttp.open(type, url, async);
		xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		xmlHttp.send(dataStr);
	} else {
		xmlHttp.open(type, url + '?' + dataStr, async);
		console.log('发送');

		xmlHttp.send(null);
	}

	xmlHttp.onreadystatechange = function() {
		console.log("d");
		console.log(xmlHttp.readyState);
		console.log(xmlHttp.status);

		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var json = jsonchange(xmlHttp.responseText);　
			success(json);

		}
		if(xmlHttp.status != 200) {
			error();
		}
	}
	setTimeout(function() {
		//为4时代表请求完成了    
		if(xmlHttp.readyState != 4) {
			//关闭请求
			xmlHttp.abort();
			//暂停一个HttpRequest的请求发送或者HttpResponse的接收，并且将XMLHttp Request对象设置 为初始化状态。
			//发现已经返回到error函数里
		}
	}, delayTime);
}
// 判断对象是否需要解析
function jsonchange(data) {
	var dataObjiect;
	//	if(data instanceof Object && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
	if(typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
		dataObjiect = data;
	} else {
		console.log(data);
		dataObjiect = JSON.parse(data);
	}
	return dataObjiect;
}