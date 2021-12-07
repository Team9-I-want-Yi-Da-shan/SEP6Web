;(function($){
    var obj = {};
    var myChart = null;
    this.capacityPage = function(){
		var capacityEchart = function(){
			 var echarts_heigh = window.innerHeight*0.5-20;
	 		 $(".power_zhuangji .echart-wrap").css("height",echarts_heigh)
	     	 $(".power_zhuangji #capa-echart").css("height",echarts_heigh)
	     	 if($(window).width()){
	     		$(".power_zhuangji .echart-wrap").css("width",$(window).width())
	        	$(".power_zhuangji #capa-echart").css("width",$(window).width())
	     	 }
		};
		var initData = function(){
			capacityEchart();
		};
		var loadData = function () {
			$.showLoading("正在加载...");
			var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
			//数据参数
			var bizData = {
					//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
				path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectZjRl.html",
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
					obj={
    	        		title:"装机容量",
    	                name:["电厂数量(座)","机组数量(座)","装机容量(万千瓦)"],
    	                color:['#1DBAF5','#00CCAE ','#8BCF1F']
    	            };
					obj.YData = []
					obj.data = [[],[],[]];
					if(msg.data.length){					
						for(var i = 0 ; i < msg.data.length; i++){
	                        obj.data[0].push(msg.data[i].zs);
	                        obj.data[1].push(msg.data[i].ts);
	                        obj.data[2].push(msg.data[i].rl);
	                        obj.YData.push(msg.data[i].fl);
						}
						   $('.capacity .echarts_img').hide();
					} else {
						$('.capacity .echarts_img').css("display","flex");
					}
					var chart = Highcharts.chart('capa-echart', {
                    	chart: {
                    		type: 'bar',
                    		marginTop:70,
                    		zoomType: 'xy',
                    		panning: false, 
                    		pinchType: '', 
                    		panKey: 'shift',
                    		magin:10,
                    		marginLeft:55
                    	},
                    	title: {
                    		text:null
                    	},
                    	//colors:obj.color,
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
                    			text: '单机发电量',
                    			rotation:0,
                    			align:'high',
                    			x:80,
                    			y:-11,
                    			style: {
                    				color: '#666',
            	                    fontSize: '10px'
            	                }
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
                    	}
                    	],
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
                    					//console.log(e);
                    					var index = e.point.index+1;
                    					 $('.capacity .list p:eq('+index+')').trigger('click');
                    				}
                    			},
                    		}
                    	},
                    	legend: {
                    		layout: 'horizontal',
                    		align: 'center',
                    		verticalAlign: 'top',
                    		x: 0,
                    		y: 5,
                    		symbolRadius:0,//图标圆角为0
            	        	symbolWidth:8,
            	        	symbolHeight:8,
            	        	itemStyle:{
            					color:'#666',
            					fontSize:10,
            					fontWeight: 'normal'
            				},
            	            itemDistance:10,
                    		floating: true,
                    	},
                    	series: [{
                    		yAxis: 0,
                			name: obj.name[0],                			
                			data: obj.data[0],
                			color:obj.color[0],
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[0],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10,
                		}, {
                			yAxis: 0,
                			name: obj.name[1],               			
                			data: obj.data[1],
                			color:obj.color[1],
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[1],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10,
                		}, {
                			yAxis: 1,
                			name: obj.name[2],
                			data: obj.data[2],
                			color:obj.color[2],
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[2],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10,
                		}]
                    });
                    $('.capacity .list p').click(function(){
                        $(this).addClass('active');
                        $(this).siblings().removeClass('active');
                        var type = $(this).attr('type');//type=1表示合计，type=2表示10以下，type=3表示10~20，type=4表示20~30，type=5表示30~60，type=6表示60以上
                        click_type(type,msg)
                    });
					function click_type(type,msg){
						if(type == 1){
							$("#rlCount").html(typeof(msg.rlCount) == 'undefined'?'0': msg.rlCount.toFixed(4)+"万千瓦");
                            $("#jzCount").html(typeof(msg.tsCount) == 'undefined'?'0': msg.tsCount+"座");
                            $("#dcCount").html(typeof(msg.dcCount) == 'undefined'?'0': msg.dcCount+"座");

						}else if (type == 2){
                            $("#rlCount").html(typeof(msg.data[0].rl) == 'undefined'?'0': msg.data[0].rl+"万千瓦");
                            $("#jzCount").html(typeof(msg.data[0].ts) == 'undefined'?'0': msg.data[0].ts+"座");
                            $("#dcCount").html(typeof(msg.data[0].zs) == 'undefined'?'0': msg.data[0].zs+"座");

						}else if (type == 3){
                            $("#rlCount").html(typeof(msg.data[1].rl) == 'undefined'?'0': msg.data[1].rl+"万千瓦");
                            $("#jzCount").html(typeof(msg.data[1].ts) == 'undefined'?'0': msg.data[1].ts+"座");
                            $("#dcCount").html(typeof(msg.data[1].zs) == 'undefined'?'0': msg.data[1].zs+"座");

						}else if (type == 4){
                            $("#rlCount").html(typeof(msg.data[2].rl) == 'undefined'?'0': msg.data[2].rl+"万千瓦");
                            $("#jzCount").html(typeof(msg.data[2].ts) == 'undefined'?'0': msg.data[2].ts+"座");
                            $("#dcCount").html(typeof(msg.data[2].zs) == 'undefined'?'0': msg.data[2].zs+"座");

						}else if (type == 5){
                            $("#rlCount").html(typeof(msg.data[3].rl) == 'undefined'?'0': msg.data[3].rl+"万千瓦");
                            $("#jzCount").html(typeof(msg.data[3].ts) == 'undefined'?'0': msg.data[3].ts+"座");
                            $("#dcCount").html(typeof(msg.data[3].zs) == 'undefined'?'0': msg.data[3].zs+"座");

						}else if (type == 6){
                            $("#rlCount").html(typeof(msg.data[4].rl) == 'undefined'?'0': msg.data[4].rl+"万千瓦");
                            $("#jzCount").html(typeof(msg.data[4].ts) == 'undefined'?'0': msg.data[4].ts+"座");
                            $("#dcCount").html(typeof(msg.data[4].zs) == 'undefined'?'0': msg.data[4].zs+"座");
						}
					}
                    $('.capacity .list p:eq(0)').trigger('click');
                    $.hideLoading();
                },
				error:function () {
					//$.alert("装机容量查询失败");
					$.toptip('装机容量查询失败', 'error');
					$.hideLoading();
                }
			})
        };

		return{
			init:function(){
				initData();
				// loadEvent();
                loadData();
			}
		}
	}();
	
})(jQuery);
