;(function($){
    var obj= {};
    var myChart = null;
    this.energyPage = function(){
		var energyEchart = function(){
			var echarts_heigh = window.innerHeight*0.605
	 		 $(".power_nengyuan .echart-wrap").css("height",echarts_heigh)
	     	 $(".power_nengyuan #energy-echart").css("height",echarts_heigh)
	     	 if($(window).width()){
	     		$(".power_nengyuan .echart-wrap").css("width",$(window).width())
	        	$(".power_nengyuan #energy-echart").css("width",$(window).width())
	     	 }
		};
		var initData = function(){
			energyEchart();
		};

		var loadData = function () {
			$.showLoading("正在加载...");
			var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
			//数据参数
			var bizData = {
					//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
				path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectNyJg.html",
				data:{}
			}
			$.ajax({
				type: "post",
				url: bizData.path,
				data: bizData.data,
				dataType: "json",
				beforeSend: function(request) {
					request.setRequestHeader("#ddyd", header);
				},			
				success:function (msg) {
					var rm = null;
					var mq = null;
					var ry = null;
					var hn = null;
					var sl = null;
					var fl = null;
					var tyn = null;
					var qt = null;
					obj={
		        		title:"能源种类",
		                name:["发电机数量(座)","装机容量(万千瓦)"]
		            };
					obj.YData = []
					obj.data = [];
					if(msg.data.length){																	
						for(var i = 0 ; i < msg.data.length; i++){
							if(msg.data[i].zl == "火力燃煤发电"){
								rm = msg.data[i];
							}else if (msg.data[i].zl == "火力燃气发电"){
	                            mq = msg.data[i];
	                        }else if (msg.data[i].zl == "火力燃油发电"){
	                            ry = msg.data[i];
	                        }else if (msg.data[i].zl == "核能发电"){
	                            hn = msg.data[i];
	                        }else if (msg.data[i].zl == "水力发电"){
	                            sl = msg.data[i];
	                        }else if (msg.data[i].zl == "风力发电"){
	                            fl = msg.data[i];
	                        }else if (msg.data[i].zl == "太阳能发电"){
	                            tyn = msg.data[i];
	                        }else if (msg.data[i].zl == "其他"){
								qt = msg.data[i];
							}
							obj.YData = ['燃煤发电','燃气发电','燃油发电','核能发电','水力发电','风力发电','太阳能发电','其他'];
						}
						var color = ['#00CCAE ','#8BCF1F']
						obj.data[0] = [rm.ts,mq.ts,ry.ts,hn.ts,sl.ts,fl.ts,tyn.ts,qt.ts];
	                    obj.data[1] = [rm.rl,mq.rl,ry.rl,hn.rl,sl.rl,fl.rl,tyn.rl,qt.rl];
	                    $('.energy .echarts_img').hide();
					} else {
						$('.energy .echarts_img').css("display","flex");
					}
					var chart = Highcharts.chart('energy-echart', {
                    	chart: {
                    		type: 'bar',
                    		marginTop:70,
                    		zoomType: 'xy',
                    		panning: false, 
                    		pinchType: '', 
                    		panKey: 'shift',
                    		magin:10,
                    		marginLeft:70
                    	},
                    	title: {
                    		text:null
                    	},
                    	//colors:color,
                    	exporting: {
                    		enabled:false
                    	},
                    	rangeSelector:{
                    		enabled:false
                    	},
                    	credits: {
                    		enabled: false
                    	},
                    	xAxis: {
                    		categories: obj.YData,
                    		title: {
                    			text: obj.title,
                    			rotation:0,
                    			align:'high',
                    			x:90,
                    			y:-11,
                    			style: {
        							color: '#666',
        							fontSize:10
        						},
                    		},
                    		labels:{
                    			style: {
            	                    color: '#666',
            						fontSize:10
            	                }
                    		},
                    		tickLength:0
                    	},
                    	yAxis: [{
                    		min: 0,
                    		max:500,
                    		title: {
                    			text: null
                    		},
                    		labels: {
                    			enabled:false
                    		},
                    		gridLineColor: '#eee'
                    	},{
                    		min: 0,
                    		title: {
                    			text: null
                    		},
                    		labels: {
                    			enabled:false
                    		},
                    		gridLineColor: '#eee'
                    	}],
                    	tooltip: {
                    		animation:true,
                    		splite:true,
                    		style:{
                				color:'#666',
                				fontSize:12
                			}
                    	},
                    	
                    	plotOptions: {
                    		series: {
                    			pointWidth:16,
                    			dataLabels: {
                    				enabled: true,
                    				allowOverlap: true
                    			},
                    			cursor: 'pointer',
                    			events: {
                    				click: function(e) {
                    					var index;
                    					if(e.point.category=="燃煤发电"){
                    						index = 0;
                    					}else if(e.point.category =="燃气发电"){
                    						index = 1;
                    					}else if(e.point.category =="燃油发电"){
                    						index = 2;
                    					}else if(e.point.category =="核能发电"){
                    						index = 3;
                    					}else if(e.point.category =="水力发电"){
                    						index = 4;
                    					}else if(e.point.category =="风力发电"){
                    						index = 5;
                    					}else if(e.point.category =="太阳能发电"){
                    						index = 6;
                    					}else if(e.point.category =="其他"){
                    						index = 7;
                    					}
                    					
                    					
                    					$('.energy .list p:eq('+index+')').trigger('click');
                    				}
                    			},
                    		}
                    	},
                    	legend: {
                    		layout: 'horizontal',
                    		align: 'center',
                    		verticalAlign: 'top',
                    		symbolRadius:0,//图标圆角为0
            	        	symbolWidth:8,
            	        	symbolHeight:8,
                    		itemStyle:{
                				color:'#666',
                				fontSize:10,
                				fontWeight: 'normal'
                			},
                    		x: 0,
                    		y: 5,
                    		itemDistance:10,
                    		floating: true,
                    	},
                    	series: [{
                    		yAxis: 0,
                			name: obj.name[0],
                			data: obj.data[0],
                			color:color[0],
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:color[0],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10
                		}, {
                			yAxis: 1,
                			name: obj.name[1],
                			data: obj.data[1],
                			color:color[1],
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:color[1],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10
                		}]
                    });
	                    $('.energy .list p').click(function(){
	                        $(this).addClass('active');
	                        $(this).siblings().removeClass('active');
	                        var _type = $(this).attr('type');//type=1表示合计，type=2表示10以下，type=3表示10~20，type=4表示20~30，type=5表示30~60，type=6表示60以上
	                        click_type(_type)
	                    });
	                    function click_type(type){
	                    	window.location.hash = type;
	                    	if(type == 1){
								$("#nyJzCount").html(typeof(rm.ts) == 'undefined'?'0': rm.ts+"座");
								$("#nyRlCount").html(typeof(rm.rl) == 'undefined'?'0': rm.rl.toFixed(4)+"万千瓦");
							}else if(type == 2){
	                            $("#nyJzCount").html(typeof(mq.ts) == 'undefined'?'0': mq.ts+"座");
	                            $("#nyRlCount").html(typeof(mq.rl) == 'undefined'?'0': mq.rl+"万千瓦");
							}else if(type == 3){
	                            $("#nyJzCount").html(typeof(ry.ts) == 'undefined'?'0': ry.ts+"座");
	                            $("#nyRlCount").html(typeof(ry.rl) == 'undefined'?'0': ry.rl+"万千瓦");
	                        }else if(type == 4){
	                            $("#nyJzCount").html(typeof(hn.ts) == 'undefined'?'0': hn.ts+"座");
	                            $("#nyRlCount").html(typeof(hn.rl) == 'undefined'?'0': hn.rl+"万千瓦");
	                        }else if(type == 5){
	                            $("#nyJzCount").html(typeof(sl.ts) == 'undefined'?'0': sl.ts+"座");
	                            $("#nyRlCount").html(typeof(sl.rl) == 'undefined'?'0': sl.rl+"万千瓦");
	                        }else if(type == 6){
	                            $("#nyJzCount").html(typeof(fl.ts) == 'undefined'?'0': fl.ts+"座");
	                            $("#nyRlCount").html(typeof(fl.rl) == 'undefined'?'0': fl.rl+"万千瓦");
	                        }else if(type == 7){
	                            $("#nyJzCount").html(typeof(tyn.ts) == 'undefined'?'0': tyn.ts+"座");
	                            $("#nyRlCount").html(typeof(tyn.rl) == 'undefined'?'0': tyn.rl+"万千瓦");
	                        }else if(type == 8){
	                            $("#nyJzCount").html(typeof(qt.ts) == 'undefined'?'0': qt.ts+"座");
	                            $("#nyRlCount").html(typeof(qt.rl) == 'undefined'?'0': qt.rl+"万千瓦");
	                        }
	                    }
					$('.energy .list p:eq(0)').trigger('click');
                    $.hideLoading();
                },
				error:function () {
					//$.alert("查询能源结构失败");
					$.toptip('查询能源结构失败', 'error');
					$.hideLoading();
                }
			})
        };

		return{
			init:function(){
				initData();
                loadData();
			}
		}
	}();
	
})(jQuery);
