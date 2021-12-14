 // k_4ivqx8jp/
 //k_3n7lo407/
 //k_0hv922rs/
 var tokenIMDB = 'k_0hv922rs/'
 var cloudUrl = "https://europe-west1-mapapi-296515.cloudfunctions.net/"


 //获取新版本token数据方法，建议使用
 function getTokenToGetData(ifLog, data, fn) {
     // platformInfo.getPlatformToken(function(result) {
     //     if (ifLog != false) {
     //         alert("onSuccess" + JSON.stringify(result));
     //     }
     //     tokenSecond = result;
     //     var header = "src=wapp,token=" + tokenSecond + ",session=" + session + ",imei=" + imei + ",code=" + apkCode + ",ver=" + apkVersion;
     var header = "";
     var url = "http://" + routeIp + ":" + routePort + data.url;
     var param = data.param;
     $.ajax({
             url: url,
             data: JSON.stringify(param),
             contentType: "application/json",
             dataType: "json",
             type: "post",
             timeout: 100000,

             success: function(msg) {
                 fn(msg);
                 console.log(param, msg)
             },
             error: function() {
                 $.hideLoading();
                 $.toptip('请求数据异常', 'error');
                 //console.log("请求数据异常");
             }
         })
         // }, function(result) {
         //     alert("onFail" + JSON.stringify(result))
         // });
 }


 function getCloudSearch(url, param, fun) {
     // var header = "Access-Control-Allow-Origin: *";
     // header("Access-Control-Allow-Origin: *");

     $.ajax({
         data: param,
         url: cloudUrl + url,
         type: 'POST',
         success: function(res) {
             fun(res)
         },
         error: function(data) {
             console.log("error", data)
             $.hideLoading();
             $.toptip('Error network', 'error');
         }

     });

 }

 function getCloudData(data, fn) {

     var url = cloudUrl + data.url;
     var param = data.param;
     $.ajax({
         url: url,
         data: param,
         contentType: "application/json",
         dataType: "json",
         type: "get",
         timeout: 100000,
         async: false,
     })

     .success(function(msg) {
             fn(msg);
             console.log("message", msg)

         }),
         error(function() {
             $.hideLoading();
             $.toptip('Cloud请求数据异常', 'error');
             //console.log("请求数据异常");
         })
         // }, function(result) {
         //     alert("onFail" + JSON.stringify(result))
         // });
 }



 function getMoviePosterImg(movieId) {
     movieId = getIMDBMovieId(movieId);

     $.ajax({
             // k_4ivqx8jp
             //k_3n7lo407
             //k_0hv922rs
             url: "http://imdb-api.com/en/API/Title/" + tokenIMDB + movieId,
             type: "get",
             data: {},
             async: false,
         })
         .done(function(data) {
             if (data.errorMessage != "") {
                 $.toptip("IDMB " + data.errorMessage, 'error');
             }
             img = data
         })
         .error(function(data) {
             console.log("error", data)
             $.hideLoading();
             $.toptip('Error network', 'error');
         })
     return img;
 }

 function getPeopleData(peopleId) {
     peopleId = getIMDBPeopleId(peopleId);

     $.ajax({
             url: "https://imdb-api.com/en/API/Name/" + tokenIMDB + peopleId,
             type: "get",
             data: {},
             async: false,
         })
         .done(function(data) {
             if (data.errorMessage != "") {
                 $.toptip("IDMB " + data.errorMessage, 'error');
             }
             img = data;
         })
         .error(function(data) {
             console.log("error", data)
             $.hideLoading();
             $.toptip('Error network', 'error');
         })
     return img;
 }


 function getIMDBMovieId(movieId) {
     const len = movieId.toString().length
     if (len < 7) {
         const initial = 7
         movieId = PrefixInteger(movieId, initial)
     }
     movieId = "tt" + movieId
     console.log("movieId", movieId.toString())
     return movieId;
 }

 function getIMDBPeopleId(movieId) {
     const len = movieId.toString().length
     if (len < 7) {
         const initial = 7
         movieId = PrefixInteger(movieId, initial)
     }
     movieId = "nm" + movieId
     console.log("movieId", movieId.toString())
     return movieId;
 }

 function PrefixInteger(num, length) {
     for (var len = (num + "").length; len < length; len = num.length) {
         num = "0" + num;
     }
     return num;
 }