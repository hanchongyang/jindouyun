//  ============================================================== 
//  = *********************两个数组 其内的数值相加方法************************************* = 
//  ============================================================== **********************************************************
function sumArray(array1, array2) {
	var length = array1.length - array2.length;
	var absLength = Math.abs(length);
	if(length >= 0) {
		array2 = comPare(array2, absLength);
	} else {
		array1 = comPare(array1, absLength);
	}

	var c = zipSum(array1, array2);
	return c;
}

function comPare(small, absLength) {
	var newArray = [];
	for(var i = 0; i < absLength; i++) {
		newArray.push(0);
	}

	return small.concat(newArray);
}

function zipSum(a, b) {
	return a.length ? [a.shift() + b.shift()].concat(zipSum(a, b)) : []
}

//  ============================================================== 
//  = *********************要滑动某个滑块滑动，禁止页面滑动************************************* = 
//  ============================================================== *******************

function divScroll(div) {
	//	div.addEventListener("touchstart",function(e){
	//		
	//	})
	//	div.addEventListener("swiperight", function(e) { //滑动折线图时禁止页面滑动
	//		alert("a");
	//		return false;
	//		e.stopPropagation();
	//	}, false)

	//判断手指滑动方向
	//	var startx, starty;
	//  //获得角度
	//  function getAngle(angx, angy) {
	//      return Math.atan2(angy, angx) * 180 / Math.PI;
	//  };
	// 
	//  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
	//  function getDirection(startx, starty, endx, endy) {
	//      var angx = endx - startx;
	//      var angy = endy - starty;
	//      var result = 0;
	// 
	//      //如果滑动距离太短
	////      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
	////          return result;
	////      }
	// 
	//      var angle = getAngle(angx, angy);
	//      if (angle >= -135 && angle <= -45) {
	//          result = 1;
	//      } else if (angle > 45 && angle < 135) {
	//          result = 2;
	//      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	//          result = 3;
	//      } else if (angle >= -45 && angle <= 45) {
	//          result = 4;
	//      }
	// 
	//      return result;
	//  }
	//  //手指接触屏幕
	//  div.addEventListener("touchstart", function(e) {
	//      startx = e.touches[0].pageX;
	//      starty = e.touches[0].pageY;
	//  }, false);
	//  //手指离开屏幕
	//  div.addEventListener("touchend", function(e) {
	//      var endx, endy;
	//      endx = e.changedTouches[0].pageX;
	//      endy = e.changedTouches[0].pageY;
	//      var direction = getDirection(startx, starty, endx, endy);
	//      switch (direction) {
	//          case 0:
	////              alert("未滑动！");
	//              break;
	//          case 1:
	////              alert("向上！")
	//              break;
	//          case 2:
	////              alert("向下！")
	//              break;
	//          case 3:
	//              alert("向左！")
	//
	//e.stopPropagation();
	//              break;
	//          case 4:
	////              alert("向右！")
	//e.stopPropagation();
	//              break;
	//          default:
	//      }
	//  }, false);
	mui("#chicang-chart").off();
}

//  ============================================================== 
//  = *********************switchTab  切换选项卡************************************* = 
//  ============================================================== *******************
function switchTab(filterBtn) {
	for(var i = 0; i < filterBtn.length; i++) {
		filterBtn[i].index = i;
		filterBtn[i].addEventListener("tap", function() {
			for(var i = 0; i < filterBtn.length; i++) {
				filterBtn[i].className = "active-no";
			}
			filterBtn[this.index].className = "active";
		})
		//		filterBtn[i].onclick = function() {}     //ios 300ms延迟
	}
}

//  ============================================================== 
//  = *********************rem设置，自适应大小************************************* = 
//  ============================================================== *******************
(function() {
	function w() {
		var r = document.documentElement;
		var a = r.getBoundingClientRect().width;
		a > 750 && (a = 750), rem = a / 7.5, r.style.fontSize = rem + "px"
	}
	var t;
	w(), window.addEventListener("resize", function() {
		t && clearTimeout(t), t = setTimeout(w, 300)
	}, false)
})();

//  ============================================================== 
//  = *********************表格  列表 表头点击排序  扩展至 ---> 前4列固定************************************* = 
//  ============================================================== *******************

//var tbody = document.querySelector('#tableSort').tBodies[0];
//var th = document.querySelector('#tableSort').tHead.rows[0].cells;
//var td = tbody.rows;    //获取表格的所有的行信息，以数组形式集合

function clickTheadSort(th, tbody) {
	for(var i = 0; i < th.length; i++) {
		th[i].flag = 1;
		th[i].addEventListener("tap", function() {
			for(var i = 0; i < th.length; i++) { //图标 up/down
				th[i].getElementsByTagName("use")[0].href.baseVal = "#icon-paixu";
			}
			removeAlldom(tbodyFix);
			sort(this.getAttribute('data-type'), this.flag, this.cellIndex, tbody, td, tbodyFix);
			this.flag = -this.flag; //     正序／倒序
			if(this.flag == 1) {
				this.getElementsByTagName("use")[0].href.baseVal = "#icon-paixu-down";
			} else {
				this.getElementsByTagName("use")[0].href.baseVal = "#icon-paixu-up";
			}
		})
	};
}

function sort(str, flag, n, tbody, td, tbodyFix, tbodyScroll) {
	//	console.log(n);
	var arr = []; //存放DOM
	var arr2; //另一个表格 被冻结表
	var arr3; //另一表格，可移动
	for(var i = 0; i < td.length; i++) {
		arr.push(td[i]);
	};
	//排序
	arr.sort(function(a, b) {
		return method(str, a.cells[n].innerHTML, b.cells[n].innerHTML) * flag;
	});
	//添加
	for(var i = 0; i < arr.length; i++) {
		tbody.appendChild(arr[i]); //改变排序之后的表格
		arr2 = arr[i].cloneNode(true); //克隆tr表格每行的信息
		arr3 = arr[i].cloneNode(true);
		var frozenTd = arr2.getElementsByTagName("td"); //冻结表的节点
		var scrollTd = arr3.getElementsByTagName("td"); //移动表的节点
		for(var j = 0; j < frozenTd.length; j++) {
			arr2.removeChild(frozenTd[4]); //因为删除节点后，之前的5->4,所以恒定删除4,就可以达到删除4之后的目的
		}
		for(var e = 0; e < 4; e++) {
			arr3.removeChild(scrollTd[0]);
		}
		tbodyFix.appendChild(arr2); //生成冻结表
		tbodyScroll.appendChild(arr3);
	};
};

//排序方法

function method(str, a, b) {
	switch(str) {
		case 'num': //数字排序
			return a - b;
			break;
		case 'string': //字符串排序
			return a.localeCompare(b);
			break;
		default: //日期排序，IE8下'2012-12-12'这种格式无法设置时间，替换成'/'
			return new Date(a.split('-').join('/')).getTime() - new Date(b.split('-').join('/')).getTime();
	};
};

function removeAlldom(elem) {
	while(elem.hasChildNodes()) //当elem下还存在子节点时 循环继续  
	{
		elem.removeChild(elem.firstChild);
	}
}

//  ============================================================== 
//  = *********************初始化时 表格滑动 前4列固定************************************* = 
//  ============================================================== *******************

//  ============================================================== 
//  = *********************定时刷新   获取第一次刷新时间************************************* = 
//  ============================================================== *******************
function firstTime() {
	var newdate = new Date();
	var currentTime = newdate.toLocaleTimeString();
	var cH = newdate.getHours();
	var cM = newdate.getMinutes();
	var cS = newdate.getSeconds();
	var remainingTime = 3600 * cH + 60 * cM + cS; //今天已将过去的时间
	var refreshTime = 5 * 60; //刷新机制时间
	var firstTimeOut; //打开app后下一次刷新时间
	if(remainingTime > refreshTime) {
		firstTimeOut = refreshTime - (remainingTime % refreshTime);

	} else if(remainingTime == refreshTime) {

	} else {
		firstTimeOut = refreshTime - remainingTime;
	}
	console.log(firstTimeOut);
	return firstTimeOut;
}

//  ============================================================== 
//  = ********************ajax 通用************************************* = 
//  ============================================================== *******************
function creatOpt(url, data, success,error) {
	var opt = {
		url: 'http://192.168.45.14:8080/EShopRESTfulWS/rest/DataFlat/' + url,
		data: data,
		type: 'GET',
		ansyc: 'false',
		success: success,
		error: error

	}
	return opt;
}