//日限电电力载入
function getDayPower() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getLeftTop",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardDayPower);
}
function forwardDayPower(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsDayDl(1,msg);
}
//日限电电量载入
function getDayVolume() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getRightTop",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardDayVolume);
}
function forwardDayVolume(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsDayDl(2,msg);
}
//日限电回调
function linesChartsDayDl(typeFlag,data){
	//var data={"wfdl":[3,4,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],"zfdl":[5,6,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],"xAxisData":["11/19","11/20","11/21","11/22","11/23","11/24","11/25","11/26","11/27","11/28","11/29","11/30","12/01","12/02","12/03","12/04","12/05","12/06","12/07","12/08"],"yfdl":[0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0],"qtdl":[0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0]}
	// Build the chart
	//电力
	var tipDw="万千瓦";
	var typeName="电力";
	var title="日限电电力情况";
	if(typeFlag==2){
		typeName="电量";
		tipDw="万千瓦时";
		title="日限电电量情况";
	}
	var subtiitle="当日限电"+typeName+" 早峰"+data.zfdl[data.zfdl.length-1]+tipDw+"，腰荷"+data.yfdl[data.yfdl.length-1]+tipDw+"，晚峰"+data.wfdl[data.wfdl.length-1]+tipDw+"，全天最大"+data.qtdl[data.qtdl.length-1]+tipDw;
	var chart = Highcharts.chart('linesChartsDayDl',{
	exporting: {
		enabled:false
	},
	rangeSelector:{
		enabled:false
	},
	credits: {
		enabled: false
	},
	chart: {
		type: 'column'
	},
	title: {
		style:{fontSize:'14px',color:'#333'},
		text: title
	},
	subtitle: {
		style:{fontSize:'10px',color:'#666'},
		text: subtiitle
	},
	colors:['#0552a7','#ff5d24','#c5c5c5'],
	xAxis: {
		categories: data.xAxisData,
		crosshair: true,
		tickWidth:0,//去掉刻度
		labels: {
			style: {
				color: '#666',
				fontSize:10
			},
		}
	},
	yAxis: {
		title: {
			text: null
		},
		labels: {
			style: {
				color: '#666',
				fontSize:10
			},
		}
	},
	legend: {
		layout: 'horizontal',
		align: 'center',
		x: 0,
		verticalAlign: 'top',
		y: 0,
		itemStyle:{
			color:'#666',
			fontSize:10,
			fontWeight: 'normal'
		},
		symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
	},
	tooltip: {
		// head + 每个 point + footer 拼接成完整的 table
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} '+tipDw+'</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true,
		style:{
			color:'#666',
			fontSize:12
		}
	},
	plotOptions: {
		column: {
			borderWidth: 0
		}
	},
	series: [
		{
			name:"早峰"+typeName,
			data:data.zfdl
		},
		{
			name:"腰荷"+typeName,
			data:data.yfdl
		},
		{
			name:"晚峰"+typeName,
			data:data.wfdl
		}]
	});
}
//月限电电力载入
function getMonthPower() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getLeftBottomLeft",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardMonthPower);
}
function forwardMonthPower(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsMonthDl(1,msg);
}
//月限电电力载入
function getMonthVolume() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getRightBottomLeft",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardMonthVolume);
}
function forwardMonthVolume(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsMonthDl(2,msg);
}
//月限电回调
function linesChartsMonthDl(typeFlag,data){

	//var data={"qndydl":[0,0,0,0,0,0,40,0,0,0,0,0],"dydl":["181",0,0,0,0,0,0,0,0,0,0,0],"xAxisData":[1,2,3,4,5,6,7,8,9,10,11,12]};	// Build the chart
	var tipDw="万千瓦";
	var typeName="电力";
	var title="月限电电力情况";
	if(typeFlag==2){
		typeName="电量";
		tipDw="万千瓦时";
		title="月限电电量情况";
	}
	var subtitle="当月限电最大"+typeName+data.dydl[data.dydl.length-1]+tipDw;
	var chart = Highcharts.chart('linesChartsMonthDl',{
	exporting: {
		enabled:false
	},
	rangeSelector:{
		enabled:false
	},
	credits: {
		enabled: false
	},
	chart: {
		type: 'column'
	},
	title: {
		style:{fontSize:'14px',color:'#333'},
		text: title
	},
	subtitle: {
		style:{fontSize:'10px',color:'#666'},
		text: subtitle
	},
	colors:['#3573f3','#c5c5c5'],
	xAxis: {
		categories: data.xAxisData,
		crosshair: true,
		tickWidth:0,//去掉刻度
		labels: {
			style: {
				color: '#666',
				fontSize:10
			},
		}
	},
	yAxis: {
		title: {
			text: null
		},
		labels: {
			style: {
				color: '#666',
				fontSize:10
			},
		}
	},
	legend: {
		layout: 'horizontal',
		align: 'center',
		x: 0,
		verticalAlign: 'top',
		y: 0,
		itemStyle:{
			color:'#666',
			fontSize:10,
			fontWeight: 'normal'
		},
		symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
	},
	tooltip: {
		// head + 每个 point + footer 拼接成完整的 table
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} '+tipDw+'</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true,
		style:{
			color:'#666',
			fontSize:12
		}
	},
	plotOptions: {
		column: {
			borderWidth: 0
		}
	},
	series: [
		{
		name:"当月"+typeName,
		data:data.dydl
		},{
		name:"去年当月"+typeName,
		data:data.qndydl
		}]
	});
}
//年限电电力载入
function getYearPower() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getLeftBottomRight",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardYearPower);
}
function forwardYearPower(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsYearDl(1,msg);
}
//年限电电力载入
function getYearVolume() {
	$.showLoading();
	var data = {};
	data.param = {
		"method": "getRightBottomRight",
		"seachDate" : t_id
	};
	data.url = "/ddrb/home/getDdzbYxydInfo.html";
	getTokenToGetData(false,data,forwardYearVolume);
}
function forwardYearVolume(msg){
	$.hideLoading();
	msg=eval('('+msg.data+')');
	linesChartsYearDl(2,msg);
}
//年限电回调
function linesChartsYearDl( typeFlag,data){
	//var data={"zzl":[0,0,0,"352"],"xAxisData":[2015,2016,2017,2018],"dndl":[0,0,"40","181"]};
	var tipDw="万千瓦";
	var typeName="电力";
	var title="年限电电力情况";
	if(typeFlag==2){
		typeName="电量";
		tipDw="万千瓦时";
		title="年限电电量情况";
	}
	var subtiitle="当年限电"+typeName+data.dndl[data.dndl.length-1]+tipDw;
	var chart = Highcharts.chart('linesChartsYearDl',{
	exporting: {
		enabled:false
	},
	rangeSelector:{
		enabled:false
	},
	credits: {
		enabled: false
	},
	chart: {
		type: 'column'
	},
	title: {
		style:{fontSize:'14px',color:'#333'},
		text: title
	},
	subtitle: {
		style:{fontSize:'10px',color:'#666'},
		text: subtiitle
	},
	colors:['#c5c5c5','#0582f6'],
	xAxis: {
		categories: data.xAxisData,
		crosshair: true,
		tickWidth:0,//去掉刻度
	},
	yAxis: {
		title: {
			text: ''
		}
	},
	legend: {
		layout: 'horizontal',
		align: 'center',
		x: 0,
		verticalAlign: 'top',
		y: 0,
		itemStyle:{
			color:'#666',
			fontSize:10,
			fontWeight: 'normal'
		},
		symbolWidth:8,
        symbolHeight:8,
        symbolRadius:0,
	},
	plotOptions: {
		column: {
			borderWidth: 0
		}
	},
	series: [
		{
		tyep:'column',
		name:"当年"+typeName,
		data:data.dndl
		},{
		tyep:'line',
		name:"增长率",
		data:data.zzl
		}]
	});
}



//$('.content .cont').click(function(){
//	//样式
//	$(this).addClass("flex_select").siblings().removeClass("flex_select");
//	//数据
//	var _text = $(this).text();
//	if(_text == "电力"){
//		getDayPower();
//		getMonthPower();
//		getYearPower();
//	} else if(_text == "电量"){
//		getDayVolume();
//		getMonthVolume();
//		getYearVolume();
//	}
//});
//$(".content .cont:eq(0)").trigger('click');




