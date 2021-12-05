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
	
	
    $(".swiper-container .swiper-slide").css("border-left","1px solid #ddd")
    $(".swiper-container .swiper-slide:eq(0)").css("border-left","0")

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
