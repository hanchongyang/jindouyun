/**
 * Created by petter on 15/11/28.
 */
function pageScr() {
//	window.onload = function() {
		//	alert($('body .data-table .t_l').width());

		$('body .data-table .t_r').css("margin-left", $('body .data-table .t_l').width());
		var win = $(window),
			scrollAreaEl = $('.t_r_content'),
			leftFreezeEl = $('.t_l_freeze'),
			leftTableEl = leftFreezeEl.find('table'),
			rightTableEl = $('.t_r_t table');
		rightTableContent = $('.t_r_content table');
		//  var tableHeight=0;
		//动态计算容器最大高度
		function adjustHeight() {

			var winHeight = win.height(),
				tableHeight = winHeight - 80; //计算可滑动位置
			leftFreezeEl.height(tableHeight);
			scrollAreaEl.height(tableHeight);

		}

		adjustHeight();
		win.on('resize', adjustHeight);
		//设置iscroll  右表 tabScroll
		var myScroll = new IScroll('.t_r_content', {
			scrollX: true,
			scrollY: true,
			probeType: 3
		});
		//  左表 tabFix
		//var myScroll1 = new IScroll('.t_l_freeze', {
		//  scrollX: false,
		//  scrollY: true,
		//  probeType: 3
		//});

		//阻止默认滚动
		scrollAreaEl.on('touchmove mousewheel', function(e) {
			e.preventDefault();
			//  e.stopPropagation();
		});
		//leftFreezeEl.on('touchmove mousewheel', function(e) {
		//  e.preventDefault();
		//});

		//固定上左表头的滚动
		myScroll.on('scroll', updatePosition);
		//myScroll.on('scrollEnd', updatePositionEnd);

		//myScroll1.on('scroll', updatePosition1);
		//myScroll1.on('scrollEnd', updatePosition1End);

		//	var pubY=0;   //全局变量Y 用于存储两个表格的scrollend时候的Y
		//	var beforeY=0;

		function updatePosition(e) {
			//if(beforeY>this.y){
			//	pubY=this.y-beforeY;
			//}else{
			//	pubY=beforeY+this.y;
			//}
			var a = this.y;
			var b = this.x;
			//  leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
			//  rightTableEl.css('transform', 'translate(' + b + 'px, 0px) translateZ(0px)');
			leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
			rightTableEl.css('transform', 'translate(' + b + 'px, 0px) translateZ(0px)');

			//  console.log(leftTableEl.height()+','+this.y+','+","+(win.height()-115));
			//  console.log(win.height()-115-this.y);
			//  if(leftTableEl.height()==win.height()-115-this.y){
			//  	console.log("加载");
			//  }
			//  rightTableContent.css('transform', 'translate('+b+'px, ' + a + 'px) translateZ(0px)');
		}

		function updatePositionEnd() {
			var a = this.y;
			var b = this.x;
			leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
			rightTableEl.css('transform', 'translate(' + b + 'px, 0px) translateZ(0px)');
			//  return false;
			//  if(a>pubY){
			//  		
			//  }
			//  pubY=a;
			//  beforeY=this.y;
			//  leftContentTop=rightTableContent.css('transform').replace(/[^0-9\-,]/g,'').split(',')[5];//获取当前table 平移距离
			//  console.log(leftContentTop);

		}

		function updatePosition1() {

			var rightContentLeft = rightTableEl.offset().left - 171;
			var a = this.y;
			var b = this.x;
			//  leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
			rightTableContent.css('transform', 'translate(' + rightContentLeft + 'px, ' + a + 'px) translateZ(0px)');
		}

		function updatePosition1End() {
			var rightContentLeft = rightTableEl.offset().left - 171;
			var a = this.y;
			var b = this.x;
			//  leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
			rightTableContent.css('transform', 'translate(' + rightContentLeft + 'px, ' + a + 'px) translateZ(0px)');
			//  leftContentTop=leftTableEl.css('transform').replace(/[^0-9\-,]/g,'').split(',')[5];//获取当前table 平移距离
			pubY = a;
			//   console.log(leftContentTop);
		}
	}
//}