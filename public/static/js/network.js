var session = "";
var apkCode = "";
var apkVersion = "";
var imei = "";
var routeIp = "127.0.0.1";
var routePort = "8081";
var imei = "";
var tokenFirst = "";
var tokenSecond = "";

var filePath = "";

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
            beforeSend: function(request) {
                request.setRequestHeader("#ddyd", header);
            },
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

function getIMDBData(data, fn) {
    var header = "";
    var url = "http://imdb-api.com/en/API/" + data.url;
    // var param = data.param;
    $.ajax({
            url: url,
            // data: JSON.stringify(param),
            contentType: "application/json",
            dataType: "json",
            type: "get",
            timeout: 100000,
            beforeSend: function(request) {
                request.setRequestHeader("#ddyd", header);
                console.log(request)
            },
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

function getMoviePosterImg(movieId) {
    const len = movieId.toString().length
    if (len < 7) {
        const initial = 7
        movieId = PrefixInteger(movieId, initial)
    }
    movieId = "tt" + movieId
    console.log("movieId", movieId.toString())

    $.ajax({
            // k_4ivqx8jp
            //k_3n7lo407
            url: "http://imdb-api.com/en/API/Title/k_4ivqx8jp/" + movieId,
            type: "get",
            data: {},
            async: false,
        })
        .done(function(data) {
            img = data.image
                // console.log(img)

        })
        // .error(function(data) {
        //     console.log("error", data)
        //     $.hideLoading();
        //     $.toptip('Error network', 'error');
        // })
    return img;
}

function PrefixInteger(num, length) {
    for (var len = (num + "").length; len < length; len = num.length) {
        num = "0" + num;
    }
    return num;
}