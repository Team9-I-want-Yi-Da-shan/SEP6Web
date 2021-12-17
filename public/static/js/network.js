 // k_4ivqx8jp/
 //k_3n7lo407/
 //k_0hv922rs/
 //k_cn21q8tl

 var tokenIMDB = 'k_0hv922rs/'

 var cloudUrl = "https://europe-west1-mapapi-296515.cloudfunctions.net/"

 function getCloudSearch(url, types, param, fun) {

     $.ajax({
         data: param,
         url: cloudUrl + url,
         type: types,
         dataType: "json",
         success: function(res) {
             fun(res)
         },
         error: function(data) {
             $.hideLoading();
             $.toptip('Cloud Error network', 'error');
         }
     });
 }

 function getMoviePosterImg(movieId) {
     movieId = getIMDBMovieId(movieId);

     $.ajax({
             url: "http://imdb-api.com/en/API/Title/" + tokenIMDB + movieId,
             type: "get",
             data: {},
             async: false,
         })
         .done(function(data) {
             if (data.errorMessage != "" && data.errorMessage != null) {
                 $.toptip("IDMB " + data.errorMessage, 'warn');
             }
             img = data
         })
         .error(function(data) {
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

     return movieId;
 }

 function getIMDBPeopleId(movieId) {
     const len = movieId.toString().length
     if (len < 7) {
         const initial = 7
         movieId = PrefixInteger(movieId, initial)
     }
     if (movieId.search("nm") == -1) {
         movieId = "nm" + movieId
     }

     return movieId;
 }

 function PrefixInteger(num, length) {
     for (var len = (num + "").length; len < length; len = num.length) {
         num = "0" + num;
     }
     return num;
 }

 // Function for url
 function getCookieLoginData(_this) {
     var params = document.cookie;
     if (params != null && params != undefined) {
         var pa = params.split("&");
         var s = new Object();
         for (var i = 0; i < pa.length; i++) {
             s[pa[i].split(":")[0]] = pa[i].split(":")[1];
         }
         if (s.isLogin == "true") {
             _this.isLogin = s.isLogin;
             _this.username = s.username;
             _this.userId = s.userid
         }
     }


 }