$(function(){
	FastClick.attach(document.body);
	if(document.all){
		document.onselectstart= function(){return false;};
	}else{
		document.onmousedown= function(){return false;};
		document.onmouseup= function(){return true;};
	}
	document.onselectstart = new Function('event.returnValue=false;');
	//all_time
	var myDate = new Date();

	//开始时间
    var startDate=new Date(myDate.getTime()-31 * 24 * 3600 * 1000);
    var getStartMonth = startDate.getMonth()*1+1 >= 10? startDate.getMonth()*1+1:"0"+(startDate.getMonth()*1+1);
    var getStartDate = startDate.getDate()*1 >= 10? startDate.getDate():"0"+startDate.getDate();
    var getyear = myDate.getFullYear()
    var myStartDatetime = startDate.getFullYear()+"-"+getStartMonth+"-"+getStartDate;
    var myStartDatetime_ = startDate.getFullYear()+"-"+getStartMonth+"-"+getStartDate;

	//结束时间
	var getMonth = myDate.getMonth()*1+1 >= 10? myDate.getMonth()*1+1:"0"+(myDate.getMonth()*1+1);
	var getDate = myDate.getDate()*1 >= 10? myDate.getDate():"0"+myDate.getDate();
	
	var myDatetime = myDate.getFullYear()+"-"+getMonth+"-"+getDate;
	var myDatetime_ = myDate.getFullYear()+"-"+getMonth+"-"+getDate;

	var start_time_ = new Date(myStartDatetime_).getTime();
	start_time_ = start_time_ + ''
	start_time_ = start_time_.substring(0,10)
	var end_time_ = new Date(myDatetime_).getTime();
	end_time_ = end_time_ + ''
	end_time_ = end_time_.substring(0,10)
	var timestamp = new Date().getTime();
	$("#start_years").val(myStartDatetime);
	$("#end_years").val(myDatetime);
	var start_ime = $("#start_years").val()
	var end_ime = $("#end_years").val()
	//getData();
	
  	$("#start_years").calendar({
		dateFormat: 'yyyy-mm-dd',
		maxDate:myDatetime,
		onClose: function (p) {
	      	var start_time = p.input.context.value
	      	var time_ch = p.value[0]+''
	      	start_time_ = time_ch.substring(0,10)
	      	if(start_time_*1 > timestamp*1){
				$.toptip('起始时间不能大于当前时间', 'error');
				return
	      	}
	      	if(start_time_*1 > end_time_*1){
		  		$.toptip('起始时间不能大于当前时间', 'error');
		  		$("#start_years").calendar("setValue", [start_ime]); 
		  		return
		  	}else{
		  		platformInfo.getPlatformToken(function(result) {
		  			tokenSecond = result;
		  			getData();
		  			start_ime = $("#start_years").val()
		  		}, function(result) {
		  			alert("onFail" + JSON.stringify(result))
		  		});
		  	}
        }
	});
	$("#end_years").calendar({
		dateFormat: 'yyyy-mm-dd',
		onClose: function (p) {
	      	var end_time = p.input.context.value
	      	var time_end = p.value[0]+''
	      	end_time_ = time_end.substring(0,10)
	      	if(start_time_*1 > timestamp*1){
				$.toptip('起始时间不能大于当前时间', 'error');
				return
	      	}
	      	if(start_time_*1 > end_time_*1){
		  		$.toptip('起始时间不能大于当前时间', 'error');
		  		$("#end_years").calendar("setValue", [end_ime]); 
		  		return
		  	}else{
		  		platformInfo.getPlatformToken(function(result) {
		  			tokenSecond = result;
		  			getData();
		  			end_ime = $("#end_years").val()
		  		}, function(result) {
		  			alert("onFail" + JSON.stringify(result))
		  		});
		  	}
        }
	});
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	var curH = window.innerHeight + scrollTop;
    $(".scro_part.scart-single-column.scro_part:before").css("height",curH)
    
    
    //初始化宽高
    var _height = $(window).height();
    var _width = $(window).width();
    $('.risk-list').height(_height);
    $('.risk-list').width(_width);
    $('.risk-detail-wrap').height(_height);
    
    
    $(".riskWarn_details").on("click",".ifont",function(){
		if($(this).parents(".toggle_part").find(".tog_cont").html() == ''){
			return
		}
		if($(this).parents(".toggle_part").hasClass("qsbm")){
			if($(this).parents(".qsbm").attr("falg")*1 == 1){
				return
			}
		}
		if($(this).parents(".toggle_part").find(".ifont").hasClass("close")){
			$(this).addClass("open").removeClass("close")
			$(this).parents(".toggle_part").find(".toggle_cont").hide()
			$(this).parents(".toggle_part").find(".toggle_title").css("border-radius","5px")
		}else{
			$(this).addClass("close").removeClass("open")
			$(this).parents(".toggle_part").find(".toggle_cont").show()
			$(this).parents(".toggle_part").find(".toggle_title").css("border-radius","5px 5px 0 0")
		}
	})
   
})

//挂数据
function getData(){
	$.showLoading("正在加载...");
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectRiskEarlyWarning.html",
		data:{
			startTime:$("#start_years").val(),
			endTime:$("#end_years").val()
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
			var data=msg.riskEarlys;
			var risk = ''
			var risk_bg = ''	
		 	var risk_text = ''
			for(var k=0;k<data.length;k++){
				var newData=data[k];
				if(newData.state=="已归档"){
					risk_bg = 'yzx'	
			 		risk_text = '已执行'
				}else if(newData.state=="未执行"){
					risk_bg = 'wzx'	
			 		risk_text = '未执行'
				}else{
					risk_bg = 'zxz'	
			 		risk_text = '执行中'
				}
				risk += '<div class="risk_ risk-item" obj_id='+newData.obj_id+'>'+
				'<div class="risk_content">'+
					'<div class="risk_cont">'+
						'<div class="titile">'+
						newData.zt+
						'</div>'+
						'<div class="title_down_left">'+
							'<div class="title_sf">'+newData.bh+'</div>'+
							'<div class="title_down_middle">'+
								'<span>'+newData.kssj.substring(5,16)+'</span>'+
								'<span>'+'至'+'</span>'+
								'<span>'+newData.jssj.substring(5,16)+'</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="lable '+risk_bg+'">'+
						'<div class="result">'+
							risk_text+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
			}
			$(".risk").html(risk)
			$.hideLoading();
	}
	})
}
