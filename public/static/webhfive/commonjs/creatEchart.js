;(function(){
	this.creatEchart = function(){
		var color = ['#1DBAF5','#00CCAE ','#8BCF1F']
		
		var creatBarEchart2 = function(myChart,obj){console.log(obj)
			 option = {
			 	color:color,
			    xAxis: {			    	
			        type: 'category',
			        data: obj.name,
			        axisLine:{
			        	show: false,
                       lineStyle:{
                           color:'#999999'
                           //width:8,//这里是为了突出显示加上的
                       }
                  },
                  axisTick: {
			            show: false
			        },
                  axisLabel : { 
                  		//show: false,
               	   /* formatter: function(param){
	                   		return param.split("-")[0]+'\n'+param.split("-")[1];
	                   	}, */
						textStyle : {
							fontSize : 14,
							color : '#999999'

						}
   				}
			    },
			    yAxis: {
			        type: 'value',
			        splitLine: {
			            lineStyle: {
			                type: 'solid',
			                color : '#f3f3f3'
			            }
			        },
			        axisLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			        	show: false,
			            formatter: '{value}',
			            textStyle : {
							fontSize : 14,
							color : '#999999'

						}
			        }
			    },
			    grid : {
			    		x:20,
			    		x2:20,
   					y : 40,
   					y2 : 60

   				},
			    legend :{
			    	x: 'center',
			        y:'90%',
			        type:'scroll',
					data : obj.name,
					textStyle : {
						fontSize : 15,
						color : '#666'
					},
					selected:obj.selected,
					icon: 'rect',
					itemWidth: 10,
					itemHeight: 10, 
					itemGap: 20
			},
				tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        },
			        formatter: "{c}"
			    },
			    series: [{
			    	name:'',
			    	type: 'bar',
			    	data: obj.data,
			    	itemStyle: {
	                        normal: {
	                            color: function(params){
	                            	var colorList = color;
	                            	return colorList[params.dataIndex]
	                            }
	                        }
	                    },
	                barWidth:10
			    },
			    {
			    	name:obj.name[0],
		            type:'bar',
		            stack: '',
		            data:obj.data[0]
			    },
			    {
			    	name:obj.name[1],
		            type:'bar',
		            stack: '',
		            data:obj.data[1]
			    },
			    {
			    	name:obj.name[2],
		            type:'bar',
		            stack: '',
		            data:obj.data[2]
			    }
			    ]
			};
			 
			 myChart.setOption(option, true);
		}
		
		var createPieEchart = function(myChart,obj,obj2){console.log(obj,obj2)
			option = {
					/* title: {
					        text: obj.title,
					        subtext:obj.subtitle,
					        left: '56%',
					        y: 'center',
					        textStyle: {
					            fontWeight: 'normal',
					            fontSize: 15,
					            color: "#fff",
					            align:'center',
					            width:1000
					        }
			
					    },*/
					 tooltip: {
					        trigger: 'item',
					        formatter: "{b}: {c} ({d}%)"
					    },
					    legend: [{
					        x: 'center',
					        y:'90%',
					        data:obj.name,
					        type:'scroll',
					        textStyle : {
								fontSize : 15,
								color : '#666'
							},
							icon: 'rect',
							itemWidth: 10,
							itemHeight:10,
							itemGap: 10
					    }
					    ],
					    series: [
					        {
					            //name:'罚款电量',
					            type:'pie',
					            selectedMode: 'single',
					            radius: ['45%', '65%'],
					            //center:['65%','50%'],
					            label: {
					                normal: {
					                    show:false,
					                    position: 'inner'
					                }
					            },
					            labelLine: {
					                normal: {
					                    show: false
					                }
					            },
					            itemStyle: { // 此配置
					                emphasis: {
					                    borderWidth: 0,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            },
					            
					            data:[
					                {value:obj.data[0], name:obj.name[0], itemStyle:{color:color[0]}},
					                {value:obj.data[1], name:obj.name[1], itemStyle:{color:color[1]}},
					                {value:obj.data[2], name:obj.name[2], itemStyle:{color:color[2]}}
					            ]
					        },
					        {
					        	name:"全省用电",
					            type:'pie',
					            selectedMode: 'single',
					            radius: ['35%'],
					            label: {
					                normal: {
					                    show:true,
					                    position: 'center',
					                    textStyle:{
					                    	color:'#fff',
					                    	fontSize:14
					                    },
					                    formatter:'{a}\n\n{c}'
					                    
					                }
					            },
					            labelLine: {
					                normal: {
					                    show: true
					                }
					            },
					            itemStyle: { // 此配置
					                emphasis: {
					                    borderWidth: 0,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            },
					            
					            data:[
					                {value:obj2.value, name:"全省用电",itemStyle:{color:'#6ca3ef'}},
					            ]
					        }
					        ]
			};
			 myChart.setOption(option, true);
		}
		var createBarDouY = function(myChart,obj){

			var color = ['#1DBAF5','#00CCAE']
			if(obj == ""){
				var obj={
		         data:[[],[]],
		         	XData:["华京","镇厂","华苏","谏厂","扬厂","盐厂","徐塘","彭城","夏港","利港","常熟","华通","淮厂"],
		         	name:["当日库存","可用天数"]
		         };
				option = {
		                 grid : {
		 			    		x:40,
		 			    		x2:40,
		     					y:80,
		     					y2:40
		 				},
		 			    legend :{
	 			    			top : 10,
			    				left : 20,
		 						data : obj.name,
		 						icon: 'rect',
		 						itemWidth: 10,
		 						itemHeight: 10, 
		 						itemGap: 20,
		 						textStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						}
		 				},
		                 tooltip: {
		                     trigger: 'axis',
		                     axisPointer: {
		                         type: 'cross',
		                         crossStyle: {
		                             color: '#999'
		                         }
		                     }
		                 },
		 			    xAxis: {			    	
		 			        type: 'category',
		 			        data: obj.XData,
		 			        axisLine:{
		 			        	show: false
		                     },
		                     axisTick: {
		 			            show: false
		 			        },
		                     axisLabel : {
		 						textStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						}
		     				}
		 			    },
		 			    yAxis: [
		 			        {
		                         type: 'value',
		                         name:'(单位：万吨)',
		                         nameGap:20,
		                         nameTextStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						},
		 						splitLine:{
		 	    				    lineStyle:{
		 	    				        color:["#f3f3f3"]
		 	    				    }
		 	    				},
		                         axisTick: {
		 			                show: false
		 			            },
		 			            axisLine: {
		     			            show: false
		     			        },
		                         axisLabel: {
		                             show: true,
		     			            formatter: '{value}',
		     			            textStyle : {
		     							fontSize : 13,
		     							color : '#999999'
		     						}
		                         }
		                     },
		                     {
		                         type: 'value',
		                         name:'(单位：天)',
		                         nameGap:20,
		                         nameTextStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						},
		 						splitLine:{
		 							show: false,
		 	    				    lineStyle:{
		 	    				        color:["#f3f3f3"]
		 	    				    }
		 	    				},
		                         axisLine: {
		     			            show: false
		     			        },
		     			        axisTick: {
		 			                show: false
		 			            },
		                         axisLabel: {
		                             show: true,
		     			            formatter: '{value}',
		     			            textStyle : {
		     							fontSize : 13,
		     							color : '#999999'
		     						}
		                         }
		                     }
		 			    ],
		 			    series: []
		 			}
			}else{
				option = {
		                 grid : {
		 			    		x:40,
		 			    		x2:40,
		     					y:80,
		     					y2:65
		 				},
		 			    legend :{
	 			    			top : 10,
			    				left : 20,
		 						data : obj.name,
		 						icon: 'rect',
		 						itemWidth: 10,
		 						itemHeight: 10, 
		 						itemGap: 20,
		 						textStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						}
		 				},
		                 tooltip: {
		                     trigger: 'axis',
		                     axisPointer: {
		                         type: 'cross',
		                         crossStyle: {
		                             color: '#999'
		                         }
		                     }
		                 },
		                 dataZoom: [
								{
								    show: true,
								    realtime: true,
								    start: 45,
								    end: 55,
								    height: 20,
								    bottom:10
								},
								{
								    type: 'inside',
								    realtime: true,
								    start: 45,
								    end: 55,
								    height: 20
								}
	                       ],
		 			    xAxis: {			    	
		 			        type: 'category',
		 			        data: obj.XData,
		 			        axisLine:{
		 			        	show: false
		                     },
		                     axisTick: {
		 			            show: false
		 			        },
		 			        triggerEvent:true,	
		                     axisLabel : {
		 						textStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						}
		     				}
		 			    },
		 			    yAxis: [
		 			        {
		                         type: 'value',
		                         name:'(单位：万吨)',
		                         nameGap:20,
		                         nameTextStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						},
		 						splitLine:{
		 	    				    lineStyle:{
		 	    				        color:["#f3f3f3"]
		 	    				    }
		 	    				},
		                         axisTick: {
		 			                show: false
		 			            },
		 			            axisLine: {
		     			            show: false
		     			        },
		                         axisLabel: {
		                             show: true,
		                             margin:-27,
		                             inside:true,
		     			            formatter: '{value}',
		     			            textStyle : {
		     							fontSize : 13,
		     							color : '#999999'
		     						}
		                         }
		                     },
		                     {
		                         type: 'value',
		                         name:'(单位：天)',
		                         nameGap:20,
		                         nameTextStyle : {
		 							fontSize : 11,
		 							color : '#999999'
		 						},  
		 						splitLine:{
		 							show: false,
		 	    				    lineStyle:{
		 	    				        color:["#f3f3f3"]
		 	    				    }
		 	    				},
		                         axisLine: {
		     			            show: false
		     			        },
		     			        axisTick: {
		 			                show: false
		 			            },
		                         axisLabel: {
		                             show: true,
		     			            formatter: '{value}',
		     			            textStyle : {
		     							fontSize : 13,
		     							color : '#999999'
		     						}
		                         }
		                     }
		 			    ],
		 			    series: []
		 			};
			}
			 
 			option.series = [];
 			for(var i = 0; i < obj.data.length; i++){
 				if(i == 0){
 					option.series.push({
		                    name:obj.name[i],
		                    data: obj.data[1],
		                    
		                    type: 'bar',
		                    itemStyle: {
		                        normal: {
		                            color: color[i]
		                        }
		                    },
		                    barWidth:10
		                })
 				}else{
 					option.series.push({
		                    name:obj.name[i],
		                    data: obj.data[0],
		                    yAxisIndex: 1,
		                    type: 'bar',
		                    itemStyle: {
		                        normal: {
		                            color: color[i]
		                        }
		                    },
		                    barWidth:10
		                })
 				}
 			}	
 			myChart.setOption(option, true);

		}
		var createBarXTypeValue = function(myChart,obj){
			option = {
					title : {
    					text : obj.title,
    					top : 55,
    					left:obj.titlePosition,
    					textStyle : {
    						fontWeight : 'normal',
    						fontSize : 14,
    						color : '#999'						
    					}
    				},
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        top : 20,
				        x:'center',
				        data: obj.name,
				        textStyle : {
								fontSize : 14,
								color : '#666'
							},
							icon: 'rect',
							itemWidth: 10,
							itemHeight: 10, 
							itemGap: 10
				    },
				    grid: {
				        x:20,
						x2:20,
						y : 80,
						y2 : 10,
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				        	show: false,
				            textStyle : {
								fontSize : 14,
								color : '#999999'

							}
				        },
				        splitLine: {
				            lineStyle: {
				                type: 'solid',
				                color : '#f3f3f3'
				            }
				        },
				    },
				    yAxis: {
				       /* name:"单机发电量", 
				        //nameGap:20,
				        nameTextStyle : {
				 			fontSize : 12,
				 			color : '#999999'
				 		}, */ 
				        type: 'category',
				        data: obj.YData,
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				        	show: true,
				            textStyle : {
								fontSize : 14,
								color : '#999999'

							}
				        }
				    },
				    series: []
				};
			for(var i = 0; i < obj.data.length; i++){
				option.series.push({
					name: obj.name[i],
					type: 'bar',
					label: {
						normal: {
							show: true,
							position: 'right'
						}
					},
					data: obj.data[i],
					itemStyle: {
                        normal: {
                            color: obj.color[i]
                        }
                    },
                    barWidth:10
				})
			}
			myChart.setOption(option, true);
		}

		var createPeakLoadEchart = function(myChart,obj){
			 option = {
			 	title : {
   					text : obj.title,
   					top : 10,
   					x:140,
   					textStyle : {
   						fontWeight : 'normal',
   						fontSize : 14,
   						color : '#333'						
   					}
   				},
			    xAxis: {			    	
			        type: 'category',
			        data: obj.XData,
			        axisLine:{
			        	show: false,
                       lineStyle:{
                           color:'#999999'
                           //width:8,//这里是为了突出显示加上的
                       }
                  },
                  axisTick: {
			            show: false
			        },
                  axisLabel : { 
						textStyle : {
							fontSize : 14,
							color : '#999999'
						}
   					}
			    },
			    yAxis: [{
			        type: 'value',
			        //interval:obj.yInterval,
			        splitLine: {
			        	show:true,
			            lineStyle: {
			                type: 'solid',
			                color : '#f3f3f3'
			            }
			        },
			        axisLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			        	show: true,
			        	inside:true,
			        	margin:-10,
			            formatter: '{value}',
			            textStyle : {
							fontSize : 14,
							color : '#999999'

						}
			        }
			    },
			    {
			        type: 'value',
			        interval:10,
			        splitLine: {
			        	show:false,
			            lineStyle: {
			                type: 'solid',
			                color : '#f3f3f3'
			            }
			        },
			        axisLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			        	show: true,
			        	inside:true,
			        	margin:-10,
			            formatter: '{value}%',
			            textStyle : {
							fontSize : 14,
							color : '#999999'

						}
			        }
			    }
			    ],
			    grid : {
		    		x:20,
		    		x2:20,
   					y : 80,
   					y2 : 30

   				},
			    legend :{
					top : 40,
					x : 90,
					data : obj.name,
					textStyle : {
						fontSize : 15,
						color : '#666'
					},
					selected:obj.selected,
					icon: 'rect',
					itemWidth: 10,
					itemHeight: 10, 
					itemGap: 20
						},
				tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    series: [{
                    name:obj.name[0],
                    data: obj.data[0],
                    yAxisIndex:0,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: obj.color[0]
                        }
                    },
                    barWidth:10
                },
                {
                    name:obj.name[1],
                    data: obj.data[1],
                    type: 'line',
                    yAxisIndex:1,
                    smooth:false,
                    itemStyle: {
                        normal: {
                            color: obj.color[1],
                            lineStyle:{
                            	width:1
                            }
                        }
                    }
                }
                ]
			};
			 myChart.setOption(option, true);
		}
		
		
		return{
			barEchart2:function(myChart,obj){
				creatBarEchart2(myChart,obj);
			},
			pieEchart:function(myChart,obj1,obj2){
				createPieEchart(myChart,obj1,obj2);
			},
			barDouY:function(myChart,obj){
				createBarDouY(myChart,obj);
			},
			barXTypeValue:function(myChart,obj){
				createBarXTypeValue(myChart,obj);
			},
			peakLoadEchart:function(myChart,obj){
				createPeakLoadEchart(myChart,obj);
			}
		}
	}()
})();
