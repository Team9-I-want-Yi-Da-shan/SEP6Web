;(function($){
    var obj = {};
    var myChart = null;
    this.transCapaPage = function(){
		var trasCapaEchart = function(){
			var _width = $(window).width();
	    	$('.trans-capa-echart').width(_width);
		};
		var initData = function(){
			trasCapaEchart();
		};
		

		var loadData = function () {
			$.showLoading("正在加载...");
			var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
			//数据参数
			var bizData = {
					//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
				path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectByqBdRl.html",
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
					//alert("transcapa"+JSON.stringify(msg))
					obj={
	    	        		title:"变电容量",
	    	                name:["变电数量(座)","变压器数量(座)","变电容量(万千瓦)"],
	    	                color:['#1DBAF5','#00CCAE ','#8BCF1F']
	    	            };
						obj.YData = ["500kv","220kv"]
						obj.data = [[],[],[]];
					
						obj.data[0] = [msg.bdz500,msg.bdz220];
						obj.data[1] = [msg.byq500,msg.byq220];
	                    obj.data[2] = [msg.rl500,msg.rl220];
	                if(obj.data[0].length  || obj.data[1].length){
	                    $('.trans-capa .echarts_img').hide();
					} else {
						$('.trans-capa .echarts_img').css("display","flex");
					}	                
	                var chart = Highcharts.chart('trans-capa-echart', {
                    	chart: {
                    		type: 'bar',
                    		marginTop:70,
                    		zoomType: 'xy',
                    		panning: false, 
                    		pinchType: '', 
                    		panKey: 'shift',
                    		magin:10,
                    		marginLeft:50
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
                    			text: '电压等级',
                    			rotation:0,
                    			align:'high',
                    			x:66,
                    			y:-11,
                    			style: {
                    				color:'#666',
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
                    					console.log(e);
                    					var index = e.point.index+1;
                    					
                    					 $('.trans-capa .list p:eq('+index+')').trigger('click');
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
                    		itemDistance:6,
                    		floating: true,
                    	},
                    	series: [{
                			name: obj.name[0],
                			type: 'column',
                			yAxis: 0,
                			color:obj.color[0],
                			data: obj.data[0],
                			tooltip: {
                				valueSuffix: ''
                			},
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[0],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10
                		}, {
                			name: obj.name[1],
                			type: 'column',
                			yAxis: 0,
                			color:obj.color[1],
                			data: obj.data[1],
                			tooltip: {
                				valueSuffix: ''
                			},
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[1],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10
                		}, {
                			name: obj.name[2],
                			type: 'column',
                			yAxis: 1,
                			color:obj.color[2],
                			data: obj.data[2],
                			tooltip: {
                				valueSuffix: ''
                			},
                			dataLabels: {
                				enabled: true,
                				style:{
                					color:obj.color[2],
                					fontSize:10,
                					fontWeight: 'normal'
                				}
                			},
                			maxPointWidth:10
                		}]
                    });
	                

                    //装机容量点击显示详情
                    $('.trans-capa .list p').click(function(){
                        $(this).addClass('active');
                        $(this).siblings().removeClass('active');
                        var type = $(this).attr('type');//type=1表示合计，type=2表示10以下，type=3表示10~20，type=4表示20~30，type=5表示30~60，type=6表示60以上
                       	if(type == 1){
							$("#bdrlCount").html(typeof(msg.rlCount) == 'undefined'?'-': msg.rlCount.toFixed(4)+"万千瓦");
							$("#bdzCount").html(typeof(msg.bdzCount) == 'undefined'?'-': msg.bdzCount+"座");
							$("#byqCount").html(typeof(msg.byqCount) == 'undefined'?'-': msg.byqCount+"座");
                        }else if (type == 2){
                            $("#bdrlCount").html(typeof(msg.rl500) == 'undefined'?'-': msg.rl500+"万千瓦");
                            $("#bdzCount").html(typeof(msg.bdz500) == 'undefined'?'-': msg.bdz500+"座");
                            $("#byqCount").html(typeof(msg.byq500) == 'undefined'?'-': msg.byq500+"座");
                        }else{
                            $("#bdrlCount").html(typeof(msg.rl220) == 'undefined'?'-': msg.rl220+"万千瓦");
                            $("#bdzCount").html(typeof(msg.bdz220) == 'undefined'?'-': msg.bdz220+"座");
                            $("#byqCount").html(typeof(msg.byq220) == 'undefined'?'-': msg.byq220+"座");
                        }
                    });

                    $('.trans-capa .list p:eq(0)').trigger('click');
                    $.hideLoading();

                },
				error:function () {
					//$.alert("查询变电容量失败");
					$.toptip('查询变电容量失败', 'error');
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
