;(function($){
	this.transLinePage = function(){
        var obj= {};
        var myChart = null;
        var trasCapaEchart = function(){
			var _width = $(window).width();
	    	$('.trans-line-echart').width(_width);
		};
		var initData = function(){
			trasCapaEchart();
		};
		var loadEvent = function(){
			
		};

		var loadData = function () {
			$.showLoading("正在加载...");
			var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
		//数据参数
			var bizData = {
					//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
				path: "http://" + routeIp + ":" + routePort + "/ddrb/home/selectXlTsAndCd.html",
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
					//alert("transLine"+JSON.stringify(msg))
					obj={
	    	        		title:"输电线路",
	    	                name:["线路条数(条)","线路长度(千米)"],
	    	                color:['#1DBAF5','#00CCAE ','#8BCF1F']
	    	            };
						obj.YData = ["500kv","220kv"]
						obj.data = [[],[]];
						
						
						
				if( msg["500cd"] || msg["220cd"] || msg["500ts"] || msg["220ts"]){
					obj.data[0] = [msg["500ts"],msg["220ts"]];
					obj.data[1] = [parseFloat(msg["500cd"].toFixed(4)),parseFloat(msg["220cd"].toFixed(4))];
             	   $('.trans-line .echarts_img').hide();
				} else {
					$('.trans-line .echarts_img').css("display","flex");
				}
				var chart = Highcharts.chart('trans-line-echart', {
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
                			text: '变电容量',
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
                					//console.log(e);
                					var index = e.point.index+1;
                					
                					 $('.trans-line .list p:eq('+index+')').trigger('click');
                				}
                			},
                		}
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
                		x: 0,
                		y: 5,
                		itemDistance:10,
                		symbolRadius:0,//图标圆角为0
                    	symbolWidth:8,
                    	symbolHeight:8,
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
            			yAxis: 1,
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
            		}]
                });

                    $('.trans-line .list p').click(function(){
                        $(this).addClass('active');
                        $(this).siblings().removeClass('active');
                        var type = $(this).attr('type');//type=1表示合计，type=2表示10以下，type=3表示10~20，type=4表示20~30，type=5表示30~60，type=6表示60以上
                        if(type == 1){
							$("#xlcd").html(typeof(msg.cdCount) == 'undefined'?'-': parseFloat(msg.cdCount.toFixed(4))+"千米");
							$("#xlts").html(typeof(msg.tsCount) == 'undefined'?'-': msg.tsCount+"条");

						}else if (type == 2){
                            $("#xlcd").html(typeof(msg["500cd"]) == 'undefined'?'-': parseFloat(msg["500cd"].toFixed(4))+"千米");
                            $("#xlts").html(typeof(msg["500ts"]) == 'undefined'?'-': msg["500ts"]+"条");

						}else if(type==3){
                            $("#xlcd").html(typeof(msg["220cd"]) == 'undefined'?'-': parseFloat(msg["220cd"].toFixed(4))+"千米");
                            $("#xlts").html(typeof(msg["220ts"]) == 'undefined'?'-': msg["220ts"]+"条");

						}
                    });
                    
                    $('.trans-line .list p:eq(0)').trigger('click');
                    $.hideLoading();

                },
				error:function () {
					//$.alert("加载失败");
					$.toptip('查询输电线路失败', 'error');
					$.hideLoading();
                }
			})
        };

		return{
			init:function(){
				initData();
				loadEvent();
				loadData();
			}
		}
	}();
	
})(jQuery);
