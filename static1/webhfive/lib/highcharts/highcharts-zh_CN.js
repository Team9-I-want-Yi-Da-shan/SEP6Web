(function(H){var protocol=window.location.protocol;var defaultOptionsZhCn={lang:{contextButtonTitle:"鍥捐〃瀵煎嚭鑿滃崟",decimalPoint:".",downloadJPEG:"涓嬭浇JPEG鍥剧墖",downloadPDF:"涓嬭浇PDF鏂囦欢",downloadPNG:"涓嬭浇PNG鏂囦欢",downloadSVG:"涓嬭浇SVG鏂囦欢",drillUpText:"杩斿洖 {series.name}",invalidDate:"鏃犳晥鐨勬椂闂�",loading:"鍔犺浇涓�...",months:["涓€鏈�","浜屾湀","涓夋湀","鍥涙湀","浜旀湀","鍏湀","涓冩湀","鍏湀","涔濇湀","鍗佹湀","鍗佷竴鏈�","鍗佷簩鏈�"],noData:"娌℃湁鏁版嵁",numericSymbols:null,printChart:"鎵撳嵃鍥捐〃",resetZoom:"重置缩放比例",resetZoomTitle:"閲嶇疆涓哄師濮嬪ぇ灏�",shortMonths:["涓€鏈�","浜屾湀","涓夋湀","鍥涙湀","浜旀湀","鍏湀","涓冩湀","鍏湀","涔濇湀","鍗佹湀","鍗佷竴鏈�","鍗佷簩鏈�"],thousandsSep:",",weekdays:["鏄熸湡澶�","鏄熸湡涓€","鏄熸湡浜�","鏄熸湡涓�","鏄熸湡鍥�","鏄熸湡浜�","鏄熸湡鍏�"],rangeSelectorFrom:"寮€濮嬫椂闂�",rangeSelectorTo:"缁撴潫鏃堕棿",rangeSelectorZoom:"鑼冨洿",zoomIn:"缂╁皬",zoomOut:"鏀惧ぇ"},global:{canvasToolsURL:protocol+"//cdn.hcharts.cn/highcharts/modules/canvas-tools.js",VMLRadialGradientURL:protocol+ +"//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png"},title:{text:"鍥捐〃鏍囬"},tooltip:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m-%d",month:"%Y-%m",year:"%Y"},split:false},exporting:{url:protocol+"//export.highcharts.com.cn"},credits:{text:"Highcharts.com.cn",href:"https://www.highcharts.com.cn"},xAxis:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m",month:"%Y-%m",year:"%Y"}},rangeSelector:{inputDateFormat:"%Y-%m-%d",buttonTheme:{width:"auto",style:{fontSize:"12px",padding:"4px"}},buttons:[{type:"month",count:1,text:"鏈�"},{type:"month",count:3,text:"瀛ｅ害"},{type:"month",count:6,text:"鍗婂勾"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"骞�"},{type:"all",text:"鎵€鏈�"}]},plotOptions:{series:{dataGrouping:{dateTimeLabelFormats:{millisecond:["%Y-%m-%d %H:%M:%S.%L","%Y-%m-%d %H:%M:%S.%L"," ~ %H:%M:%S.%L"],second:["%Y-%m-%d %H:%M:%S","%Y-%m-%d %H:%M:%S"," ~ %H:%M:%S"],minute:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],hour:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],day:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],week:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],month:["%Y-%m","%Y-%m"," ~ %Y-%m"],year:["%Y","%Y"," ~ %Y"]}}},ohlc:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">鈼�</span> <b> {series.name}</b><br/>'+"寮€鐩橈細{point.open}<br/>"+"鏈€楂橈細{point.high}<br/>"+"鏈€浣庯細{point.low}<br/>"+"鏀剁洏锛歿point.close}<br/>"}},candlestick:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">鈼�</span> <b> {series.name}</b><br/>'+"寮€鐩橈細{point.open}<br/>"+"鏈€楂橈細{point.high}<br/>"+"鏈€浣庯細{point.low}<br/>"+"鏀剁洏锛歿point.close}<br/>"}}}};H.setOptions(defaultOptionsZhCn)})(Highcharts);