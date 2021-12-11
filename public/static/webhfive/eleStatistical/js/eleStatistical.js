$(function(){
	FastClick.attach(document.body);
	if(document.all){
		document.onselectstart= function(){return false;};
	}else{
		document.onmousedown= function(){return false;};
		document.onmouseup= function(){return true;};
	}
	document.onselectstart = new Function('event.returnValue=false;');
	
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
	        	
	        	if(select_index == 0){
	        		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				qsfsyQuery(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
	        		
	        	}if(select_index == 1){
	        		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				areaQuery(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
	        		areaQuery(t_id)
	        	}else if(select_index == 2){
	        		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				electrical(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
		      		electrical(t_id)
		      	}else if (select_index == 3) {
		      		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				grid(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
		      		
		      	}else if (select_index == 4) {
		      		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				bigUnit(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
		      		
		      	}else if (select_index == 5) {
		      		platformInfo.getPlatformToken(function(result) {
	    				tokenSecond = result;
	    				coalDep(t_id);
	    			}, function(result) {
	    				alert("onFail" + JSON.stringify(result))
	    			});
		      		
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
			$('.afDay').css('color','#666');
		}
		
    	if(select_index == 0){
    		platformInfo.getPlatformToken(function(result) {
				
				tokenSecond = result;
				qsfsyQuery(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		
    	}if(select_index == 1){
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				areaQuery(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		
    	}else if(select_index == 2){
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				electrical(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
      		
      	}else if (select_index == 3) {
      		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				grid(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
      		
      	}else if (select_index == 4) {
      		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				bigUnit(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
      		
      	}else if (select_index == 5) {
      		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				coalDep(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
      		
      	}
	}
	
	var select_index = -1	
	var nowTime = new Date();//获取系统当前时间
	var mixDate = formatDate(new Date(nowTime.getTime()-24*60*60*1000))//时间插件的最大时间设置:当天时间的前一天
	//var mixDate = formatDate(new Date(nowTime.getTime()))//时间插件的最大时间设置:当天时间
	var t_id = mixDate;//获取选择的时间
	//时间控件初始化时间
	creatCalendar(mixDate,mixDate);
	$('.afDay').css('color','#999');
	//点击“前一天”按钮	
	$('.proDay').click(function(){
		var selecTime = $("#date2").val();
		inputTime(selecTime,1);	
		$('.afDay').css('color','#00b08a');
		
		
	});
	//点击“后一天”按钮	
	$('.afDay').click(function(){
		var selecTime = $("#date2").val();
		if(selecTime != mixDate){
			inputTime(selecTime,2);
		} else {
    		$('.afDay').css('color','#999');

		}	
		
	});
	
	
    var swiper = new Swiper('.swiper-container', {
	    slidesPerView: 4.5,
	    spaceBetween: 0,
	    useCSS3Transforms:false
    });
    $(".swiper-container .swiper-slide").css("border-left","1px solid #ddd")
    $(".swiper-container .swiper-slide:eq(0)").css("border-left","0")
	var dcdlDatas = [];		
	$(".swiper-container").on("click",".swiper-slide",function(){
    	$(this).addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
    	$(this).find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
    	$(this).find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
    	select_index = $(this).index()
    	if($(this).index() == 0){
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				qsfsyQuery(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$('.province').show();
    	}else if($(this).index() == 1){
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				areaQuery(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$('.areaElec').show();
    	}else if($(this).index() == 2){
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				electrical(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$(".electrical").show();
    	}else if ($(this).index() == 3) {
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				grid(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$(".grid").show();
    	}else if ($(this).index() == 4) {
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				bigUnit(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$('.bigUnit').show();
    	}else if ($(this).index() == 5) {
    		$('.electric').hide();
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				coalDep(t_id)
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
    		$(".saveCoal").show();
    	}
    })

})
function initValues(val){
    if(typeof(val) == "undefined" || val.length == 0 || val == "" || val =="undefined") {
        return "-"
    }else if(typeof(val) == 'number'){
        return val;
    }else{
        return val;
    }
}
function initValuesForEchart(val){
    if(typeof(val) == "undefined" || val.length == 0 || val == "" || val =="undefined" || isNaN(val)) {
        return 0;
    }else if(typeof(val) == 'number'){
        return val;
    }else{
        return val;
    }
}
//存煤
function coalDep(t_id){
	$.showLoading("正在加载...");
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectCoalDepositDetail.html",
		data:{
			sb_DATE:t_id,
			t_id:t_id
			}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(msg) {
	    	 var data = msg.data;
	    	 var kydays=[];
	    	 var dqcml=[];
	    	 var simName=[];
	    	 var nums = 0
	    	 var nums1 = 0
	    	 var echarts_heigh = window.innerHeight*0.7
	 		 $(".saveCoal .echarts_dcdl_fu").css("height",echarts_heigh)
	     	 $(".saveCoal #echarts_cm").css("height",echarts_heigh)
	     	 if($(window).width()){
	     		$(".saveCoal .echarts_dcdl_fu").css("width",$(window).width());
	        	$(".saveCoal #echarts_cm").css("width",$(window).width());
	     	 }
	    	 $("#jzNum").html(initValue(msg.jzNum)+'<span class="dw">台</span>');
	    	 $("#zjrl").html(initValue(msg.zjrl)+'<span class="dw">万千瓦</span>');
	    	 $("#jm").html(initValue(msg.jm)+'<span class="dw">万吨</span>');
	    	 $("#kc").html(initValue(msg.kc)+'<span class="dw">万吨</span>');
	    	 $("#hm").html(initValue(msg.hm)+'<span class="dw">万吨</span>');
	    	 $("#day").html(initValue(msg.day)+'<span class="dw">天</span>');
	    	 $("#qmtjts").html(initValue(msg.qmtjts)+"台");
	    	 $("#qmtjrl").html(initValue(msg.qmtjrl)+"万千瓦");
	    	 $("#qts").html(initValue(msg.qts)+"台");
	    	 $("#qrl").html(initValue(msg.qrl)+"万千瓦");
	    	 $("#sts").html(initValue(msg.sts)+"台");
	    	 $("#srl").html(initValue(msg.srl)+"万千瓦");
	    	 for(var k = 0;k < data.length;k++){
	    		 var nowData=data[k];
	    		 kydays.push((nowData.days!="")?nowData.days*1:0);
	    		 dqcml.push((nowData.cml!="")?nowData.cml*1:0);
	    		 simName.push(nowData.simple_name);
	    		 if(nowData.days ==""){
	    			 nums++
	    		 }
	    		 if(nowData.cml ==""){
	    			 nums1++
	    		 }
	    	 }
	    	 if(data.length == 0){
	      		$(".saveCoal .echarts_img_cm").show()
	      		$(".saveCoal .barDouY_").hide()
	 	        var obj1 = ''
	         	barDouY(obj1,data)
	         	if($("#echarts_cm .highcharts-axis-line").attr("stroke")){
	          		$("#echarts_cm .highcharts-axis-line").attr("stroke","#fff")
	          	}
	 	        $.hideLoading();
	      		return
	  		 }
	    	 if(nums == data.length && nums1 == data.length){
			 	$(".saveCoal .echarts_img_cm").show()
			 	$(".saveCoal .barDouY_").hide()
	        	var obj1 = ''
	          	barDouY(obj1,data)
	          	if($("#echarts_cm .highcharts-axis-line").attr("stroke")){
	          		$("#echarts_cm .highcharts-axis-line").attr("stroke","#fff")
	          	}
	  	        $.hideLoading();
	       		return
	    	 }
	    	 $(".saveCoal .echarts_img_cm").hide()
	    	 var obj={
	    	         data:[
	    	         		kydays,
	    	         		dqcml
	    	         	],
	    	         XData:simName,
	    	         name:["当日库存","可用天数"]
	    	         };
	    	 barDouY(obj,data)
			 var indexData= data[0];
	    	 $("#xq").html(initValue(indexData.simple_name)+"详情");
			 $("#simName").html(initValue(indexData.simple_name));
			 $("#belong").html(initValue(indexData.belong));
			 $("#rl").html(initValue(indexData.rl)+'<span class="dw">万千瓦时</span>');
			 $("#rgml").html(initValue(indexData.rgml)+'<span class="dw">万吨</span>');
			 $("#cml").html(initValue(indexData.cml)+'<span class="dw">万吨</span>');
			 $("#rhml").html(initValue(indexData.rhml)+'<span class="dw">万吨</span>');
			 $("#days").html(initValue(indexData.days)+'<span class="dw">天</span>');
			 $.hideLoading();
	    },
		error:function(){
			$.toptip('存煤查询失败', 'error');
			$.hideLoading();
		}
	});
}
function barDouY(obj,data){
	if(obj == ''){
		var obj={
	         data:[[],[]],
	         	XData:["华京","镇厂","华苏","谏厂","扬厂","盐厂","徐塘","彭城","夏港","利港","常熟","华通","淮厂"],
	         	name:["当日库存","可用天数"]
	         };
	}
	if(obj.XData.length < 5){
    	var XData_length = obj.XData.length - 1
    }else{
    	var XData_length = 5
    }
	var color = ['#1DBAF5','#00CCAE']
	var chart2 = Highcharts.chart('echarts_cm', {
		chart: {
			zoomType: 'xy',
			panning: false, 
			pinchType: '', 
			zoomType: '',
			panKey: 'shift',
			marginTop:80,
			margin:10,
			marginBottom:20,
			spacingBottom:-5
		},
		title:{
			text:null
		},
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		scrollbar: {
			barBackgroundColor: '#ddd',
			barBorderRadius: 5,
			barBorderWidth: 0,
			buttonBackgroundColor: '#ddd',
			buttonBorderWidth: 0,
			buttonArrowColor: '#fff',
			buttonBorderRadius: 5,
			rifleColor: '#fff',
			trackBackgroundColor: 'white',
			trackBorderWidth: 1,
			trackBorderColor: 'silver',
			trackBorderRadius: 5,
			height:30,
			enabled:true
		},
		credits: {
			enabled: false
		},
		plotOptions:{
			series: {
				cursor: 'pointer',
				events: {
					click: function(e) {
						var index = (e.point.index)*1
						var datas = data[index]
						click_get(datas)
					},
					afterAnimate: function(e) {
						var datas = data[0]
						if(datas.days == '' && datas.cml == ''){
							return
						}
						click_get(datas)
					},
				},
			}
		},
		xAxis: [{
			categories: obj.XData,
			max:XData_length,
			crosshair: true,
			showEmpty:true,
			labels: {
				style: {
					color: '#666',
					fontSize:10
				},
			},
		}],
		yAxis: [{ 
			labels: {
				format: '{value}',
				style: {
					color: '#666',
					fontSize:10
				},
				x:0,
				y:-5,
				align:'right'
			},
			title: {
				text: '单位（天）',
				style: {
					color: '#666',
					fontSize:10
				},
				align:'high',
				rotation:0,
				x:-52,
				y:-30
			},
			opposite: true
		}, { 
			gridLineWidth: 0,
			title: {
				text: '单位（万吨）',
				style: {
					color: '#666',
					fontSize:10
				},
				align:'high',
				rotation:0,
				x:70,
				y:-30
			},
			labels: {
				format: '{value}',
				style: {
					color: '#666',
					fontSize:10
				},
				x:0,
				y:-5,
				align:'left'
			}
		}],
		tooltip: {
			animation:true,
			split:true,
			style: {
				color: '#666',
				fontSize:12
			},
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			},
			itemDistance:15,
			enabled:true,
			floating: false,
			symbolRadius:0,
            symbolWidth:8,
        	symbolHeight:8,
			y:-10,
			margin:0
		},
		series: [{
			name: '当日库存',
			type: 'column',
			yAxis: 1,
			color:color[0],
			data: obj.data[1],
			tooltip: {
				valueSuffix: ''
			}
		}, {
			name: '可用天数',
			type: 'column',
			yAxis: 0,
			color:color[1],
			data: obj.data[0],
			tooltip: {
				valueSuffix: ''
			}
		}]
	});
}
function click_get(datas){
	 var indexData = datas;
	 $("#xq").html(initValue(indexData.simple_name)+"详情");
	 $("#simName").html(initValue(indexData.simple_name));
	 $("#belong").html(initValue(indexData.belong));
	 $("#rl").html(initValue(indexData.rl)+'<span class="dw">万千瓦时</span>');
	 $("#rgml").html(initValue(indexData.rgml)+'<span class="dw">万吨</span>');
	 $("#cml").html(initValue(indexData.cml)+'<span class="dw">万吨</span>');
	 $("#rhml").html(initValue(indexData.rhml)+'<span class="dw">万吨</span>');
	 $("#days").html(initValue(indexData.days)+'<span class="dw">天</span>');
	 $(".saveCoal .barDouY_").show()
}
//电气设备
function electrical(t_id){
	$.showLoading("正在加载...");
	var time = t_id+" "+"00:00:00";
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectElecBaseRunLogApp.html",
		data:{
			 time:time
			}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(msg) {
	        
	        var data = msg.data
	     	var text_dqsb_cont = ''
	 		for(var i = 0; i < data.length; i++){
	 			if(data[i].rlog == ""){
	 				continue
	 			}
	 			if(i == 0){
	 				var top_part = 'top_part'
	 				var tihuan = 'tihuan' 
	 			}else{
	 				var top_part = ''
					var tihuan = '' 
	 			}
	    		text_dqsb_cont += '<div class="scart-item">'+
	    								'<div class="scart-point scart-point-blank '+tihuan+'">'+
	    								'</div>'+
	    								'<div class="scart-event">'+
	    									'<div class="scart-body '+top_part+'">'+
	    										'<p class="scart_title">'+
	    										initValues(data[i].rlog)+
	    										'</p>'+
	    										'<p class="scart_custom_time">'+
	    											data[i].t_id+
	    										'</p>'+
	    									'</div>'+
	    								'</div>'+
	    							'</div>'
	 		}
	    	$(".electrical .scro_part").html(text_dqsb_cont);
	    	$(".electrical .count_dqsb").html($('.electrical .scart-item').length);
	    	$.hideLoading();
	    },
		error:function(){
			$.toptip('电气设备查询失败', 'error');
			$.hideLoading();
		}
	})
}

//电网异常
function grid(t_id){
	$.showLoading("正在加载...");
	var time = t_id+" "+"00:00:00";
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectElecExceptionRunLogApp.html",
		data:{
			 time:time
			}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(msg) {
	        var data = msg.data
	     	var text_dw_cont = ''
	 		for(var i = 0; i < data.length; i++){
	 			if(data[i].dwyc == ""){
	 				continue
	 			}
	 			if(i == 0){
	 				var top_part = 'top_part'
	 				var tihuan = 'tihuan1' 
	 			}else{
	 				var top_part = ''
					var tihuan = '' 
	 			}
	    		text_dw_cont += '<div class="scart-item">'+
	    								'<div class="scart-point scart-point-blank '+tihuan+'">'+
	    								'</div>'+
	    								'<div class="scart-event">'+
	    									'<div class="scart-body '+top_part+'">'+
	    										'<p class="scart_title">'+
	    										data[i].dwyc+
	    										'</p>'+
	    										'<p class="scart_custom_time">'+
	    											data[i].t_id+
	    										'</p>'+
	    									'</div>'+
	    								'</div>'+
	    							'</div>'
	 		}
	       $(".grid .scro_part").html(text_dw_cont);
	       $(".grid .count_dw").html($('.grid .scart-item').length);
	       $.hideLoading();
	    },
		error:function(){
			$.toptip('电网异常查询失败', 'error');
			$.hideLoading();
		}
	})
}

//大机组
function bigUnit(t_id){
	$.showLoading("正在加载...");
	var time = t_id+" "+"00:00:00";
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectElecDjzRunLogApp.html",
		data:{
			 time:time
			}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(msg) {
	        var data = msg.data
	     	var text_djz_cont = ''
	 		for(var i = 0; i < data.length; i++){
	 			if(data[i].djz == ""){
	 				continue
	 			}
	 			if(i == 0){
	 				var top_part = 'top_part'
	 				var tihuan = 'tihuan1' 
	 			}else{
	 				var top_part = ''
					var tihuan = '' 
	 			}
	 			
	 			if(typeof(data[i].djz) == "undefined"){
	 				continue;
	 			}
	 			
	    		text_djz_cont += '<div class="scart-item">'+
	    								'<div class="scart-point scart-point-blank '+tihuan+'">'+
	    								'</div>'+
	    								'<div class="scart-event">'+
	    									'<div class="scart-body '+top_part+'">'+
	    										'<p class="scart_title">'+
	    										initValues(data[i].djz)+
	    										'</p>'+
	    										'<p class="scart_custom_time">'+
	    											data[i].t_id+
	    										'</p>'+
	    									'</div>'+
	    								'</div>'+
	    							'</div>'
	 		}
	       $(".bigUnit .scro_part").html(text_djz_cont);
	       $(".bigUnit .count_djz").html($('.bigUnit .scart-item').length);
	       $.hideLoading();
		},
		error:function(){
			$.toptip('大机组查询失败', 'error');
			$.hideLoading();
		}
	})
}
//地区
function areaQuery(t_id){
	$.showLoading("正在加载...");
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/getAppAreaEle.html",
		data:{"t_id":t_id}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(res) {
			var data = [];
            var XData = [];
			if(res.code == 200){
			    if($(window).width()){
		     		$("#area-echart").css("width",$(window).width())
		        	$(".areaElec .echart-wrap").css("width",$(window).width())
		     	}
				var day1 = res.data.day;
				var month1 = res.data.month;
				var year1 = res.data.year;
				var day = [];
				var month = []
				var year = []
				for(var i = 0; i < day1.length; i++){
					day[i] = day1[i]*1
				}
				for(var i = 0; i < month1.length; i++){
					month[i] = month1[i]*1
				}
				for(var i = 0; i < year1.length; i++){
					year[i] = year1[i]*1
				}
                data[0] = day;
                data[1] = month;
                data[2] = year;
                XData = res.data.xDatas;
                if( XData.length == 0 ){
                	var echarts_height_el = window.innerHeight - ($(".el_rili").innerHeight()+$(".row-content").innerHeight())
			    	$("#area-echart").css("height",echarts_height_el)
			    	$(".areaElec .echart-wrap").css("height",echarts_height_el)
                	$('.areaElec .echarts_img').show();
			    	$(".areaElec .detail-infos").hide()
			    	XData = ""
			    	drawAreaChart(data,XData,res.data.rs); 
			    	if($("#echarts_cm .highcharts-axis-line").attr("stroke")){
		          		$("#echarts_cm .highcharts-axis-line").attr("stroke","#fff")
		          	}
			    	$.hideLoading();
			    	return
			    }
                $("#area-echart").css("height",window.innerHeight*0.7)
		     	$(".areaElec .echart-wrap").css("height",window.innerHeight*0.7)
				$('.areaElec .echarts_img').hide();
            	drawAreaChart(data,XData,res.data.rs);  
			}else{
			    //$.alert("系统开了个小差，没注意到你的请求");
			    $.toptip('地区用电查询失败', 'error');
			    
			}
			$.hideLoading();
        },
		error:function(){
			 $.toptip('地区用电查询失败', 'error');
			$.hideLoading();
		}
        
    });
}
function drawAreaChart(data,XData,rs){
var color = ['#1DBAF5','#00CCAE ','#8BCF1F']
	if(XData == ""){
		var data={
 	        	data:{xDatas: [], rs: [], month: [], year: [], day: []},
 			    name:["日电量","月累计电量","年累计电量"]
    	};
		XData:["南京", "镇江", "常州", "无锡", "苏州", "徐州", "扬州", "泰州", "南通", "淮安", "连云港", "盐城", "宿迁"]
	}
	if(XData.length < 5){
		var XData_length = XData.length - 1
	}else{
		var XData_length = 5
	}
	var chart1 = Highcharts.chart('area-echart', {
		chart: {
			zoomType: 'xy',
			panning: false, 
			pinchType: '', 
			zoomType: '',
			panKey: 'shift',
			marginTop:85,
			margin:10,
			marginBottom:30,
		},
		title:{
			text:null
		},
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		scrollbar: {
			enabled:false,
			barBackgroundColor: '#ddd',
			barBorderRadius: 5,
			barBorderWidth: 0,
			buttonBackgroundColor: '#ddd',
			buttonBorderWidth: 0,
			buttonArrowColor: '#fff',
			buttonBorderRadius: 5,
			rifleColor: '#fff',
			trackBackgroundColor: 'white',
			trackBorderWidth: 1,
			trackBorderColor: 'silver',
			trackBorderRadius: 5,
			height:30
		},
		credits: {
			enabled: false
		},
		xAxis: [{
			categories: XData,
			crosshair: true,
			max:XData_length,
			labels: {
				style: {
					color: '#666',
					fontSize:10
				},
			},
		}],
		yAxis: [{ 
			opposite: true
		}, { 
			gridLineWidth: 1,
			title: {
				text: '(单位：万千瓦时)',
				style: {
					color: '#666',
					fontSize:10
				},
				align:'high',
				rotation:0,
				x:85,
				y:-30
			},
			labels: {
				format: '{value}',
				style: {
					color:'#666',
					fontSize:10
				},
				x:0,
				y:-5,
				align:'left'
			}
		}],
		tooltip: {
			animation:true,
			split:true,
			style:{
				color:'#666',
				fontSize:12
			}
		},
		plotOptions:{
			series: {
				cursor: 'pointer',
				events: {
					click: function(e) {
						$(".areaElec  .area_val").html("-");
						$("#area_year_class").removeClass();
						$("#area_month_class").removeClass();
						$("#area_fhl_width").css("width",0);
						areaDataDeal(rs,e.point.category);
					},
					afterAnimate: function(e) {
						$(".areaElec  .area_val").html("-");
						$("#area_year_class").removeClass();
						$("#area_month_class").removeClass();
						$("#area_fhl_width").css("width",0);
						if(!XData[0]){
							return
						}
						areaDataDeal(rs,XData[0]);
					},
				},
			}
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
			itemDistance:15,
			y:-10,
			margin:20,
			symbolRadius:0,
            symbolWidth:8,
        	symbolHeight:8,
		},
		series: [{
			name: '日电量',
			type: 'column',
			yAxis: 1,
			color:color[0],
			data: data[0],
			tooltip: {
				valueSuffix: ''
			}
		}, {
			name: '月累计电量',
			type: 'column',
			yAxis: 1,
			color:color[1],
			data: data[1],
			tooltip: {
				valueSuffix: ''
			},
			visible: false
		}, {
			name: '年累计电量',
			type: 'column',
			yAxis: 1,
			color:color[2],
			data: data[2],
			tooltip: {
				valueSuffix: ''
			},
			visible: false
		}]
	});
} 
function areaDataDeal(data,str){
	if(data.length > 0){
		 $("#area_name").html(str + "用电详情");
        for (var i = 0; i < data.length; i++) {
			if(data[i].name == str){
			    if(data[i].fhl == undefined){
                    $("#area_fhl_width").css("height",0);
			        $("#area_fhl_width").css("width",0);
				}else{
                    $("#area_fhl_width").css("height","100%");
			        if(data[i].fhl > 100){
			        	$("#area_fhl_width").css("width","100%");
					}else{
			        	$("#area_fhl_width").css("width",data[i].fhl +"%");
					}
				}
				$("#area_fhl").html(initValue(data[i].fhl)+"%");
				$("#area_rdl").html(initValue(data[i].qtdl));
                if(initValue(data[i].max_TIME).length > 16){
                    $("#area_max_time").html(initValue(data[i].max_TIME).substr(10,6));
                }else{
                    $("#area_max_time").html(initValue(data[i].max_TIME));
                }
				$("#area_max").html(initValue(data[i].max_FH));
                if(initValue(data[i].min_TIME).length > 16){
                    $("#area_min_time").html(initValue(data[i].min_TIME).substr(10,6));
                }else{
                    $("#area_min_time").html(initValue(data[i].min_TIME));
                }
				$("#area_min").html(initValue(data[i].min_FH));
				$("#area_month").html(initValue(data[i].yjldl));
                if(data[i].ytbzzl == undefined){
                    $("#area_month_rate").html("-");
                    $("#area_month_class").removeClass();
				}else{
                    if(data[i].ytbzzl > 0){
                        $("#area_month_class").removeClass("xj").addClass("ss");
					}else{
                        $("#area_month_class").removeClass("ss").addClass("xj");
					}
                    $("#area_month_rate").html(data[i].ytbzzl + "%");
				}
                $("#area_year").html(initValue(data[i].nljdl));
                if(data[i].ntbzzl == undefined){
                    $("#area_year_rate").html("-");
                    $("#area_year_class").removeClass();
                }else{
                    if(data[i].ntbzzl > 0){
                        $("#area_year_class").removeClass("xj").addClass("ss");
                    }else{
                        $("#area_year_class").removeClass("ss").addClass("xj");
                    }
                    $("#area_year_rate").html(data[i].ntbzzl + "%");
                }
			    break;
			}
        }
	}
	$(".areaElec .detail-infos").show();
}

//全省
function initValue(val){
    if(typeof(val) == "undefined" || val.length == 0 || val == "―" || val =="—") {
        return "0"
    }else if(typeof(val) == 'number'){
        return val;
    }else{
        return val;
    }
}
var qssfyDatas = '';
function qsfsyQuery(t_id){
    $(".queryQsFsy").click(function(){
        var type = $(this).attr("type");
        $(".queryQsFsy i").removeClass("out-act").addClass("out-def");
        $(this).children("i").removeClass("out-def").addClass("out-act");
        $(".queryQsFsy div").removeClass("active");
        $(this).children("div").addClass("active");
        drawQsfsyChart(qssfyDatas,type);
        var str ;
        if(type == 1){
            str = "调度发电";
		}else if(type == 2){
            str = "全省受电";
		}else{
            str = "调度用电";
		}
        qsfsyDataDeal(qssfyDatas.rs,str);
    });
    var _width = ($(window).width()-20)*0.69;
    $('.pro-echart').width(_width-9);
    $('.province .echart-wrap').height('13rem');
    $('.pro-echart').height('13rem');
    $.showLoading("正在加载...");
    var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/getAppQSFSYDQK.html",
		data:{"t_id":t_id}
	    };
	 	$.ajax({
		type: "post",
		url: bizData.path,
		data: bizData.data,
		dataType: "json",
		beforeSend: function(request) {
			request.setRequestHeader("#ddyd", header);
		},
		success: function(res) {
            if(res.code == 200){
                $("#qs_yd").html(res.data.yd == undefined ? "0" :res.data.yd );
                $("#qs_sd").html(res.data.sd == undefined ? "0" :res.data.sd );
                $("#qs_fd").html(res.data.fd == undefined ? "0" :res.data.fd );
                $("#cz").html(res.data.cz == undefined ? "0" :res.data.cz );
                qssfyDatas = res.data;
                var type = 0;
                for(var i = 0; i < $('.queryQsFsy .text').length; i++){
                	var item = $('.queryQsFsy .text')[i];
                	if($(item).hasClass('active')){
                		type = i+1;
                	}
                }
                if(!type){
                	type = 1;
                }
                if(type == 1){
                    str = "调度发电";
        		}else if(type == 2){
                    str = "全省受电";
        		}else{
                    str = "调度用电";
        		}
                qsfsyDataDeal(res.data.rs,str);
                drawQsfsyChart(qssfyDatas,type);
                
            }else{
                //alert("系统开了个小差，没注意到你的请求");
                $.toptip('全省发、受、用电查询失败', 'error');
            }
            $.hideLoading();
        },
        error:function(){
        	$.toptip('全省发、受、用电查询失败', 'error');
        	$.hideLoading();
        }
    });
    
}
function drawQsfsyChart(data,type){
	var obj1 = setChartsData(data.rs,type);
    var obj2 = {};
    if(type == 1){
    	obj2.value = data.fd;
    	pieEchart(data.rs,obj1,obj2)
    } else if(type==2){
    	obj2.value = data.sd;
    	pieEchart(data.rs,obj1,obj2)
    } else {
    	barEcharts2(data.rs,obj1)
    }
}
function pieEchart(data,obj1,obj2){
	if(obj1.dat[0][1] == "-"){
		obj1.dat[0][1] = 0
		obj1.data = []
	}
	var color = ['#1DBAF5','#00CCAE ','#8BCF1F']
	var chart = Highcharts.chart('pro-echart', {
		chart: {
			zoomType: 'xy',
			panning: false, 
			pinchType: '', 
			panKey: 'shift',
			type: 'pie',
			marginTop:-5
			
		},
		title: {
			floating:true,
			text:obj1.title ,
			style:{fontSize:'14px',color:'#fff'},
			align: 'center',
			y:-100
			//verticalAlign: 'middle'
		},
		subtitle:{
			floating:true,
			text: obj1.title_count,
			style:{fontSize:'14px',color:'#fff'},
			align: 'center',
			y:0
			//verticalAlign: 'top'
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		tooltip: {
			pointFormat: '{point.percentage:.1f}%</b>',
			style:{
				color:'#666',
				fontSize:12
			}
		},
		legend: {
			floating:true,
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			},
			align: 'center', 
			verticalAlign: 'bottom', 
			layout:'horizontal',
			y:10
		},
		plotOptions: {
			pie: {
				allowPointSelect: false,
				cursor: 'pointer',
				point: {
					events: {
						click: function(e) {
							console.log(e);
							var name = e.point.name
							qsfsyDataDeal(data,name);
						}
					}
				},
			}
		},
		series: [{
			name: 'Browsers',
			selected:false,
			size: '40%',
			data: [
		       	obj1.dat[0]
			],
			dataLabels: {
				enabled: false,
			},
			colors:[
				'#59a4f5'
			],
		}, {
			innerSize: '65%',
			size: '95%',
			data: [
		       	obj1.data[0],
		       	obj1.data[1]
			],
			dataLabels: {
				enabled: false
			},
			colors:[
				'#00CCAE',
				'#8BCF1F'
			],
			showInLegend: true,
			legendIndex:1,
		}]
	}, function(c) {
		var centerY = c.series[0].center[1],
		titleHeight = parseInt(c.title.styles.fontSize);
		c.setTitle({
			y:centerY - titleHeight/2-12
		});
		c.subtitle.update({
			y:centerY + titleHeight - 15
		});
	});
}
function setChartsData(datas,type){
    var obj={};
    var data = [];
    var data_name = [];
    var name = [];
    var data1 = [];
    var data2 = [];
    var obj_name = {}
    var data0 = [];
    var dat = [];
    var title = '';
    var title_count = '';
    var count = 0;
    if(datas.length > 0) {
        if(type == 1){
        	title = "调度发电";
        	data0=["调度发电",0];
        	data1=["统调发电",0];
        	data2=["非统调发电",0];
            for (var i = 0; i < datas.length; i++) {
				if(datas[i].name == "统调发电"){
					data1[0]=datas[i].name;
                    data1[1]=initValuesForEchart(datas[i].qtdl*1)
				}else if(datas[i].name == "非统调发电"){
					data2[0]=datas[i].name;
                    data2[1]=initValuesForEchart(datas[i].qtdl*1);
				}else if(datas[i].name == "调度发电"){
				    count = datas[i].qtdl*1;				    
				    title_count = count
				    data0[0]= title;
				    data0[1]=initValuesForEchart(count);
                }
            }
        }else if(type == 2){
        	title = "全省受电";
        	data0=["全省受电",0];
        	data1=["受阳城",0];
        	data2=["受华东",0];
            for (var i = 0; i < datas.length; i++) {
                if(datas[i].name == "受阳城"){
                    data1[1]=initValuesForEchart(datas[i].qtdl*1);
                }else if(datas[i].name == "受华东"){
                    data2[1]=initValuesForEchart(datas[i].qtdl*1);
                }else if(datas[i].name == "全省受电"){
                	count = datas[i].qtdl*1;
				    title_count = count
				    data0[1]=initValuesForEchart(count);
                }
            }
        }else{
        	name = ["统调抽水","统调用电","调度用电"];
        	data_name = [{"name":"统调抽水","data":[0]},{"name":"统调用电","data":[0]},{"name":"调度用电","data":[0]}]
            for (var i = 0; i < datas.length; i++) {
                if(datas[i].name == "统调抽水"){
                	//name[name.length] = datas[i].name;
                	//obj_name = {}
                	data_name[0].data = [];
                	//obj_name.name = datas[i].name
                	data_name[0].data.push(initValuesForEchart(datas[i].qtdl*1));
                    //data_name.push(obj_name);
                }else if(datas[i].name == "统调用电"){
                	//name[name.length] = datas[i].name;
                	//obj_name = {}
                	data_name[1].data = [];
                	//obj_name.name = datas[i].name
                	data_name[1].data.push(initValuesForEchart(datas[i].qtdl*1));
                    //data_name.push(obj_name);
                }else if(datas[i].name == "调度用电"){
                	//name[name.length] = datas[i].name;
                	//obj_name = {}
                	data_name[2].data = []
                	//obj_name.name = datas[i].name
                	data_name[2].data.push(initValuesForEchart(datas[i].qtdl*1));
                    //data_name.push(obj_name);
                }
                if(datas[i].name == "调度用电"){
                    count = datas[i].qtdl;
                }
            }
		}
    }
    dat.push(data0)
    data.push(data1,data2)
    obj["title_count"] = title_count;
    obj["title"] = title;
    obj["data"] = data;
    obj["dat"] = dat;
    obj["name"] = name;
    obj["data_name"] = data_name;
    return obj;
}
function barEcharts2(data,obj1){
	var color = ['#1DBAF5','#00CCAE ','#8BCF1F']
	var chart11 = Highcharts.chart('pro-echart', {
		chart: {
			zoomType: 'xy',
			panning: false, 
			pinchType: '', 
			panKey: 'shift',
			marginTop:40,
			margin:10,
			marginBottom:80,
			spacingBottom:-5,
			type: 'column'
		},
		title:{
			text:null,
		},
		colors:color,
		exporting: {
			enabled:false
		},
		rangeSelector:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		plotOptions:{
			series: {
				cursor: 'pointer',
				events: {
					click: function(e) {
						console.log(e)
						var name = ''
						var color = e.point.colorIndex
						if(color == 0){
							name = "统调抽水"
						}else if(color == 1){
							name = "统调用电"
						}else if(color == 2){
							name = "调度用电"
						}
						qsfsyDataDeal(data,name);
					}
				},
				pointPadding : 0.6,
				pointWidth: 30
			}
		},
		xAxis: [{
			categories: ["日用电量展示"],
			crosshair: true,
			max:0,
			labels: {
				style: {
					color: '#666',
					fontSize:10
				},
			},
		}],
		yAxis: [{ 
			gridLineWidth: 1,
			title: {
				text:null,
				style: {
					color:'#666',
					fontSize:10
				},
				align:'high',
				rotation:0,
				x:65,
				y:-15
			},
			labels: {
				format: '{value}',
				style: {
					color:'#666',
					fontSize:10
				},
				x:0,
				y:-5,
				align:'left'
			},
			opposite: false
		}],
		tooltip: {
			animation:true,
			formatter: function () {
				return this.y;
			},
			style:{
				color:'#666',
				fontSize:12
			}
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'bottom',
			itemMarginBottom:5,
			enabled:true,
			floating: true,
			itemDistance:15,
			symbolRadius:0,//图标圆角为0
            symbolWidth:8,
        	symbolHeight:8,
			y:-5,
			x:0,
			itemStyle:{
				color:'#666',
				fontSize:10,
				fontWeight: 'normal'
			}
		},
		series: [{
			name: obj1.data_name[0].name,
			data: obj1.data_name[0].data,
			dataLabels: {
				enabled: true,
				color:color[0],
				fontSize:10,
				fontWeight: 'normal'
			},
		}, {
			name: obj1.data_name[1].name,
			data: obj1.data_name[1].data,
			dataLabels: {
				enabled: true,
				color:color[1],
				fontSize:10,
				fontWeight: 'normal'
			},
		}, {
			name: obj1.data_name[2].name,
			data: obj1.data_name[2].data,
			dataLabels: {
				enabled: true,
				color:color[2],
				fontSize:10,
				fontWeight: 'normal'
			},
		}]
	});
}
function qsfsyDataDeal(data,str){
    $(".province  .area_val").html("-");
    $("#qsfsy_year_class").removeClass();
    $("#qsfsy_month_class").removeClass();
    $("#qsfsy_fhl_width").css("width",0);
    $("#qsfsy_name").html(str + "详情");
    if(data.length > 0){
        for (var i = 0; i < data.length; i++) {
            if(data[i].name == str){
                if(data[i].fhl == undefined){
                    $("#qsfsy_fhl_width").css("height",0);
                    $("#qsfsy_fhl_width").css("width",0);
                }else{
                    $("#qsfsy_fhl_width").css("height","100%");
                    if(data[i].fhl > 100){
                        $("#qsfsy_fhl_width").css("width","100%");
                    }else{
                        $("#qsfsy_fhl_width").css("width",data[i].fhl +"%");
                    }
                }
                $("#qsfsy_fhl").html(initValue(data[i].fhl)+"%");
                $("#qsfsy_rdl").html(initValue(data[i].qtdl));
                if(initValue(data[i].max_TIME).length > 16){
                    $("#qsfsy_max_time").html(initValue(data[i].max_TIME).substr(10,6));
                }else{
                    $("#qsfsy_max_time").html(initValue(data[i].max_TIME));
                }
                $("#qsfsy_max").html(initValue(data[i].max_FH));
                if(initValue(data[i].min_TIME).length > 16){
                    $("#qsfsy_min_time").html(initValue(data[i].min_TIME).substr(10,6));
                }else{
                    $("#qsfsy_min_time").html(initValue(data[i].min_TIME));
                }
                $("#qsfsy_min").html(initValue(data[i].min_FH));
                $("#qsfsy_month").html(initValue(data[i].yjldl));
                if(data[i].ytbzzl == undefined){
                    $("#qsfsy_month_rate").html("-");
                    $("#qsfsy_month_class").removeClass();
                }else{
                    if(data[i].ytbzzl > 0){
                        $("#qsfsy_month_class").removeClass("xj").addClass("ss");
                    }else{
                        $("#qsfsy_month_class").removeClass("ss").addClass("xj");
                    }
                    $("#qsfsy_month_rate").html(data[i].ytbzzl + "%");
                }
                $("#qsfsy_year").html(initValue(data[i].nljdl));
                if(data[i].ntbzzl == undefined){
                    $("#qsfsy_year_rate").html("-");
                    $("#qsfsy_year_class").removeClass();
                }else{
                    if(data[i].ntbzzl > 0){
                        $("#qsfsy_year_class").removeClass("xj").addClass("ss");
                    }else{
                        $("#qsfsy_year_class").removeClass("ss").addClass("xj");
                    }
                    $("#qsfsy_year_rate").html(data[i].ntbzzl + "%");
                }
                break;
            }
        }
    }
}