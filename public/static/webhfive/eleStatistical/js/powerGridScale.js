
		var session = "";
		var apkCode = "";
		var apkVersion = "";
		var imei = "";
		var routeIp = "";
		var routePort = "";
		var imei = "";
		var tokenFirst = "";
		var tokenSecond = "";

		var filePath = "";
		
		function onDeviceReady() {
			getUser(false);
			getRoutePath(false);
			getBusiApp(false);
			getDeviceInfo(false);
			getTokenTwo(false);
		}

		
       //获取平台用户信息方法
		function getUser(ifLog) {
			platformInfo.getPlatformUser(function(result) {
				if (ifLog != false) {
					alert("onSuccess" + JSON.stringify(result));					
				}
				var resObj = JSON.parse(result);
				session = resObj.SESSION;
			}, function(result) {
				alert("onFail" + JSON.stringify(result));
			});
		}

        //获取平台业务路由地址方法
		function getRoutePath(ifLog) {
			platformInfo.getRoutePath(function(result) {
				if (ifLog != false) {
					alert("onSuccess" + JSON.stringify(result));
				}
				var resObj = JSON.parse(result);
				routeIp = resObj.ROUTE_IP;
				routePort = resObj.ROUTE_PORT;
			}, function(result) {
				alert("onFail" + JSON.stringify(result));
			});
		}

        //获取当前微应用信息方法
		function getBusiApp(ifLog) {
			platformInfo.getBusiAppInfo(function(result) {
				if (ifLog != false) {
					alert("onSuccess" + JSON.stringify(result));
				}
				var resObj = JSON.parse(result);
				apkCode = resObj.APK_CODE;
				apkVersion = resObj.APK_VER;
			}, function(result) {
				alert("onFail" + JSON.stringify(result));
			});
		}

        //获取当前设备信息方法
		function getDeviceInfo(ifLog) {
			platformInfo.getDeviceInfo(function(result) {
				if (ifLog != false) {
					alert("onSuccess" + JSON.stringify(result));
				}
				var resObj = JSON.parse(result);
				imei = resObj.DEVICE_ID;
			}, function(result) {
				alert("onFail" + JSON.stringify(result));
			});
		}

     
        //获取新版本token数据方法，建议使用
		function getTokenTwo(ifLog) {
			platformInfo.getPlatformToken(function(result) {
				if (ifLog != false) {
					alert("onSuccess" + JSON.stringify(result))
				}
				tokenSecond = result;
				energyPage.init();
				capacityPage.init();
				transCapaPage.init();
				transLinePage.init();
			}, function(result) {
				alert("onFail" + JSON.stringify(result))
			});
		}
		
		
			FastClick.attach(document.body);
			//滑动插件
		    var swiper = new Swiper('.swiper-container', {
			    slidesPerView: 4,
			    spaceBetween: 0,
			    useCSS3Transforms:false
			    
		    });
		    $(".swiper-container .swiper-slide").css("border-left","1px solid #ddd")
		    $(".swiper-container .swiper-slide:eq(0)").css("border-left","0")
		    document.addEventListener("deviceready", onDeviceReady, false);
		    


			$(".swiper-container").on("click",".swiper-slide",function(){
		    	$(this).addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
		    	$(this).find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
		    	$(this).find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
		    	if($(this).index() == 0){
		    		$('.power').hide();
		    		$('.capacity').show();
		    		function getTokenTwo(ifLog) {
		    			platformInfo.getPlatformToken(function(result) {
		    				if (ifLog != false) {
		    					alert("onSuccess" + JSON.stringify(result))
		    				}
		    				tokenSecond = result;
		    				capacityPage.init();
		    			}, function(result) {
		    				alert("onFail" + JSON.stringify(result))
		    			});
		    		}
		    		//capacityPage.init();
		    	}else if($(this).index() == 1){
		    		$('.power').hide();
		    		$('.energy').show();
		    		function getTokenTwo(ifLog) {
		    			platformInfo.getPlatformToken(function(result) {
		    				if (ifLog != false) {
		    					alert("onSuccess" + JSON.stringify(result))
		    				}
		    				tokenSecond = result;
		    				energyPage.init();
		    			}, function(result) {
		    				alert("onFail" + JSON.stringify(result))
		    			});
		    		}
		    		//energyPage.init();					
		    	}else if($(this).index() == 2){
		    		$('.power').hide();
		    		$('.trans-capa').show();
		    		function getTokenTwo(ifLog) {
		    			platformInfo.getPlatformToken(function(result) {
		    				if (ifLog != false) {
		    					alert("onSuccess" + JSON.stringify(result))
		    				}
		    				tokenSecond = result;
		    				transCapaPage.init();
		    			}, function(result) {
		    				alert("onFail" + JSON.stringify(result))
		    			});
		    		}
		    		//transCapaPage.init();
		    	}else if ($(this).index() == 3) {
		    		$('.power').hide();
		    		$('.trans-line').show();
		    		function getTokenTwo(ifLog) {
		    			platformInfo.getPlatformToken(function(result) {
		    				if (ifLog != false) {
		    					alert("onSuccess" + JSON.stringify(result))
		    				}
		    				tokenSecond = result;
		    				transLinePage.init();
		    			}, function(result) {
		    				alert("onFail" + JSON.stringify(result))
		    			});
		    		}
		    		//transLinePage.init();
		    	}
		    });
		    $('.capacity').show();
			$(".swiper-container .swiper-slide:eq(0)").addClass("bg_color_bottom").siblings().removeClass('bg_color_bottom');
			$(".swiper-container .swiper-slide:eq(0)").find("div").addClass("bg_color").parent().siblings().find("div").removeClass('bg_color');
			$(".swiper-container .swiper-slide:eq(0)").find(".subtitle").addClass("bg_bottom").parent().siblings().find(".subtitle").removeClass('bg_bottom');
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var curH = window.innerHeight + scrollTop;
		    $(".scro_part.scart-single-column.scro_part:before").css("height",curH);


