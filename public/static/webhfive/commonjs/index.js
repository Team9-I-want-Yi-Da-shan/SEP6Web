
			var session = "";
			var apkCode = "";
			var apkVersion = "";
			var imei = "";
			var routeIp = "";
			var routePort = "";
			var tokenFirst = "";
			var tokenSecond = "";
			var filePath = "";
			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady() {
				alert(1)
				deviceVer();
				pushInit();
				initDate();
			}
          function  pushInit(){
           //推送服务初始化方法
            		PushPlugin.pushInitialize(function(res){
            						//注册新消息提醒监听
					 document.addEventListener("omspfPush.receiveMessage",function(result){
					 	
					 	alert("接收到新信息");
					 		//查询缓存未读消息方法
					 	PushPlugin.queryPushMsg(function(msg){
					 		alert("查询到消息内容为："+ JSON.stringify(msg))
					 	},function(error){
					 		console.log("未查询到消息")
					 	})
           	
           }, false);
			
				},function(error){
					console.log("推送插件初始化失败")
				})
          }

			function initDate() {
				getUser(false);
				getRoutePath(false);
				getBusiApp(false);
				getDeviceInfo(false);
				getTokenTwo(false);
			}

			function deviceVer() {
//				alert("设备名称" + device.model);
			}

           //获取平台用户信息方法
			function getUser(ifLog) {
				platformInfo.getPlatformUser(function(result) {
					if (ifLog != false) {
						alert("onSuccess" + JSON.stringify(result))
						
					}

					var resObj = JSON.parse(result);
					session = resObj.SESSION;
				}, function(result) {
					alert("onFail" + JSON.stringify(result))
				});
			}

            //获取平台业务路由地址方法
			function getRoutePath(ifLog) {
				platformInfo.getRoutePath(function(result) {
					if (ifLog != false) {
						alert("onSuccess" + JSON.stringify(result))
					}
					var resObj = JSON.parse(result);
					alert(resObj)
					routeIp = resObj.ROUTE_IP;
					routePort = resObj.ROUTE_PORT;
				}, function(result) {
					alert("onFail" + JSON.stringify(result))
				});
			}

            //获取当前微应用信息方法
			function getBusiApp(ifLog) {
				platformInfo.getBusiAppInfo(function(result) {
					if (ifLog != false) {
						alert("onSuccess" + JSON.stringify(result))
					}
					var resObj = JSON.parse(result);
					apkCode = resObj.APK_CODE;
					apkVersion = resObj.APK_VER;
				}, function(result) {
					alert("onFail" + JSON.stringify(result))
				});
			}

            //获取当前设备信息方法
			function getDeviceInfo(ifLog) {
				platformInfo.getDeviceInfo(function(result) {
					if (ifLog != false) {
						alert("onSuccess" + JSON.stringify(result))
					}
					var resObj = JSON.parse(result);
					imei = resObj.DEVICE_ID;
				}, function(result) {
					alert("onFail" + JSON.stringify(result))
				});
			}


            //获取新版本token数据方法，建议使用
			function getTokenTwo(ifLog) {
				platformInfo.getPlatformToken(function(result) {
					if (ifLog != false) {
						alert("onSuccess" + JSON.stringify(result))
					}
					tokenSecond = result;
				}, function(result) {
					alert("onFail" + JSON.stringify(result))
				});
			}

             

          //新版本网络请求header数据添加方法，建议使用
			function postDatas(post_url,param,callback) { 
				//所有网络请求都需添加如下格式的header信息
				var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;

				//数据参数
				var bizData = {
					//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
					path: "http://" + routeIp + ":" + routePort + post_url,
					data:param
				}
				alert(123);
				alert(routeIp);
				alert(header);
				$.ajax({
					type: "post",
					url: bizData.path,
					data: bizData.data,
					dataType: "json",
					beforeSend: function(request) {
						request.setRequestHeader("#ddyd", header);
					},
					success: function(result) {
						callback(result);
					},
					error: function(error) {
					    alert('系统开了个小差，没注意到你的请求');
					}
				});
			}

        //cordova调用camera插件选择本地图片文件方法
			function getPic() {
				navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					mediaType: Camera.MediaType.ALLMEDIA,
					destinationType: Camera.DestinationType.FILE_URI
				});
			}
			//拍照成功后回调

			function onLoadImageSuccess(imageURI) {
				filePath = imageURI;
				alert(imageURI);
			}
			//所有获取图片失败都回调此函数

			function onLoadImageFail(message) {
				alert(message);
			}

           //cordova调用file插件读取本地文件目录方法
			function testFile() {
				var path = "file:///storage/emulated/0/com.jsepc.omspf/";
				window.resolveLocalFileSystemURL(path, function(fileSystem) {
					var reader = fileSystem.createReader();
					reader.readEntries(function(entries) {
						if (entries.length > 0) {
							alert(JSON.stringify(entries))
						}
					})
				}, function() {});
			}

			 
            //cordova调用centrel插件判断当前蓝牙是否可用
			function testCentrel() {
				ble.isEnabled(function(result) {
					alert("蓝牙可用" + result)
				}, function(error) {
					alert("蓝牙不可用" + error)
				})
			}

            //cordova调用barcodeScanner插件使用二维码扫描功能
			function getScanner() {
				cordova.plugins.barcodeScanner.scan(function(result) {
					alert("Result:" + result.text + "  Format:" + result.format + "  Canceld:" + result.cancelled);
				}, function(error) {
					alert("error :" + error);
				})
			}

            //cordova调用FileTransfer插件实现文件上传功能
			function uploadTest() {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
					fs.root.getFile("test.jpeg", {
							create: true,
							exclusive: false
						},
						function(fileEntry) {
							upload(fileEntry);
						}, onErrorCreate);
				}, onErrorLoad);
			}

			function onErrorCreate(error) {
				alert("文件创建失败")
			}

			function onErrorLoad(error) {
				alert("文件系统加载失败")
			}

			function upload(fileEntry) {
				
				var fileurl = fileEntry.toURL();
				
				var success = function(r) {
					alert("上传成功" + r.requestCode)
				}
				var fail = function(r) {
					alert("上传失败" + r.code)
				}

	            //所有网络请求都需添加如下格式的header信息
                var headerStr = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
				var header = {
					'#ddyd': headerStr
				};

				var options = new FileUploadOptions();
				options.fileKey = "uploadFile";
				options.fileName = fileurl.substr(fileurl.lastIndexOf("/") + 1);
				options.MimeType = "image/jpeg"//必填且保证与所操作文件类型一致
				options.headers = header;
				options.chunkedMode = false;//必填

				var params = {};
				params.type = "ddpt";
				options.params = params;

				var ft = new FileTransfer();
				//所有网络请求都经由平台代理服务进行转发，所有请求地址需将ip和port设置为从平台sdk中获取的路由地址
				var serverUrl = "http://" + routeIp + ":" + routePort + "/demoService/demo/uploadFile.do";
				ft.upload(fileurl, encodeURI(serverUrl), success, fail, options);
			}

