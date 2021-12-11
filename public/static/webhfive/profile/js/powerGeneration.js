$(function(){
	FastClick.attach(document.body);
	//
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
		$("#date1").attr("placeholder",value);
		$("#date1").attr("value",value);
		$("#date1").calendar({
			input: "#date1",
			maxDate:maxDate,
	        dateFormat: 'yyyy-mm-dd',
	        value:[value],
	        onClose: function (p) {	        	
	        	t_id = $("#date1").val();
	        	
	        	if(t_id != mixDate){
	    			$('.afDay').css('color','#00b08a');
	    		} else {
	    			$('.afDay').css('color','#999');
	    		}
	        	
        		platformInfo.getPlatformToken(function(result) {
    				tokenSecond = result;
    				powerGeneration(t_id);
    			}, function(result) {
    				alert("onFail" + JSON.stringify(result))
    			});
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
			$("#date1").attr("value",myDatetime);
			window.setTimeout(function(){$("#date1").calendar("setValue", [myDatetime]);},10);
			t_id = myDatetime;	
			
			if(t_id != mixDate){
				$('.afDay').css('color','#00b08a');
			} else {
				$('.afDay').css('color','#999');
			}
			
    		platformInfo.getPlatformToken(function(result) {
				tokenSecond = result;
				powerGeneration(t_id);
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
	    		
    	
	}
	
	var select_index = -1	
	var nowTime = new Date();//获取系统当前时间
	//var mixDate = formatDate(new Date(nowTime.getTime()-24*60*60*1000))//时间插件的最大时间设置:当天时间的前一天
	var mixDate = formatDate(new Date(nowTime.getTime()))//时间插件的最大时间设置:当天时间
	var t_id = mixDate;//获取选择的时间
	//时间控件初始化时间
	creatCalendar(mixDate,mixDate);
	$('.afDay').css('color','#999');
	//点击“前一天”按钮	
	$('.proDay').click(function(){
		var selecTime = $("#date1").val();
		$('.afDay').css('color','#00b08a');
		inputTime(selecTime,1);	
		
		
	});
	//点击“后一天”按钮	
	$('.afDay').click(function(){
		var selecTime = $("#date1").val();
		if(selecTime != mixDate){
			inputTime(selecTime,2);	
		} else {
    		$('.afDay').css('color','#999');

		}
	});
    
    
    
    
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

//电厂电量
function  powerGeneration(t_id){
	$.showLoading("正在加载...");
	var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
	//数据参数
	var bizData = {
			//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
		path: "http://" + routeIp + ":" + routePort + "/ddrb/home/getAppDcFdQk.html",
		data:{
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
        if (msg.code == 200) {
        	if(msg.data.rs.length == 0){
        		$(".powerGeneration .echarts_img").show()
        		$(".powerGeneration .letter").hide()
        		var echarts_height = window.innerHeight - ($(".riLi").innerHeight() + $(".title_cm").innerHeight() + $(".tab_cm").innerHeight())
	        	//var echarts_height = $(".riLi").innerHeight() + $(".title_cm").innerHeight() + $(".tab_cm").innerHeight()
        		$(".powerGeneration .echarts_dcdl_fu").css("height",echarts_height)
	        	$(".powerGeneration #echarts_dcdl").css("height",echarts_height)
	        	if($(window).width()){
	        		$(".powerGeneration .echarts_dcdl_fu").css("width",$(window).width())
		        	$(".powerGeneration #echarts_dcdl").css("width",$(window).width())
	        	}
		        var obj1 = ''
		        var lineData1 = ''
                container_hight(obj1,lineData1)
		        $(".powerGeneration .avg_fhl_fd").html("-");
	        	$(".powerGeneration .count_fd").html("-");
	        	$(".powerGeneration .cy_fd").html("-");
	        	$(".powerGeneration .max_fh_fd").html("-");
	        	$(".powerGeneration .qt_fd").html("-");
	        	if($(".highcharts-axis-line").attr("stroke")){
	        		$(".highcharts-axis-line").attr("stroke","#fff");
	        	}
		        $.hideLoading();
        		return
        	}
        	$(".powerGeneration .echarts_img").hide()
    		$(".powerGeneration .letter").show()
    		//var echarts_height = window.innerHeight - ($(".riLi").innerHeight() + $(".title_cm").innerHeight() + $(".tab_cm").innerHeight() + $(".letter").height())
        	//var echarts_height = $(".riLi").innerHeight() + $(".title_cm").innerHeight() + $(".tab_cm").innerHeight()
    		$(".powerGeneration .echarts_dcdl_fu").css("height",window.innerHeight*0.7)
        	$(".powerGeneration #echarts_dcdl").css("height",window.innerHeight*0.7)
        	if($(window).width()){
        		$(".powerGeneration .echarts_dcdl_fu").css("width",$(window).width())
	        	$(".powerGeneration #echarts_dcdl").css("width",$(window).width())
        	}
            dcdlDatas = msg.data.rs;
            $(".powerGeneration .avg_fhl_fd").html(initValues(msg.data.avg_fhl));
        	$(".powerGeneration .count_fd").html(initValues(msg.data.count));
        	$(".powerGeneration .cy_fd").html(initValues(msg.data.cy));
        	$(".powerGeneration .max_fh_fd").html(initValues(msg.data.max_fh));
        	$(".powerGeneration .qt_fd").html(initValues(msg.data.qt));
            var text_dcdl_letter = ''
            	for(var i = 0; i < msg.data.newTip.length; i++){
            		var newTip = msg.data.newTip[i]
            		newTip = newTip.toUpperCase()
            		if(i == 0){
            			var ntip_one = "ntip_one"
            		}else{
            			var ntip_one = ""
            		}
	            	text_dcdl_letter += '<div>'+
	            							'<div class="let_ '+ntip_one+'">'+
	            								newTip+
	            							'</div>'+
	            							'<div class="sanjiao">'+'</div>'+
	            						'</div>'
            	}
            $(".powerGeneration .letter_fu1").html(text_dcdl_letter)
            var str = ''
        		$(".let_").on("click",function(){
        			str = $(this).html()
        			dcdlDatsDeal(str,dcdlDatas);
        	    	$(this).addClass("let_color").parent().siblings().find(".let_").removeClass("let_color")
        	    	$(this).siblings().css("visibility","visible").parent().siblings().find(".sanjiao").css("visibility","hidden");
        	    })
            $(".powerGeneration .let_:eq(0)").trigger("click")
        } else {
            alert('系统开了个小差，没注意到你的请求');
        }
        $.hideLoading();
    }
	});
}
function dcdlDatsDeal(str,dcdlDatas){
		$.showLoading("正在加载...");
    	var qtdlArr = [];
    	var cydlArr = [];
    	var maxFhArr = [];
    	var fhlArr = [];
    	var xArr = [];
        str = str.toLowerCase();
        var name = ["全天电量","厂用电量","最大负荷","负荷率"];
		if (dcdlDatas.length >0){
            for (var i = 0; i < dcdlDatas.length ; i++) {
				if(str == "*"){
                    qtdlArr[qtdlArr.length] = dcdlDatas[i].qtdl;
                    cydlArr[cydlArr.length] = dcdlDatas[i].cydl;
                    maxFhArr[maxFhArr.length] = dcdlDatas[i].max_VALUE;
                    fhlArr[fhlArr.length] = dcdlDatas[i].fhl;
                    xArr[xArr.length] = dcdlDatas[i].name;
				}else{
					if(dcdlDatas[i].first == str){
	                    qtdlArr[qtdlArr.length] = dcdlDatas[i].qtdl;
	                    cydlArr[cydlArr.length] = dcdlDatas[i].cydl;
	                    maxFhArr[maxFhArr.length] = dcdlDatas[i].max_VALUE;
	                    fhlArr[fhlArr.length] = dcdlDatas[i].fhl;
	                    xArr[xArr.length] = dcdlDatas[i].name;
					}
				}
            }
		}
        var obj={};
        var data = [];
        var data1 = [];
        data[0] = qtdlArr;
        data[1] = cydlArr;
        obj["data"] = data;
        obj["XData"] = xArr;
        obj["name"] = name;
        var lineData = [];
        data1[0] = maxFhArr;
        data1[1] = fhlArr;
        lineData.push(data1[0],data1[1])
        container_hight(obj,lineData)
        $.hideLoading();
}

function container_hight(obj,lineData){
	 var color1 = ['#8BCF1F','#00CCAE','#00b488','#1DBAF5']
	    if(obj == ''){
	        var obj={
	            data:[[],[]],
	            XData:["华京","镇厂","华苏","谏厂","扬厂","盐厂","徐塘","彭城","夏港","利港","常熟","华通","淮厂"],
	            name:["全天电量","厂用电量","最大负荷","负荷率"],
	        };
	        var lineData = [[],[]]
	    }
	    if(obj.XData.length < 5){
	    	var XData_length = obj.XData.length - 1
	    }else{
	    	var XData_length = 5
	    }
	    var chart = Highcharts.chart('echarts_dcdl', {
			chart: {
				zoomType: 'xy',
				panning: false, 
				pinchType: '', 
				panKey: 'shift',
				marginTop:80,
				margin:10,
				marginBottom:40
			},
			title:{
				text:null
			},
			plotOptions: {
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
			rangeSelector:{
				enabled:false
			},
			scrollbar: {
				enabled:true,
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
	            categories:obj.XData,
	            crosshair: true,
	            max:XData_length,
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
	                align:"right"
	            },
	            title: {
	                text: '(单位：万千瓦、%)',
	                style: {
	                    color: '#666',
						fontSize:10
	                },
	                align:'high',
	                rotation:0,
	                //x:84,
	    			y:-25
	            },
	            opposite: true
	        }, {
	            gridLineWidth: 0,
	            title: {
	                text: '(单位：万千瓦时)',
	                style: {
	                    color: '#666',
						fontSize:10
	                },
	                align:'high',
	                rotation:0,
	                x:100,
	    			y:-25
	            },
	            labels: {
	                format: '{value}',
	                style: {
	                    color: '#666',
						fontSize:10
	                },
	                x:0,
	    			y:-5,
	                align:"left"
	            }
	        }, { 
	            gridLineWidth: 0,
	            labels: {
	                format: '{value}',
	                style: {
	                    color: color1[2]
	                },
	                align:"left"
	            },
	            opposite: false,
	            visible:false
	        }],
	        tooltip: {
	        	animation:true,
	    		split:true,
	    		style:{
					color:'#666',
					fontSize:12
				}
	        },
	        legend: {
	        	squareSymbol:true,
	        	symbolWidth:16,
	        	symbolHeight:12,
	            layout: 'horizontal',
	            align: 'center',
	            verticalAlign: 'top',
	            floating: false,
	            enabled:true,
	            symbolRadius:0,//图标圆角为0
	        	symbolWidth:8,
	        	symbolHeight:8,
				itemStyle:{
					color:'#666',
					fontSize:10,
					fontWeight: 'normal'
				},
	            itemDistance:10,
	    		y:-10,
	    		margin:20
	        },
			exporting: {
				enabled:false
			},
	        series: [{
	            name: obj.name[0],
	            type: 'column',
	            yAxis: 1,
	            color:color1[0],
	            maxPointWidth:25,
	            data: obj.data[0],
	            tooltip: {
	                valueSuffix: ''
	            }
	        }, {
	            name: obj.name[1],
	            type: 'column',
	            yAxis: 1,
	            color:color1[1],
	            maxPointWidth:25,
	            data: obj.data[1],
	            tooltip: {
	                valueSuffix: ''
	            }
	        },{
	            name:obj.name[2],
	            type: 'spline',
	            yAxis: 2,
	            data: lineData[0],
	            marker: {
	                enabled: false
	            },
	            color:color1[2],
	            dashStyle: 'shortdot',
	            tooltip: {
	                valueSuffix: ''
	            }
	        }, {
	            name: obj.name[3],
	            type: 'spline',
	            color:color1[3],
	            data: lineData[1],
	            tooltip: {
	                valueSuffix: ''
	            }
	        }]
	    })
}