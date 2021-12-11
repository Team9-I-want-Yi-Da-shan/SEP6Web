var t_id;
$(function(){
	FastClick.attach(document.body);
	if(document.all){
		document.onselectstart= function(){return false;};
	}else{
		document.onmousedown= function(){return false;};
		document.onmouseup= function(){return true;};
	}
	document.onselectstart = new Function('event.returnValue=false;');
	document.addEventListener("deviceready", onDeviceReady, false);

	//获取新版本token数据方法，建议使用
	function getTokenTwo(ifLog,fn) {
	    platformInfo.getPlatformToken(function(result) {
	        if (ifLog != false) {
	            alert("onSuccess" + JSON.stringify(result))
	        }
	        tokenSecond = result;	 
	        
	       	$(".swiper-container .swiper-slide:eq(3)").trigger('click');
	        $(".tab_QH .item:eq(0)").trigger('click');
	        $(".swiper-containerpb .swiper-slide:eq(0)").trigger('click');
	    }, function(result) {
	        alert("onFail" + JSON.stringify(result))
	    });
	}

	function onDeviceReady() {
	    getUser(false);
	    getRoutePath(false);
	    getBusiApp(false);
	    getDeviceInfo(false);
	    getTokenTwo(false);
	}
	
	//页面布局样式
	var _height = $(window).height();
	var head_ht = $('.demos-header').outerHeight();
	var footer_ht = $('.footer').outerHeight();
	$('.section').height(_height-head_ht-footer_ht-2.5);

	//格式化时间
	var formatDate = function(myDate){
		var getMonth = myDate.getMonth()*1+1 >= 10? myDate.getMonth()*1+1:"0"+(myDate.getMonth()*1+1)
		var getDate = myDate.getDate()*1 >= 10? myDate.getDate():"0"+myDate.getDate();
		var _formatDate = myDate.getFullYear()+"-"+getMonth+"-"+getDate;
		return _formatDate;
	}
	//时间控件选择
	var creatCalendar = function(maxDate,value){
		$("#date2").attr("placeholder",value);
		$("#date2").attr("value",value);
		$("#date2").calendar({
			input: "#date2",
			maxDate:maxDate,
			dateFormat: 'yyyy-mm-dd',
			value:[value],
			onClose: function (p) {
				t_id = $("#date2").val();
				
				if(t_id != mixDate){
					$('.afDay').css('color','#00b08a');
				} else {
					$('.afDay').css('color','#999');
				}
				var idx_scd=$(".tab_QH .item .bg_color").attr("idx");
				if(idx_scd==1){
					var idx_trd=$(".swiper-containerpb .swiper-slide .bg_color").attr("idx");

					if(idx_trd==1){
						getQbzs();
					}else if(idx_trd==2){
						getYxcl();
					}else if(idx_trd==3){
						getQsfd();
					}else if(idx_trd==4){
						getQssd();
					}else if(idx_trd==5){
						getYdfx();
					}else if(idx_trd==6){
						getPhyc();
					}
					getOffLineNum();
					getOffLineTotal();
					getOffLineBar();

				}else if(idx_scd==2){
					getDayPower();
					getMonthPower();
					getYearPower();
				}else if(idx_scd==3){
					getDayVolume();
					getMonthVolume();
					getYearVolume();
				}
			}
		});
	}


	//时间控件赋值方法
	var inputTime = function(seleTime,type){
		var myDate;
		var seleDate = new Date(seleTime);
		if(type == 2){//后一天
			myDate = new Date(seleDate.getTime()+24*60*60*1000);
		} else {//后一天
			myDate = new Date(seleDate.getTime()-24*60*60*1000);

		}
		var myDatetime = formatDate(myDate);
		$("#date2").attr("value",myDatetime);
		window.setTimeout(function(){$("#date2").calendar("setValue", [myDatetime]);},10);
		t_id = myDatetime;

		if(t_id != mixDate){
			$('.afDay').css('color','#00b08a');
		} else {
			$('.afDay').css('color','#999');
		}
		$(".swiper-container .swiper-slide:eq("+select_index+")").trigger('click');
	}

	var select_index = -1
	var nowTime = new Date();//获取系统当前时间
	var mixDate = formatDate(new Date(nowTime.getTime()-24*60*60*1000))//时间插件的最大时间设置:当天时间的前一天
	//调度日报的取当前日期
	//var mixDate = formatDate(new Date(nowTime.getTime()))//时间插件的最大时间设置:当天时间
	t_id = mixDate;//获取选择的时间
	//时间控件初始化时间
	creatCalendar(mixDate,mixDate);
	$('.afDay').css('color','#999');
	//点击“前一天”按钮	
    $('.proDay').click(function(){
		var selecTime = $("#date2").val();
		inputTime(selecTime,1);
		$('.afDay').css('color','#00b08a');
		var idx_scd=$(".tab_QH .item .bg_color").attr("idx");
		if(idx_scd==1){
			var idx_trd=$(".swiper-containerpb .swiper-slide .bg_color").attr("idx");

			if(idx_trd==1){
				getQbzs();
			}else if(idx_trd==2){
				getYxcl();
			}else if(idx_trd==3){
				getQsfd();
			}else if(idx_trd==4){
				getQssd();
			}else if(idx_trd==5){
				getYdfx();
			}else if(idx_trd==6){
				getPhyc();
			}
			getOffLineNum();
			getOffLineTotal();
			getOffLineBar();
		}else if(idx_scd==2){
			getDayPower();
			getMonthPower();
			getYearPower();
		}else if(idx_scd==3){
			getDayVolume();
			getMonthVolume();
			getYearVolume();
		}
    });
	//点击“后一天”按钮	
	$('.afDay').click(function(){
		var selecTime = $("#date2").val();
		if(selecTime != mixDate){
			inputTime(selecTime,2);
			var idx_scd=$(".tab_QH .item .bg_color").attr("idx");
			if(idx_scd==1){
				var idx_trd=$(".swiper-containerpb .swiper-slide .bg_color").attr("idx");

				if(idx_trd==1){
					getQbzs();
				}else if(idx_trd==2){
					getYxcl();
				}else if(idx_trd==3){
					getQsfd();
				}else if(idx_trd==4){
					getQssd();
				}else if(idx_trd==5){
					getYdfx();
				}else if(idx_trd==6){
					getPhyc();
				}
				getOffLineNum();
				getOffLineTotal();
				getOffLineBar();
			}else if(idx_scd==2){
				getDayPower();
				getMonthPower();
				getYearPower();
			}else if(idx_scd==3){
				getDayVolume();
				getMonthVolume();
				getYearVolume();
			}
			else {
			$('.afDay').css('color','#999');

			}
		}
	});






	//滑动插件
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 2,
		spaceBetween: 0,
		useCSS3Transforms:false
	});
	$(".swiper-container .swiper-slide").css("border-left","1px solid #ddd");
	$(".swiper-container .swiper-slide:eq(0)").css("border-left","0");

	$(".swiper-container").on("click",".swiper-slide",function(){
		$(this).addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
		$(this).find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
		$(this).find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
		select_index = $(this).index()
		//二级导航跳转页面
		if($(this).index()==0){
			
			//$(".section .content").html(html_dlphyc);
			$(".dlph_dlph").show();
			$(".dlph_yxyd").hide();
			getOffLineNum();
			getOffLineTotal();
			getOffLineBar();
			//下端发用电平衡情况滑动
			var swiper = new Swiper('.swiper-containerpb', {
				slidesPerView: 6,
				spaceBetween: 0,
				useCSS3Transforms:false
			});
			$(".swiper-containerpb .swiper-slide").css("border-left","1px solid #ddd");
			$(".swiper-containerpb .swiper-slide:eq(0)").css("border-left","0");

			$(".swiper-containerpb").on("click",".swiper-slide",function(){
				$(this).addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
				$(this).find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
				$(this).find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
				select_index = $(this).index()
				//二级导航跳转页面
				if($(this).index()==0){
					mixedChartsPowerBalance(1,labelpoints);
				} else if($(this).index()==1){
					mixedChartsPowerBalance(2);
				} else if($(this).index()==2){
					mixedChartsPowerBalance(3);
				} else if($(this).index()==3){
					mixedChartsPowerBalance(4);
				}else if($(this).index()==4){
					mixedChartsPowerBalance(5,labelpointsAl);
				}else if($(this).index()==5){
					mixedChartsPowerBalance(6,labelpointsAl);
				}
			})
			$(".swiper-containerpb .swiper-slide:eq(0)").trigger('click');
			
		} else if($(this).index()==1){
			$(".dlph_dlph").hide();
			$(".dlph_yxyd").show();
			//$(".section .content").html(html_yxyd);
			//Chart.createPhRxdqk();
		}
	})
	//底部导航
	$('.footer li').click(function(){
		//样式
		$(this).addClass("active").siblings().removeClass("active");
		//底部一级导航跳转页面
		if($(this).index()==0){

		} else if($(this).index()==1){

		} else if($(this).index()==2){

		} else if($(this).index()==3){

		}
	});
	$(".footer li:eq(3)").trigger('click');
  
   //tab样式
	var tabStyle = function(num){
		$(".tab_QH .item").css({"width":(100/num)+"%"});
		//点击事件
		$(".tab_QH .item").click(function(){
		//样式
		$(this).find(".title").addClass("bg_color");
		$(this).siblings().find(".title").removeClass("bg_color");
		//动画
		select_index = $(this).index()
		//二级导航跳转页面
		if($(this).index()==0){
			
			//$(".section .content").html(html_dlphyc);
			$(".dlph_dlph").show();
			$(".dlph_yxyd").hide();
			getOffLineNum();
			getOffLineTotal();
			getOffLineBar();
			//下端发用电平衡情况滑动
			var swiper = new Swiper('.swiper-containerpb', {
				slidesPerView: 6,
				spaceBetween: 0,
				useCSS3Transforms:false
			});
			$(".swiper-containerpb .swiper-slide").css("border-left","1px solid #ddd");
			$(".swiper-containerpb .swiper-slide:eq(0)").css("border-left","0");

			$(".swiper-containerpb").on("click",".swiper-slide",function(){
				$(this).addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
				$(this).find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
				$(this).find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
				select_index = $(this).index()
				//二级导航跳转页面
				if($(this).index()==0){
					getQbzs();
				} else if($(this).index()==1){
					getYxcl();
				} else if($(this).index()==2){
					getQsfd();
				} else if($(this).index()==3){
					getQssd();
				}else if($(this).index()==4){
					getYdfx();
				}else if($(this).index()==5){
					getPhyc();
				}
			})
			
		} else if($(this).index()==1){
			$(".dlph_dlph").hide();
			$(".dlph_yxyd").show();
			//$(".section .content").html(html_yxyd);
			//Chart.createPhRxdqk();
			getDayPower();
			getMonthPower();
			getYearPower();
		}else if($(this).index()==2){
			$(".dlph_dlph").hide();
			$(".dlph_yxyd").show();
			//$(".section .content").html(html_yxyd);
			//Chart.createPhRxdqk();
			getDayVolume();
			getMonthVolume();
			getYearVolume();
		}
	})
}
tabStyle(3);

})


//停运台数载入
function getOffLineNum() {
	$.showLoading();
	var data = {};
	data.param = {
		"type": "showpie",
		"pietype" : "ty",
		"version" : t_id?t_id:$("#date2").val(),
		"showtime":"00:00:00"

	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,pieChartsOffLineNum);
}
//停运台数回调
function pieChartsOffLineNum(msg){
	$.hideLoading();

	//var msg={data:[{value:2, name:'小修 2'},{value:2, name:'大修 2'},{value:3, name:'临检 3'},{value:13, name:'调停 13'}]};
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	var chartDate=[]
	var count=0;
	for(var i=0;i<msg.data.length;i++){
		count+=msg.data[i].value;

		chartDate.push({name:msg.data[i].name,y:msg.data[i].value})
	}

	// Build the chart
	Highcharts.chart('containerOffLineNum', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		colors:["#93c800","#41c1f6","#5ba4f8","#00cbae"],
		title: {
			style:{fontSize:'14px',color:'#333'},
			text: '停运'+count+'台',
			labels:{
				y:40
			}
			
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
			enabled:true,
			floating: false,
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			},
			symbolWidth:8,
	        symbolHeight:8,
	        symbolRadius:0,//图标圆角为0
	        itemDistance:15,
			//y:-10,
			//margin:20
		},
		plotOptions: {
			pie: {
				allowPointSelect: false,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
     				style:{
     					color:'#666',
     					fontSize:10,
     					fontWeight: 'normal'
     				}
				},
				showInLegend: true,
				marker: {
                    enabled: true
                },
                dataLabels: {
     				enabled: true,
     				style:{
     					color:'#666',
     					fontSize:10,
     					fontWeight: 'normal'
     				}
     			}
			}
		},
		series: [{
			name: '停运台数',
			colorByPoint: true,
			data: chartDate
		}]
	});
}

//停运总量载入
function getOffLineTotal() {
	$.showLoading();
	var data = {};
	data.param = {
		"type": "showpie",
		"pietype" : "rl",
		"version" :  t_id?t_id:$("#date2").val(),
		"showtime":"00:00:00"

	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,pieChartsOffLineTotal);
}
//停运总量回调
function pieChartsOffLineTotal(msg){
	$.hideLoading();
	//var msg={data:[{value:46.5, name:'小修 46.5'},{value:139, name:'大修 139'},{value:192.1, name:'临检 192.1'},{value:451, name:'调停 451'}]};
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	var chartDate=[]
	var count=0;
	for(var i=0;i<msg.data.length;i++){
		count+=msg.data[i].value;

		chartDate.push({name:msg.data[i].name,y:msg.data[i].value})
	}

	// Build the chart
	Highcharts.chart('containerOffLineTotal', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		colors:["#93c800","#41c1f6","#5ba4f8","#00cbae"],
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
			enabled:true,
			floating: false,
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			},
			symbolWidth:8,
	        symbolHeight:8,
	        symbolRadius:0,//图标圆角为0
			itemDistance:15,
			//y:-10,
			//margin:20
		},
		title: {
			style:{fontSize:'14px',color:'#333'},
			text: '停运容量'+count+'万千瓦'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: false,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
     				style:{
     					color:'#666',
     					fontSize:10,
     					fontWeight: 'normal'
     				}
				},
				showInLegend: true,
				marker: {
                    enabled: true
                }
				
			}
		},
		 
		series: [{
			name: '停运容量',
			colorByPoint: true,
			data: chartDate
		}]
	});
}
//全部展示
function getQbzs(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_total",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardQbzs);
}
function forwardQbzs(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(1,msg);
}
//影响出力
function getYxcl(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_yxcl",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardYxcl);
}
function forwardYxcl(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(2,msg);
}
//全省发电
function getQsfd(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_qsfd",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardQsfd);
}
function forwardQsfd(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(3,msg);
}
//全省受电
function getQssd(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_qssd",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardQssd);
}
function forwardQssd(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(4,msg);
}
//用电分析
function getYdfx(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_ydfx",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardYdfx);
}
function forwardYdfx(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(5,msg);
}
//平衡预测
function getPhyc(){
	$.showLoading();
	var data = {};
	data.param = {
		"type": "initdata_phyc",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbCurveInfo.html";
	getTokenToGetData(false,data,forwardPhyc);
}
function forwardPhyc(msg){
	$.hideLoading();
	msg=eval('('+eval('('+msg.data+')').Data[0]+')');
	mixedChartsPowerBalance(6,msg);
}



//发用电平衡情况回调
function mixedChartsPowerBalance(index,data){

	var chartData=[];		//用于封装展示数据的array

	var labelpoints=[];
    var colors=[];
	switch (index){
		case 1:				//全部展示
			chartData.push({type:'area',name: '应留备用', data:data.应留备用});
			chartData.push({type:'area',name: '影响出力', data:data.影响出力});
			chartData.push({type:'area',name: '全省发电', data:data.全省发电});
			chartData.push({type:'area',name: '全省受电', data:data.全省受电});
			chartData.push({type:'spline',name: '全省可用最大', data:data.最大全省可用});
			chartData.push({type:'spline',name: '全省可用最小', data:data.最小全省可用});
			chartData.push({type:'spline',name: '调度用电计划', data:data.调度用电计划});
			chartData.push({type:'spline',name: '调度用电实际', data:data.调度用电实际});
			colors=["#F7EBD5","#CDCBCE","#93CFAD","#94B2CE","#42AC68","#3B6A98","#F6C808","#E71B11"];	
			labelpoints=getLabelpoints(data,index);

			break;
		case 2:				//影响出力
			chartData.push({type:'area',name: '长期影响出力', data:data.长期缺陷及受阻});
			chartData.push({type:'area',name: '临时缺陷受阻', data:data.缺陷及受阻影响});
			chartData.push({type:'area',name: '其他影响出力', data:data["其它影响(人工校正)"]});
			colors=["#DEDEDE","#CECECE","#93CFAD","#B5B5B5"];	
			labelpoints=[];
			break;
		case 3:				//全省发电
			for(var i in data){
				if(i=="全省发电"||i==="时间轴"||i==="正负备用"||i==="应留备用"){
					continue;
				}
				chartData.push({type:'area',name: i, data:data[i]});
			}
			chartData.push({type:'area',name: '最小应留备用', data:data.应留备用});
			colors=["#7BBD9D","#B5DDC7","#44A36B","#95CEAB","#8BCE96","#8BCE96","#6DA473","#9CD6AB"];	
			labelpoints=[];
			break;
		case 4:				//全省受电
			for(var i in data){
				if(i==="全省受电"||i==="时间轴"||i==="正负备用"){
					continue;
				}
				chartData.push({type:'area',name: i, data:data[i]});
			}
			chartData.push({type:'spline',name: '全省受电', data:data.全省受电});
			colors=["#98C7E5","#8AB6D8","#7BADCC","#689DC8","#658CB9","#5384AE","#5083AC","#4172A0"];	
			break;
		case 5:				//用电分析
			chartData.push({type:'spline',name: '调度用电实际', data:data.调度用电实际});
			chartData.push({type:'spline',name: '调度用电预期', data:data.调度用电计划});
			chartData.push({type:'spline',name: '全省可用最小', data:data.最小全省可用});
			chartData.push({type:'spline',name: '全省可用最大', data:data.最大全省可用});

			labelpoints=getLabelpoints(data,index);
			colors=["#32B565","#4A7BAD","#F6C413","#E51D17"];	
			break;
		case 6:				//平衡预测
			chartData.push({type:'area',name: '应留备用', data:data.应留备用});
			chartData.push({type:'area',name: '全省可用最大', data:data.最大全省可用});
			chartData.push({type:'area',name: '全省可用最小', data:data.最小全省可用});
			chartData.push({type:'spline',name: '调度用电实际', data:data.调度用电实际});
			chartData.push({type:'spline',name: '调度用电预期', data:data.调度用电计划});
			colors=["#69D8AD","#6DBF7A","#8DCED8","D1BF4B","#D2685E"];	
			labelpoints=getLabelpoints(data,index);
			break;
		default :
			break;
	}

	var reg="([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d";

	Highcharts.chart('containerMixChart', {
		title: {
			style:{fontSize:'14px',color:'#333'},
			text: '发用电平衡情况'
		},
		plotOptions: {
			area: {
				stacking: 'normal',
				marker: {
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			},
			spline:{
        		lineWidth:1,
        		states:{
        			hover:{
        				lineWidth:1
        			}
        		},
        		marker:{
        			enabled: false,  
					radius: 0
				}
        	}
		},
		colors:colors,
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
			enabled:true,
			floating: false,
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			},
			symbolWidth:8,
	        symbolHeight:8,
	        symbolRadius:0,//图标圆角为0
			itemDistance:15,
			//y:-10,
			//margin:20
		},
		tooltip: {
			shared: true,
			style:{
				color:'#666',
				fontSize:12
			}
		},
		xAxis: {
			categories:data.时间轴,
			tickPositions:[0,23,47,71,95,119,143,167,191,215,239,263,287],
			lineWidth :0,//去掉x轴线
			tickWidth:0,//去掉刻度
			showEmpty:true,
			type: "datetime",
			labels: {
				enable: true,
				formatter: function () {
					var val  = this.value.replace(reg,'');
					if(val.substring(0,1) == 0){
						return val.substring(1,2)
					}else{
						return val.substring(0,2)
					}
				},
				rotation:0
			}
		},
		chart:{
			margin:[140,0,20,0]
		},
		yAxis: {
			title: {
				text: '单位(万千瓦)',
				align:'high',
				rotation:0,
				y:-30,
				x:80,
				style: {
					color:'#666',
					fontSize:10,
				},
			},
			labels: {
				format: '{value}',
				style: {
					color:'#666',
					fontSize:10,
				},
				x:0,
				y:-5,
				align:'left'
			},
		} ,
		annotations:[{
			labelOptions:{
				borderWidth:0,
				style:{
					fontSize:'8px',
				},
			},
			labels: labelpoints
		}],
		series: chartData
	});
}


//全省电力分布载入
function getOffLineBar() {
	$.showLoading();
	var data = {};
	//{"type":"SJChart","version":"2018-12-09"}
	data.param = {
		"type": "SJChart",
		"version" :  t_id?t_id:$("#date2").val(),
	};
	data.url = "/ddrb/home/getDdzbFbCurveInfo.html";
	getTokenToGetData(false,data,containerOffLineBar);
}
//全省电力分布回调
function containerOffLineBar(msg){
	$.hideLoading();
	/*if(eval('('+eval('('+msg.data+')').Data[0]+')')==null){
		 msg={"Data":["{\"WF\":{\"YLBY\":\"173.0\",\"QSYY\":\"8442.8\",\"QSKY\":\"9033.7\",\"QSSD\":\"1338.8\",\"QSYF\":\"7868.0\"},\"ZF\":{\"YLBY\":\"207.8\",\"QSYY\":\"8498.9\",\"QSKY\":\"9145.7\",\"QSSD\":\"1342.6\",\"QSYF\":\"8010.9\"},\"YH\":{\"YLBY\":\"173.7\",\"QSYY\":\"8633.5\",\"QSKY\":\"9077.1\",\"QSSD\":\"1388.6\",\"QSYF\":\"7862.1\"}}"],"Success":true};
	}else{*/
	var dataChar=eval('('+eval('('+msg.data+')').Data[0]+')');
//	}
	//var dataChar=(eval("("+msg.Data+")"));
	var qskyData=[ parseInt(dataChar.ZF.QSKY),parseInt(dataChar.YH.QSKY),parseInt(dataChar.WF.QSKY)];
	var qssdData=[parseInt(dataChar.ZF.QSSD),parseInt(dataChar.YH.QSSD),parseInt(dataChar.WF.QSSD)];
	var qsyfData=[parseInt(dataChar.ZF.QSYF),parseInt(dataChar.YH.QSYF),parseInt(dataChar.WF.QSYF)];
	var qsyyData=[parseInt(dataChar.ZF.QSYY),parseInt(dataChar.YH.QSYY),parseInt(dataChar.WF.QSYY)];
	var ylbyData=[parseInt(dataChar.ZF.YLBY),parseInt(dataChar.YH.YLBY),parseInt(dataChar.WF.YLBY)];
	
	var chart = Highcharts.chart('containerOffLineBar', {
	exporting: {
		enabled:false
	},
	rangeSelector:{
		enabled:false
	},
	credits: {
		enabled: false
	},
	chart: {
		type: 'column',
		margin:[130,10,40,10],
	},
	title: {
		style:{fontSize:'14px',color:'#333'},
		text: '全省早腰晚电力分布'
	},
	legend: {
		layout: 'horizontal',
		align: 'center',
		verticalAlign: 'top',
		y: 30,
		floating: true,
		itemStyle:{
			color:'#666',
			fontSize:10,
			fontWeight: 'normal'
		},
		symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,//图标圆角为0
	},
	colors:["#00B488","#41C1F6","#93C800","#5BA4F5"],
	xAxis: {
		categories: ['早峰', '腰荷', '晚峰'],
		tickWidth:0,
	},
	yAxis: {
		allowDecimals: false,
		min: 0,
		title: {
			text: '单位(万千瓦)',
			align:'high',
			rotation:0,
			y:-30,
			x:75,
			style: {
				color:'#666',
				fontSize:10,
			},
		},
		labels: {
			format: '{value}',
			style: {
				color:'#666',
				fontSize:10,
			},
			x:0,
			y:-5,
			align:'left'
		},
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.x + '</b><br/>' +
				this.series.name + ': ' + this.y + '<br/>';
		},
		style:{
			color:'#666',
			fontSize:12
		}
	},
	plotOptions: {
		column: {
			stacking: 'normal'
		}
	},
	series: [ {
		name: '受电',
		data: qssdData,
		stack: 'male',
		marker: {
            enabled: true
        }
	}, {
		name: '预发',
		data: qsyfData,
		stack: 'male', // stack 值相同的为同一组
		 marker: {
            enabled: true
        }
	},{
		name: '应留备用',
		data: ylbyData,
		stack: 'female'
	}, {
		name: '可用',
		data: qskyData,
		stack: 'female'
	}]
});
}

//获取额外标值
function getLabelpoints(data,index){
	//正备用、副备用、最大值、最小值
	var arr=data.调度用电计划
	var timeline=data.时间轴


	var jhmax=Math.max.apply(null,arr);		//最大计划
	var jhmaxindex=arr.indexOf(jhmax);		//最大计划下标

	var jhmin=Math.min.apply(null,arr);		//最小计划
	var jhminindex=arr.indexOf(jhmin);		//最小计划下标

	var zby=[];
	var fby=[];
	//if(index==1){
		var zdky=data.最大全省可用;
		var zxky=data.最小全省可用;
		for(var i=0;i<zdky.length;i++){
			var c=zdky[i]-arr[i]
			zby[i]=c;
		}
		var zbymin=Math.min.apply(null,zby);	//最小正备用
		var zbyminindex=zby.indexOf(zbymin);		//最小正备用下标

		for(var i=0;i<zxky.length;i++){
			var c=arr[i]-zxky[i]
			fby[i]=c;
		}
		var fbymin=Math.min.apply(null,fby);	//最小负备用
		var fbyminindex=fby.indexOf(fbymin);		//最小负备用下标
	//}

	var labelpoints=[];


	labelpoints.push({point:{xAxis:0,yAxis:0,x:jhmaxindex,y:jhmax},y:50,backgroundColor:'#EE636A',text:"最大值<br>"+timeline[jhmaxindex]+"<br>"+jhmax});
	labelpoints.push({point:{xAxis:0,yAxis:0,x:jhminindex,y:jhmin},y:50,backgroundColor:'#D79608',text:"最小值<br>"+timeline[jhminindex]+"<br>"+jhmin});

	//if(index==1){
		labelpoints.push({point:{xAxis:0,yAxis:0,x:zbyminindex,y:arr[zbyminindex]},y:-50,backgroundColor:'#E75AB6',text:"正备用<br>"+timeline[zbyminindex]+"<br>"+zbymin});
		labelpoints.push({point:{xAxis:0,yAxis:0,x:fbyminindex,y:arr[fbyminindex]},y:-50,backgroundColor:'#FF8329',text:"负备用<br>"+timeline[fbyminindex]+"<br>"+fbymin});
	//}

	return labelpoints;
}

